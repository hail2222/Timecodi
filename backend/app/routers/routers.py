from fastapi import APIRouter
from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import datetime

from ..auth.authenticate import authenticate
from ..db.connection import get_db
from ..schemas.schemas import TokenResponse, UserSchema, EventSchema, GroupSchema, MeetingSchema, FriendSchema
from ..cruds.cruds import get_login, signin, signup, get_all_events,\
    event_register, event_remove, event_update, get_all_friends, \
    friend_register, friend_remove, get_all_requests, friend_request, request_remove, friend_accept, accept_remove, group_register, group_update, group_leave, \
    invited_register, member_register, \
    meeting_register, meeting_remove, meeting_update, get_all_meetings, \
    google_event_register, get_all_groupcal, get_my_group, get_weekly_groupcal
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

@router.post("/signin")
async def signin_user(user: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    get_token = await signin(user, db)
    return get_token

@router.post("/signup")
async def signup_user(user: UserSchema, db: Session = Depends(get_db)):
    register_success = await signup(user, db)
    return register_success

# @router.get("/event")    
# async def get_event(date: datetime.date, user: str = Depends(authenticate), db: Session = Depends(get_db)):
#     event_list = await get_all_events(date, user, db)
#     return event_list

@router.get("/event")    
async def get_event(user: str = Depends(authenticate), db: Session = Depends(get_db)):
    event_list = await get_all_events(user, db)
    return event_list

@router.post("/event")
async def add_event(event: EventSchema, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    register_success = await event_register(event, user, db)
    return register_success

@router.delete("/event")    
async def del_event(cid: int, deleteall: bool, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    remove_success = await event_remove(cid, deleteall, user, db)
    return remove_success

@router.put("/event")
async def update_event(cid: int, event: EventSchema, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    update_success = await event_update(cid, event, user, db)
    return update_success


@router.get("/friend")
async def get_friend(user: str = Depends(authenticate), db: Session = Depends(get_db)):
    friend_list = await get_all_friends(user, db)
    return friend_list

@router.post("/friend")
async def add_friend(friend: FriendSchema, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    register_success = await friend_register(friend, user, db)
    return register_success

@router.delete("/friend")
async def del_friend(friend: FriendSchema, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    remove_success = await friend_remove(friend, user, db)
    return remove_success

@router.get("/request")
async def get_request(user: str = Depends(authenticate), db: Session = Depends(get_db)):
    request_list = await get_all_requests(user, db)
    return request_list

@router.post("/request")
async def request_friend(friend: FriendSchema, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    request_success = await friend_request(friend, user, db)
    return request_success

@router.delete("/request")
async def delete_request(friend: FriendSchema, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    remove_success = await request_remove(friend, user, db)
    return remove_success

@router.post("/accept")
async def accept_friend(friend: FriendSchema, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    accept_success = await friend_accept(friend, user, db)
    return accept_success

@router.delete("/accept")
async def delete_accept(friend: FriendSchema, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    remove_success = await accept_remove(friend, user, db)
    return remove_success

@router.post("/group")
async def add_group(group: GroupSchema, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    register_success = await group_register(group, user, db)
    return register_success

@router.put("/group")
async def update_group(gid: int, group: GroupSchema, db: Session = Depends(get_db)):
    update_success = await group_update(gid, group, db)
    return update_success

@router.delete("/group")
async def delete_group(gid: int, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    remove_success = await group_leave(gid, user, db)
    return remove_success

@router.post("/invited")
async def add_group(gid: int, uid: str, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    register_success = await invited_register(gid, uid, user, db)
    return register_success


@router.post("/member")
async def add_member(gid: int, member: str, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    register_success = await member_register(gid, member, user, db)
    return register_success


@router.get("/meeting")    
async def get_meeting(gid: int, db: Session = Depends(get_db)):
    meeting_list = await get_all_meetings(gid, db)
    return meeting_list

@router.post("/meeting")
async def add_meeting(gid: int, db: Session = Depends(get_db)):
    register_success = await meeting_register(gid, db)
    return register_success

@router.put("/meeting")
async def update_event(meetid: int, meeting: MeetingSchema, db: Session = Depends(get_db)):
    update_success = await meeting_update(meetid, meeting, db)
    return update_success

@router.delete("/meeting")    
async def del_meeting(meetid: int, db: Session = Depends(get_db)):
    remove_success = await meeting_remove(meetid, db)
    return remove_success

@router.get("/group_cal")
async def add_group(gid: str, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    register_success = await get_all_groupcal(gid, user, db)
    return register_success


# google calendar 연동
@router.post("/google")
async def add_google_events(user: str = Depends(authenticate), db: Session = Depends(get_db)):
    register_success = await google_event_register(user, db)
    return register_success

# get my group list
@router.get("/mygrouplist")
async def get_mygrouplist(user: str = Depends(authenticate), db: Session = Depends(get_db)):
    group_list = await get_my_group(user, db)
    return group_list

# SELECT * FROM 'test'.'group calenders' WHERE gid=[input_gid] and sdatetime>=[input_start_date] and edatetime<=[input_end_date]
# get weekly group calendar
@router.get("/weeklygroupcal")
async def get_weekly_group_cal(gid: int, start_date: datetime.date, end_date: datetime.date, db: Session = Depends(get_db)):
    group_cal = await get_weekly_groupcal(gid, start_date, end_date, db)
    return group_cal