from fastapi import APIRouter
from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from ..auth.authenticate import authenticate
from ..db.connection import get_db
from ..schemas.schemas import TokenResponse, UserSchema, EventSchema
from ..cruds.cruds import get_login, signin, signup, get_all_events, event_register, event_remove

router = APIRouter()

# @router.get("/{id}")
# async def load_user(id: str, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.id == id).first()
#     if not user:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No user")
#     return {"pw": user.pw}

@router.get("/login")
async def login(user: str = Depends(authenticate)):
    login_success = await get_login()
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
async def get_event(user: str = Depends(authenticate), db: Session = Depends(get_db)):
    event_list = await get_all_events(user, db)
    return event_list

@router.post("/event")
# 일정이 이미 존재하는 경우 고려하는 기능 추가 필요
async def add_event(event: EventSchema, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    register_success = await event_register(event, user, db)
    return register_success

@router.delete("/event")    
async def del_event(cid: int, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    remove_success = await event_remove(cid, user, db)
    return remove_success