from unittest.mock import patch

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_create_token_requires_a_bearer_token():
    response = client.post("/profile/tokens", json={})

    assert response.status_code == 401


@patch("app.routers.tokens.generate_token")
@patch("app.dependencies.get_supabase_client")
def test_create_token_returns_the_raw_token_once(mock_get_client, mock_generate_token):
    mock_get_client.return_value.auth.get_user.return_value.user.id = "user-123"
    mock_generate_token.return_value = {
        "id": "token-1",
        "raw_token": "hy_supersecretvalue",
        "label": "iOS app",
        "created_at": "2026-07-27T00:00:00+00:00",
    }

    response = client.post(
        "/profile/tokens",
        headers={"Authorization": "Bearer good-token"},
        json={"label": "iOS app"},
    )

    assert response.status_code == 200
    data = response.json()
    assert data["raw_token"] == "hy_supersecretvalue"
    mock_generate_token.assert_called_once_with("user-123", "iOS app")


@patch("app.routers.tokens.list_tokens")
@patch("app.dependencies.get_supabase_client")
def test_list_tokens_never_returns_the_raw_value_or_hash(mock_get_client, mock_list_tokens):
    mock_get_client.return_value.auth.get_user.return_value.user.id = "user-123"
    mock_list_tokens.return_value = [
        {
            "id": "token-1",
            "label": "iOS app",
            "token_prefix": "hy_abc123",
            "created_at": "2026-07-27T00:00:00+00:00",
            "last_used_at": None,
            "revoked_at": None,
        }
    ]

    response = client.get("/profile/tokens", headers={"Authorization": "Bearer good-token"})

    assert response.status_code == 200
    body = response.text
    assert "raw_token" not in body
    assert "token_hash" not in body


@patch("app.routers.tokens.revoke_token")
@patch("app.dependencies.get_supabase_client")
def test_revoke_token_returns_204_and_calls_the_service_scoped_to_the_authenticated_user(
    mock_get_client, mock_revoke_token
):
    mock_get_client.return_value.auth.get_user.return_value.user.id = "user-123"
    mock_revoke_token.return_value = True

    response = client.delete(
        "/profile/tokens/token-1", headers={"Authorization": "Bearer good-token"}
    )

    assert response.status_code == 204
    mock_revoke_token.assert_called_once_with("user-123", "token-1")


@patch("app.routers.tokens.revoke_token")
@patch("app.dependencies.get_supabase_client")
def test_revoke_token_returns_404_when_not_found_or_not_owned(
    mock_get_client, mock_revoke_token
):
    mock_get_client.return_value.auth.get_user.return_value.user.id = "user-123"
    mock_revoke_token.return_value = False

    response = client.delete(
        "/profile/tokens/not-mine", headers={"Authorization": "Bearer good-token"}
    )

    assert response.status_code == 404
