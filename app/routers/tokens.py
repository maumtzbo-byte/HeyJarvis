import logging
from typing import List

from fastapi import APIRouter, Depends, HTTPException

from app.dependencies import get_current_user_id
from app.models.schemas import TokenCreateRequest, TokenCreateResponse, TokenListItem
from app.services.token_service import generate_token, list_tokens, revoke_token

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/profile/tokens", tags=["tokens"])


@router.post("", response_model=TokenCreateResponse)
async def create_token(
    payload: TokenCreateRequest, user_id: str = Depends(get_current_user_id)
) -> TokenCreateResponse:
    try:
        token = generate_token(user_id, payload.label)
    except Exception as exc:
        logger.exception("Error generating a personal API token for user %s", user_id)
        raise HTTPException(status_code=500, detail="Could not generate a token") from exc
    return TokenCreateResponse(
        id=token["id"],
        raw_token=token["raw_token"],
        label=token["label"],
        created_at=token["created_at"],
    )


@router.get("", response_model=List[TokenListItem])
async def get_tokens(user_id: str = Depends(get_current_user_id)) -> List[TokenListItem]:
    try:
        return [TokenListItem(**row) for row in list_tokens(user_id)]
    except Exception as exc:
        logger.exception("Error listing personal API tokens for user %s", user_id)
        raise HTTPException(status_code=500, detail="Could not fetch tokens") from exc


@router.delete("/{token_id}", status_code=204)
async def delete_token(token_id: str, user_id: str = Depends(get_current_user_id)) -> None:
    try:
        found = revoke_token(user_id, token_id)
    except Exception as exc:
        logger.exception("Error revoking token %s for user %s", token_id, user_id)
        raise HTTPException(status_code=500, detail="Could not revoke token") from exc
    if not found:
        raise HTTPException(status_code=404, detail="Token not found")
