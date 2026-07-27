from unittest.mock import patch

from fastapi.testclient import TestClient

from app.main import app
from app.models.schemas import MemoryItem

client = TestClient(app)

AUTH_HEADERS = {"X-API-Key": "hy_faketoken"}


@patch("app.dependencies.resolve_token")
@patch("app.routers.memory.create_memory")
def test_add_memory_returns_id_and_summary(mock_create, mock_resolve_token):
    mock_resolve_token.return_value = "user-123"
    mock_create.return_value = ("mem-1", "Meeting with Carlos on Thursday at 3pm", None)

    response = client.post(
        "/memory",
        headers=AUTH_HEADERS,
        json={"user_id": "test-user", "text": "Remind me I'm meeting Carlos Thursday at 3pm"},
    )

    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "mem-1"
    assert data["summary"] == "Meeting with Carlos on Thursday at 3pm"
    assert data["reminder_at"] is None
    mock_create.assert_called_once_with(
        "user-123", "Remind me I'm meeting Carlos Thursday at 3pm"
    )


@patch("app.dependencies.resolve_token")
@patch("app.routers.memory.create_memory")
def test_add_memory_ignores_client_supplied_user_id_and_uses_the_authenticated_one(
    mock_create, mock_resolve_token
):
    """Regression test for the IDOR: a client can no longer choose which
    account a memory gets saved under by putting a different user_id in
    the request body."""
    mock_resolve_token.return_value = "real-authenticated-user"
    mock_create.return_value = ("mem-1", "Something", None)

    response = client.post(
        "/memory",
        headers=AUTH_HEADERS,
        json={"user_id": "someone-elses-id", "text": "Something to remember"},
    )

    assert response.status_code == 200
    mock_create.assert_called_once_with("real-authenticated-user", "Something to remember")


@patch("app.dependencies.resolve_token")
@patch("app.routers.memory.create_memory")
def test_add_memory_returns_detected_reminder_time(mock_create, mock_resolve_token):
    mock_resolve_token.return_value = "user-123"
    mock_create.return_value = (
        "mem-2",
        "Meeting with Carlos on Thursday at 3pm",
        "2026-07-30T15:00:00-06:00",
    )

    response = client.post(
        "/memory",
        headers=AUTH_HEADERS,
        json={"user_id": "test-user", "text": "Remind me I'm meeting Carlos Thursday at 3pm"},
    )

    assert response.status_code == 200
    assert response.json()["reminder_at"] == "2026-07-30T15:00:00-06:00"


@patch("app.dependencies.resolve_token")
@patch("app.routers.memory.create_memory")
def test_add_memory_returns_500_when_save_fails(mock_create, mock_resolve_token):
    mock_resolve_token.return_value = "user-123"
    mock_create.side_effect = RuntimeError("Supabase unavailable")

    response = client.post(
        "/memory",
        headers=AUTH_HEADERS,
        json={"user_id": "test-user", "text": "Something to remember"},
    )

    assert response.status_code == 500
    assert "Could not save the memory" in response.json()["detail"]


def test_add_memory_requires_authentication():
    response = client.post(
        "/memory",
        json={"user_id": "test-user", "text": "Something to remember"},
    )

    assert response.status_code == 401


@patch("app.dependencies.resolve_token")
def test_add_memory_rejects_missing_fields(mock_resolve_token):
    mock_resolve_token.return_value = "user-123"

    response = client.post("/memory", headers=AUTH_HEADERS, json={"user_id": "test-user"})

    assert response.status_code == 422


@patch("app.dependencies.resolve_token")
def test_add_memory_rejects_text_over_the_length_limit(mock_resolve_token):
    mock_resolve_token.return_value = "user-123"

    response = client.post(
        "/memory",
        headers=AUTH_HEADERS,
        json={"user_id": "test-user", "text": "a" * 4001},
    )

    assert response.status_code == 422


@patch("app.dependencies.resolve_token")
@patch("app.routers.memory.list_memories")
def test_get_memories_returns_list_for_user(mock_list, mock_resolve_token):
    mock_resolve_token.return_value = "user-123"
    mock_list.return_value = [
        MemoryItem(
            id="mem-1",
            text="Quedé con Carlos el jueves a las 3pm",
            summary="Reunión con Carlos el jueves a las 3pm",
            created_at="2026-07-20T10:00:00+00:00",
        ),
    ]

    response = client.get("/memories/test-user", headers=AUTH_HEADERS)

    assert response.status_code == 200
    data = response.json()
    assert data["user_id"] == "user-123"
    assert len(data["memories"]) == 1
    assert data["memories"][0]["id"] == "mem-1"
    mock_list.assert_called_once_with("user-123")


@patch("app.dependencies.resolve_token")
@patch("app.routers.memory.list_memories")
def test_get_memories_ignores_path_user_id_and_uses_the_authenticated_one(
    mock_list, mock_resolve_token
):
    """Regression test for the IDOR: the {user_id} path segment is kept only
    for URL compatibility with existing iOS calls — it no longer decides
    whose memories get returned."""
    mock_resolve_token.return_value = "real-authenticated-user"
    mock_list.return_value = []

    response = client.get("/memories/someone-elses-id", headers=AUTH_HEADERS)

    assert response.status_code == 200
    assert response.json()["user_id"] == "real-authenticated-user"
    mock_list.assert_called_once_with("real-authenticated-user")


@patch("app.dependencies.resolve_token")
@patch("app.routers.memory.list_memories")
def test_get_memories_returns_empty_list_when_no_memories(mock_list, mock_resolve_token):
    mock_resolve_token.return_value = "new-user"
    mock_list.return_value = []

    response = client.get("/memories/new-user", headers=AUTH_HEADERS)

    assert response.status_code == 200
    assert response.json() == {"user_id": "new-user", "memories": []}


@patch("app.dependencies.resolve_token")
@patch("app.routers.memory.list_memories")
def test_get_memories_returns_500_when_lookup_fails(mock_list, mock_resolve_token):
    mock_resolve_token.return_value = "user-123"
    mock_list.side_effect = RuntimeError("Supabase unavailable")

    response = client.get("/memories/test-user", headers=AUTH_HEADERS)

    assert response.status_code == 500
    assert "Could not fetch memories" in response.json()["detail"]


def test_get_memories_requires_authentication():
    response = client.get("/memories/test-user")

    assert response.status_code == 401
