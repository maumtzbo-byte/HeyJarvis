from unittest.mock import patch

from fastapi.testclient import TestClient

from app.main import app
from app.models.schemas import MemoryItem

client = TestClient(app)


@patch("app.routers.memory.create_memory")
def test_add_memory_returns_id_and_summary(mock_create):
    mock_create.return_value = ("mem-1", "Meeting with Carlos on Thursday at 3pm", None)

    response = client.post(
        "/memory",
        json={"user_id": "test-user", "text": "Remind me I'm meeting Carlos Thursday at 3pm"},
    )

    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "mem-1"
    assert data["summary"] == "Meeting with Carlos on Thursday at 3pm"
    assert data["reminder_at"] is None
    mock_create.assert_called_once_with(
        "test-user", "Remind me I'm meeting Carlos Thursday at 3pm"
    )


@patch("app.routers.memory.create_memory")
def test_add_memory_returns_detected_reminder_time(mock_create):
    mock_create.return_value = (
        "mem-2",
        "Meeting with Carlos on Thursday at 3pm",
        "2026-07-30T15:00:00-06:00",
    )

    response = client.post(
        "/memory",
        json={"user_id": "test-user", "text": "Remind me I'm meeting Carlos Thursday at 3pm"},
    )

    assert response.status_code == 200
    assert response.json()["reminder_at"] == "2026-07-30T15:00:00-06:00"


@patch("app.routers.memory.create_memory")
def test_add_memory_returns_500_when_save_fails(mock_create):
    mock_create.side_effect = RuntimeError("Supabase unavailable")

    response = client.post(
        "/memory",
        json={"user_id": "test-user", "text": "Something to remember"},
    )

    assert response.status_code == 500
    assert "Could not save the memory" in response.json()["detail"]


def test_add_memory_rejects_missing_fields():
    response = client.post("/memory", json={"user_id": "test-user"})

    assert response.status_code == 422


@patch("app.routers.memory.list_memories")
def test_get_memories_returns_list_for_user(mock_list):
    mock_list.return_value = [
        MemoryItem(
            id="mem-1",
            text="Quedé con Carlos el jueves a las 3pm",
            summary="Reunión con Carlos el jueves a las 3pm",
            created_at="2026-07-20T10:00:00+00:00",
        ),
    ]

    response = client.get("/memories/test-user")

    assert response.status_code == 200
    data = response.json()
    assert data["user_id"] == "test-user"
    assert len(data["memories"]) == 1
    assert data["memories"][0]["id"] == "mem-1"
    mock_list.assert_called_once_with("test-user")


@patch("app.routers.memory.list_memories")
def test_get_memories_returns_empty_list_when_no_memories(mock_list):
    mock_list.return_value = []

    response = client.get("/memories/new-user")

    assert response.status_code == 200
    assert response.json() == {"user_id": "new-user", "memories": []}


@patch("app.routers.memory.list_memories")
def test_get_memories_returns_500_when_lookup_fails(mock_list):
    mock_list.side_effect = RuntimeError("Supabase unavailable")

    response = client.get("/memories/test-user")

    assert response.status_code == 500
    assert "Could not fetch memories" in response.json()["detail"]
