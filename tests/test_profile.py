from unittest.mock import patch

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_profile_requires_a_bearer_token():
    response = client.get("/profile")

    assert response.status_code == 401


def test_profile_rejects_a_malformed_authorization_header():
    response = client.get("/profile", headers={"Authorization": "not-a-bearer-token"})

    assert response.status_code == 401


@patch("app.dependencies.get_supabase_client")
def test_profile_rejects_an_invalid_session(mock_get_client):
    mock_get_client.return_value.auth.get_user.side_effect = RuntimeError("invalid token")

    response = client.get("/profile", headers={"Authorization": "Bearer bad-token"})

    assert response.status_code == 401


@patch("app.routers.profile.get_profile")
@patch("app.dependencies.get_supabase_client")
def test_get_profile_returns_defaults_when_none_saved_yet(mock_get_client, mock_get_profile):
    mock_get_client.return_value.auth.get_user.return_value.user.id = "user-123"
    mock_get_profile.return_value = None

    response = client.get("/profile", headers={"Authorization": "Bearer good-token"})

    assert response.status_code == 200
    data = response.json()
    assert data["onboarding_completed"] is False
    assert data["tone"] is None


@patch("app.routers.profile.upsert_profile")
@patch("app.dependencies.get_supabase_client")
def test_put_profile_saves_onboarding_answers(mock_get_client, mock_upsert):
    mock_get_client.return_value.auth.get_user.return_value.user.id = "user-123"
    mock_upsert.return_value = {
        "full_name": "Carlos",
        "pronouns": "he/him",
        "use_case": "work",
        "focus_areas": ["meetings", "ideas"],
        "tone": "warm and friendly",
        "voice_style": "encouraging coach",
        "onboarding_completed": True,
    }

    response = client.put(
        "/profile",
        headers={"Authorization": "Bearer good-token"},
        json={
            "full_name": "Carlos",
            "pronouns": "he/him",
            "use_case": "work",
            "focus_areas": ["meetings", "ideas"],
            "tone": "warm and friendly",
            "voice_style": "encouraging coach",
        },
    )

    assert response.status_code == 200
    data = response.json()
    assert data["onboarding_completed"] is True
    assert data["full_name"] == "Carlos"
    assert data["tone"] == "warm and friendly"
    mock_upsert.assert_called_once_with(
        "user-123",
        "Carlos",
        "he/him",
        "work",
        ["meetings", "ideas"],
        "warm and friendly",
        "encouraging coach",
    )


@patch("app.dependencies.get_supabase_client")
def test_put_profile_rejects_missing_fields(mock_get_client):
    mock_get_client.return_value.auth.get_user.return_value.user.id = "user-123"

    response = client.put(
        "/profile",
        headers={"Authorization": "Bearer good-token"},
        json={"use_case": "work"},
    )

    assert response.status_code == 422
