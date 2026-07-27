import asyncio
from types import SimpleNamespace
from unittest.mock import patch

import pytest
from fastapi import HTTPException

from app.dependencies import get_user_id_from_bearer_or_token


def _run(coro):
    return asyncio.run(coro)


@patch("app.dependencies.get_supabase_client")
def test_bearer_token_resolves_to_user_id(mock_get_client):
    mock_get_client.return_value.auth.get_user.return_value = SimpleNamespace(
        user=SimpleNamespace(id="user-123")
    )

    user_id = _run(
        get_user_id_from_bearer_or_token(authorization="Bearer good-token", x_api_key=None)
    )

    assert user_id == "user-123"


@patch("app.dependencies.resolve_token")
def test_x_api_key_resolves_to_user_id(mock_resolve_token):
    mock_resolve_token.return_value = "user-456"

    user_id = _run(
        get_user_id_from_bearer_or_token(authorization=None, x_api_key="hy_faketoken")
    )

    assert user_id == "user-456"
    mock_resolve_token.assert_called_once_with("hy_faketoken")


@patch("app.dependencies.get_supabase_client")
def test_invalid_bearer_token_raises_401(mock_get_client):
    mock_get_client.return_value.auth.get_user.side_effect = RuntimeError("invalid")

    with pytest.raises(HTTPException) as exc_info:
        _run(
            get_user_id_from_bearer_or_token(authorization="Bearer bad-token", x_api_key=None)
        )

    assert exc_info.value.status_code == 401


@patch("app.dependencies.resolve_token")
def test_invalid_x_api_key_raises_401(mock_resolve_token):
    mock_resolve_token.return_value = None

    with pytest.raises(HTTPException) as exc_info:
        _run(get_user_id_from_bearer_or_token(authorization=None, x_api_key="hy_badtoken"))

    assert exc_info.value.status_code == 401


def test_no_credentials_at_all_raises_401():
    with pytest.raises(HTTPException) as exc_info:
        _run(get_user_id_from_bearer_or_token(authorization=None, x_api_key=None))

    assert exc_info.value.status_code == 401


@patch("app.dependencies.resolve_token")
@patch("app.dependencies.get_supabase_client")
def test_bearer_is_tried_before_x_api_key_when_both_present(mock_get_client, mock_resolve_token):
    mock_get_client.return_value.auth.get_user.return_value = SimpleNamespace(
        user=SimpleNamespace(id="bearer-user")
    )
    mock_resolve_token.return_value = "token-user"

    user_id = _run(
        get_user_id_from_bearer_or_token(
            authorization="Bearer good-token", x_api_key="hy_faketoken"
        )
    )

    assert user_id == "bearer-user"
    mock_resolve_token.assert_not_called()
