from unittest.mock import MagicMock, patch

from app.services.profile_service import get_profile, upsert_profile


@patch("app.services.profile_service.get_supabase_client")
def test_get_profile_returns_none_when_no_row_exists_yet(mock_get_client):
    mock_query = MagicMock()
    mock_get_client.return_value.table.return_value = mock_query
    mock_query.select.return_value = mock_query
    mock_query.eq.return_value = mock_query
    mock_query.maybe_single.return_value = mock_query
    mock_query.execute.return_value.data = None

    result = get_profile("user-123")

    assert result is None
    mock_get_client.return_value.table.assert_called_once_with("profiles")
    mock_query.eq.assert_called_once_with("user_id", "user-123")


@patch("app.services.profile_service.get_supabase_client")
def test_get_profile_returns_the_row_when_one_exists(mock_get_client):
    mock_query = MagicMock()
    mock_get_client.return_value.table.return_value = mock_query
    mock_query.select.return_value = mock_query
    mock_query.eq.return_value = mock_query
    mock_query.maybe_single.return_value = mock_query
    mock_query.execute.return_value.data = {"full_name": "Carlos", "tone": "warm and friendly"}

    result = get_profile("user-123")

    assert result == {"full_name": "Carlos", "tone": "warm and friendly"}


@patch("app.services.profile_service.get_supabase_client")
def test_upsert_profile_writes_all_fields_and_marks_onboarding_complete(mock_get_client):
    mock_query = MagicMock()
    mock_get_client.return_value.table.return_value = mock_query
    mock_query.upsert.return_value = mock_query
    mock_query.execute.return_value.data = [{"full_name": "Carlos", "onboarding_completed": True}]

    result = upsert_profile(
        "user-123",
        "Carlos",
        "he/him",
        "work",
        ["meetings", "ideas"],
        "warm and friendly",
        "encouraging coach",
    )

    assert result == {"full_name": "Carlos", "onboarding_completed": True}
    mock_query.upsert.assert_called_once_with(
        {
            "user_id": "user-123",
            "full_name": "Carlos",
            "pronouns": "he/him",
            "use_case": "work",
            "focus_areas": ["meetings", "ideas"],
            "tone": "warm and friendly",
            "voice_style": "encouraging coach",
            "onboarding_completed": True,
        },
        on_conflict="user_id",
    )
