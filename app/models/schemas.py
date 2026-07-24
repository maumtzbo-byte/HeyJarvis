from typing import List

from pydantic import BaseModel, Field


class MemoryCreateRequest(BaseModel):
    user_id: str = Field(..., min_length=1)
    text: str = Field(..., min_length=1)


class MemoryCreateResponse(BaseModel):
    id: str
    summary: str


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


class MemoriesListResponse(BaseModel):
    user_id: str
    memories: List[MemoryItem]
