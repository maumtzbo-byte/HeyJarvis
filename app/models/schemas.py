from typing import List, Optional

from pydantic import BaseModel, Field


class MemoryCreateRequest(BaseModel):
    user_id: str = Field(..., min_length=1)
    text: str = Field(..., min_length=1)


class MemoryCreateResponse(BaseModel):
    id: str
    summary: str
    reminder_at: Optional[str] = None


class QueryRequest(BaseModel):
    user_id: str = Field(..., min_length=1)
    question: str = Field(..., min_length=1)


class QueryResponse(BaseModel):
    response: str
    memories_used: List[str]


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
    full_name: str = Field(..., min_length=1)
    pronouns: Optional[str] = None
    use_case: str = Field(..., min_length=1)
    focus_areas: List[str] = Field(default_factory=list)
    tone: str = Field(..., min_length=1)
    voice_style: str = Field(..., min_length=1)


class ProfileResponse(BaseModel):
    full_name: Optional[str] = None
    pronouns: Optional[str] = None
    use_case: Optional[str] = None
    focus_areas: List[str] = Field(default_factory=list)
    tone: Optional[str] = None
    voice_style: Optional[str] = None
    onboarding_completed: bool = False
