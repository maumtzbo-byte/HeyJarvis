from unittest.mock import patch

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


@patch("app.routers.query.generate_answer")
@patch("app.routers.query.search_memories")
def test_query_returns_spoken_response_and_memories_used(mock_search, mock_generate):
    mock_search.return_value = [
        {"id": "mem-1", "summary": "Reunión con Carlos el jueves a las 10am"},
    ]
    mock_generate.return_value = "Tu reunión con Carlos es el jueves a las 10 de la mañana."

    response = client.post(
        "/query",
        json={"user_id": "test-user", "question": "¿Cuándo es mi reunión con Carlos?"},
    )

    assert response.status_code == 200
    data = response.json()
    assert data["response"] == "Tu reunión con Carlos es el jueves a las 10 de la mañana."
    assert data["memories_used"] == ["mem-1"]

    mock_search.assert_called_once_with("test-user", "¿Cuándo es mi reunión con Carlos?")
    mock_generate.assert_called_once()


@patch("app.routers.query.search_memories")
def test_query_returns_500_when_memory_search_fails(mock_search):
    mock_search.side_effect = RuntimeError("ChromaDB no disponible")

    response = client.post(
        "/query",
        json={"user_id": "test-user", "question": "¿Qué me falta hacer hoy?"},
    )

    assert response.status_code == 500
    assert "Could not process the question" in response.json()["detail"]


def test_query_rejects_missing_fields():
    response = client.post("/query", json={"user_id": "test-user"})

    assert response.status_code == 422


def test_query_rejects_question_over_the_length_limit():
    response = client.post(
        "/query",
        json={"user_id": "test-user", "question": "a" * 2001},
    )

    assert response.status_code == 422


@patch("app.routers.query.get_profile")
@patch("app.routers.query.generate_answer")
@patch("app.routers.query.search_memories")
def test_query_passes_onboarding_preferences_to_the_answer(
    mock_search, mock_generate, mock_get_profile
):
    mock_search.return_value = [{"id": "mem-1", "summary": "Meeting with Carlos Thursday"}]
    mock_generate.return_value = "It's Thursday!"
    mock_get_profile.return_value = {
        "tone": "warm and friendly",
        "voice_style": "encouraging coach",
        "full_name": "Carlos",
        "pronouns": "he/him",
    }

    response = client.post(
        "/query",
        json={"user_id": "real-account-id", "question": "When is my meeting?"},
    )

    assert response.status_code == 200
    mock_generate.assert_called_once_with(
        "When is my meeting?",
        ["Meeting with Carlos Thursday"],
        tone="warm and friendly",
        voice_style="encouraging coach",
        full_name="Carlos",
        pronouns="he/him",
    )


@patch("app.routers.query.get_profile")
@patch("app.routers.query.generate_answer")
@patch("app.routers.query.search_memories")
def test_query_still_works_when_there_is_no_profile(
    mock_search, mock_generate, mock_get_profile
):
    mock_search.return_value = []
    mock_generate.return_value = "I don't know that yet."
    mock_get_profile.side_effect = RuntimeError("SUPABASE_URL and SUPABASE_KEY must be set")

    response = client.post(
        "/query",
        json={"user_id": "carlos-123", "question": "What's the wifi password?"},
    )

    assert response.status_code == 200
    mock_generate.assert_called_once_with(
        "What's the wifi password?", [], tone=None, voice_style=None, full_name=None, pronouns=None
    )
