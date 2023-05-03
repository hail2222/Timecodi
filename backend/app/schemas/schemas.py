from pydantic import BaseModel
from datetime import datetime

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class UserSchema(BaseModel):
    id: str
    pw: str
    name: str

class EventSchema(BaseModel):
    cname: str
    visibility: bool
    sdatetime: datetime
    edatetime: datetime