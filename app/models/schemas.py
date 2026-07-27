from typing import List, Optional

from pydantic import BaseModel, Field


class MemoryCreateRequest(BaseModel):
    user_id: str = Field(..., min_length=1)
    text: str = Field(..., min_length=1, max_length=4000)


class MemoryCreateResponse(BaseModel):
    id: str
    summary: str
    reminder_at: Optional[str] = None


class QueryRequest(BaseModel):
    user_id: str = Field(..., min_length=1)
    question: str = Field(..., min_length=1, max_length=2000)


class MemoryUsedItem(BaseModel):
    id: str
    summary: str


class QueryResponse(BaseModel):
    response: str
    memories_used: List[str]
    memories_used_detail: List[MemoryUsedItem] = Field(default_factory=list)


class MemoryItem(BaseModel):
    id: str
    text: str
    summary: str
    created_at: str
    reminder_at: Optional[str] = None


class MemoriesListResponse(BaseModel):
    user_id: str
    memories: List[MemoryItem]


class ProfileRequest(BaseModel):
    full_name: str = Field(..., min_length=1, max_length=200)
    pronouns: Optional[str] = Field(default=None, max_length=100)
    use_case: str = Field(..., min_length=1, max_length=100)
    focus_areas: List[str] = Field(default_factory=list, max_length=20)
    tone: str = Field(..., min_length=1, max_length=200)
    voice_style: str = Field(..., min_length=1, max_length=200)


class ProfileResponse(BaseModel):
    full_name: Optional[str] = None
    pronouns: Optional[str] = None
    use_case: Optional[str] = None
    focus_areas: List[str] = Field(default_factory=list)
    tone: Optional[str] = None
    voice_style: Optional[str] = None
    onboarding_completed: bool = False


class TokenCreateRequest(BaseModel):
    label: str = Field(default="iOS app", max_length=100)


class TokenCreateResponse(BaseModel):
    id: str
    raw_token: str
    label: str
    created_at: str


class TokenListItem(BaseModel):
    id: str
    label: str
    token_prefix: str
    created_at: str
    last_used_at: Optional[str] = None
    revoked_at: Optional[str] = None
