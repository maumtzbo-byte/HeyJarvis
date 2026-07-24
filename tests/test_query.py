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
    assert "No se pudo procesar la pregunta" in response.json()["detail"]


def test_query_rejects_missing_fields():
    response = client.post("/query", json={"user_id": "test-user"})

    assert response.status_code == 422
