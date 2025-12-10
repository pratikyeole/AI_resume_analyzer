from pydantic import BaseModel
from typing import List, Optional

class JobCreate(BaseModel):
    title: str
    company: str
    location: str
    description: str
    skills: List[str]

class JobInDB(JobCreate):
    embedding: Optional[List[float]] = None
