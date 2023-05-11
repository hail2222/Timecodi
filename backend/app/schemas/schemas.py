from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class UserSchema(BaseModel):
    id: str
    pw: str
    name: str

class EventSchema(BaseModel):
    cname: str
    visibility: str
    sdatetime: datetime
    edatetime: datetime
    weekly: int
    enddate: Optional[date]
    
class GroupSchema(BaseModel):
    gname: str
    
class MeetingSchema(BaseModel):
    title: str
    sdatetime: datetime
    edatetime: datetime
    location: str
    memo: str