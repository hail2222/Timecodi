from fastapi import APIRouter
from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import datetime

from ..auth.authenticate import authenticate
from ..db.connection import get_db
from ..schemas.schemas import TokenResponse, UserSchema, EventSchema
from ..cruds.cruds import get_login, signin, signup, get_all_events,\
    event_register, event_remove, get_all_friends, \
    friend_register, group_register, member_register, google_event_register
router = APIRouter()

# @router.get("/{id}")
# async def load_user(id: str, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.id == id).first()
#     if not user:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No user")
#     return {"pw": user.pw}

@router.get("/login")
async def login(user: str = Depends(authenticate)):
    login_success = await get_login(user)
    return login_success

@router.post("/signin", response_model=TokenResponse)
async def signin_user(user: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    get_token = await signin(user, db)
    return get_token

@router.post("/signup")
async def signup_user(user: UserSchema, db: Session = Depends(get_db)):
    register_success = await signup(user, db)
    return register_success

@router.get("/event")    
async def get_event(date: datetime.date, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    event_list = await get_all_events(date, user, db)
    return event_list

@router.post("/event")
async def add_event(event: EventSchema, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    register_success = await event_register(event, user, db)
    return register_success

@router.delete("/event")    
async def del_event(cid: int, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    remove_success = await event_remove(cid, user, db)
    return remove_success

@router.get("/friend")
async def get_friend(user: str = Depends(authenticate), db: Session = Depends(get_db)):
    friend_list = await get_all_friends(user, db)
    return friend_list

@router.post("/friend")
async def add_friend(fid: str, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    register_success = await friend_register(fid, user, db)
    return register_success

@router.post("/group")
async def add_group(gname: str, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    register_success = await group_register(gname, user, db)
    return register_success

@router.post("/member")
async def add_member(gid: int, member: str, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    register_success = await member_register(gid, member, user, db)
    return register_success

@router.post("/google")
async def add_google_events(user: str = Depends(authenticate), db: Session = Depends(get_db)):
    register_success = await google_event_register(user, db)
    return register_success