import hashlib
from unittest.mock import MagicMock, patch

from app.services.token_service import (
    generate_token,
    list_tokens,
    resolve_token,
    revoke_token,
)


@patch("app.services.token_service.get_supabase_client")
def test_generate_token_returns_raw_token_and_stores_only_the_hash(mock_get_client):
    mock_table = MagicMock()
    mock_get_client.return_value.table.return_value = mock_table
    mock_table.insert.return_value.execute.return_value.data = [
        {
            "id": "token-1",
            "user_id": "user-123",
            "label": "iOS app",
            "token_hash": "placeholder",
            "token_prefix": "hy_abc123",
            "created_at": "2026-07-27T00:00:00+00:00",
            "last_used_at": None,
            "revoked_at": None,
        }
    ]

    result = generate_token("user-123", "iOS app")

    assert result["raw_token"].startswith("hy_")
    inserted_payload = mock_table.insert.call_args[0][0]
    assert inserted_payload["token_hash"] == hashlib.sha256(
        result["raw_token"].encode("utf-8")
    ).hexdigest()
    assert "raw_token" not in inserted_payload
    assert inserted_payload["token_prefix"] == result["raw_token"][:10]


@patch("app.services.token_service.get_supabase_client")
def test_generate_token_retries_on_hash_collision(mock_get_client):
    mock_table = MagicMock()
    mock_get_client.return_value.table.return_value = mock_table
    success_response = MagicMock()
    success_response.data = [
        {
            "id": "token-1",
            "user_id": "user-123",
            "label": "iOS app",
            "token_hash": "placeholder",
            "token_prefix": "hy_abc123",
            "created_at": "2026-07-27T00:00:00+00:00",
            "last_used_at": None,
            "revoked_at": None,
        }
    ]
    mock_table.insert.return_value.execute.side_effect = [
        Exception("duplicate key value violates unique constraint"),
        success_response,
    ]

    result = generate_token("user-123")

    assert result["id"] == "token-1"
    assert mock_table.insert.return_value.execute.call_count == 2


@patch("app.services.token_service.get_supabase_client")
def test_resolve_token_returns_user_id_for_a_valid_unrevoked_token(mock_get_client):
    mock_table = MagicMock()
    mock_get_client.return_value.table.return_value = mock_table
    mock_table.select.return_value = mock_table
    mock_table.eq.return_value = mock_table
    mock_table.maybe_single.return_value = mock_table
    mock_table.execute.return_value.data = {
        "id": "token-1",
        "user_id": "user-123",
        "revoked_at": None,
    }
    mock_table.update.return_value.eq.return_value.execute.return_value = None

    user_id = resolve_token("hy_realtoken")

    assert user_id == "user-123"


@patch("app.services.token_service.get_supabase_client")
def test_resolve_token_returns_none_for_a_revoked_token(mock_get_client):
    mock_table = MagicMock()
    mock_get_client.return_value.table.return_value = mock_table
    mock_table.select.return_value = mock_table
    mock_table.eq.return_value = mock_table
    mock_table.maybe_single.return_value = mock_table
    mock_table.execute.return_value.data = {
        "id": "token-1",
        "user_id": "user-123",
        "revoked_at": "2026-07-27T00:00:00+00:00",
    }

    assert resolve_token("hy_revokedtoken") is None


@patch("app.services.token_service.get_supabase_client")
def test_resolve_token_returns_none_for_a_token_without_the_hy_prefix(mock_get_client):
    assert resolve_token("not-a-real-token") is None
    mock_get_client.return_value.table.assert_not_called()


@patch("app.services.token_service.get_supabase_client")
def test_resolve_token_returns_none_when_no_matching_row_exists(mock_get_client):
    mock_table = MagicMock()
    mock_get_client.return_value.table.return_value = mock_table
    mock_table.select.return_value = mock_table
    mock_table.eq.return_value = mock_table
    mock_table.maybe_single.return_value = mock_table
    mock_table.execute.return_value.data = None

    assert resolve_token("hy_unknowntoken") is None


@patch("app.services.token_service.get_supabase_client")
def test_resolve_token_fails_closed_when_the_lookup_raises(mock_get_client):
    """A transient Supabase/network error while resolving a token must not
    surface as a 500 on every /memory, /query, /memories call — it should
    be treated the same as an invalid token (401), not a server crash."""
    mock_table = MagicMock()
    mock_get_client.return_value.table.return_value = mock_table
    mock_table.select.return_value = mock_table
    mock_table.eq.return_value = mock_table
    mock_table.maybe_single.return_value = mock_table
    mock_table.execute.side_effect = RuntimeError("network blip")

    assert resolve_token("hy_sometoken") is None


@patch("app.services.token_service.get_supabase_client")
def test_list_tokens_returns_rows_ordered_by_created_at_desc(mock_get_client):
    mock_table = MagicMock()
    mock_get_client.return_value.table.return_value = mock_table
    mock_table.select.return_value = mock_table
    mock_table.eq.return_value = mock_table
    mock_table.order.return_value = mock_table
    mock_table.execute.return_value.data = [{"id": "token-2"}, {"id": "token-1"}]

    result = list_tokens("user-123")

    assert result == [{"id": "token-2"}, {"id": "token-1"}]
    mock_table.order.assert_called_once_with("created_at", desc=True)


@patch("app.services.token_service.get_supabase_client")
def test_revoke_token_returns_true_when_a_row_was_updated(mock_get_client):
    mock_table = MagicMock()
    mock_get_client.return_value.table.return_value = mock_table
    mock_table.update.return_value = mock_table
    mock_table.eq.return_value = mock_table
    mock_table.is_.return_value = mock_table
    mock_table.execute.return_value.data = [{"id": "token-1"}]

    assert revoke_token("user-123", "token-1") is True


@patch("app.services.token_service.get_supabase_client")
def test_revoke_token_returns_false_when_no_matching_row_found(mock_get_client):
    mock_table = MagicMock()
    mock_get_client.return_value.table.return_value = mock_table
    mock_table.update.return_value = mock_table
    mock_table.eq.return_value = mock_table
    mock_table.is_.return_value = mock_table
    mock_table.execute.return_value.data = []

    assert revoke_token("user-123", "not-owned-or-already-revoked") is False
