from fastapi import APIRouter
from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import datetime
from fastapi.responses import FileResponse
from ..auth.authenticate import authenticate
from ..db.connection import get_db
from ..schemas.schemas import TokenResponse, UserSchema, EventSchema, displayEvent,\
    GroupSchema, MemberSchema, InviteSchema, MeetingSchema, displayMeeting, FriendSchema, VoteTimeSchema, VoteSchema
from ..cruds.cruds import get_login, signin, signup, get_all_events,\
    event_register, event_remove, event_update, get_all_friends, \
    friend_register, friend_remove, get_all_requests, friend_request, request_remove, friend_accept, accept_remove, group_register, group_update, group_leave, \
    invited_register, invited_delete, get_all_members, member_register, get_is_admin, kick_member, transfer_admin,\
    meeting_register, meeting_remove, meeting_update, get_all_meetings, group_remove,\
    google_event_register, get_all_groupcal, get_my_group, send_kakao, \
    invited_register, member_register, \
    meeting_register, meeting_remove, meeting_update, get_all_meetings, \
    google_event_register, get_all_groupcal, get_my_group, get_weekly_groupcal, get_groupinfo, get_my_invited, \
    favorite_group_register, favorite_group_get, favorite_group_delete, \
    get_votetime, generate_votetime, get_all_vote, vote_func, vote_register, vote_delete, get_voteresult, get_friendcal, get_membercal, get_upcoming, remove_account
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
async def update_event(event: displayEvent, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    update_success = await event_update(event, user, db)
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
async def delete_group(group: MemberSchema, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    remove_success = await group_remove(group, user, db)
    return remove_success

@router.post("/invited")
async def add_group(invite: InviteSchema, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    register_success = await invited_register(invite, user, db)
    return register_success

@router.delete("/invited")
async def delete_invited(group: MemberSchema, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    remove_success = await invited_delete(group, user, db)
    return remove_success

@router.get("/member")
async def get_member(gid: int, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    member_list = await get_all_members(gid, user, db)
    return member_list

@router.post("/member")
async def add_member(group: MemberSchema, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    register_success = await member_register(group, user, db)
    return register_success

@router.delete("/member")
async def delete_group(group: MemberSchema, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    remove_success = await group_leave(group, user, db)
    return remove_success

@router.get("/admin")
async def get_admin(gid: int, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    is_admin = await get_is_admin(gid, user, db)
    return is_admin

@router.put("/admin")
async def transfer(who: InviteSchema, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    transfer_success = await transfer_admin(who, user, db)
    return transfer_success

@router.delete("/admin")
async def kick_out(who: InviteSchema, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    kick_success = await kick_member(who, user, db)
    return kick_success

@router.get("/meeting")    
async def get_meeting(gid: int, db: Session = Depends(get_db)):
    meeting_list = await get_all_meetings(gid, db)
    return meeting_list

@router.post("/meeting")
async def add_meeting(meeting: MeetingSchema, db: Session = Depends(get_db)):
    register_success = await meeting_register(meeting, db)
    return register_success

@router.put("/meeting")
async def update_event(meeting: displayMeeting, db: Session = Depends(get_db)):
    update_success = await meeting_update(meeting, db)
    return update_success

@router.delete("/meeting")    
async def del_meeting(meetid: int, db: Session = Depends(get_db)):
    remove_success = await meeting_remove(meetid, db)
    return remove_success

@router.get("/group_cal")
async def add_group(gid: int, user: str = Depends(authenticate), db: Session = Depends(get_db)):
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

@router.get("/myinvitedlist")
async def get_myinvitedlist(user: str = Depends(authenticate), db: Session = Depends(get_db)):
    invited_list = await get_my_invited(user, db)
    return invited_list


@router.get("/favorite")
async def get_favorite_list(user: str = Depends(authenticate), db: Session = Depends(get_db)):
    register_success = await favorite_group_get(user, db)
    return register_success

@router.post("/favorite")
async def add_favorite_group(gid: int, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    register_success = await favorite_group_register(gid, user, db)
    return register_success

@router.delete("/favorite")
async def del_favorite_group(gid: int, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    register_success = await favorite_group_delete(gid, user, db)
    return register_success


# SELECT * FROM 'test'.'group calenders' WHERE gid=[input_gid] and sdatetime>=[input_start_date] and edatetime<=[input_end_date]
# get weekly group calendar
# @router.get("/weeklygroupcal")
# async def get_weekly_group_cal(gid: int, start_date: datetime.date, end_date: datetime.date, db: Session = Depends(get_db)):
#     group_cal = await get_weekly_groupcal(gid, start_date, end_date, db)
#     return group_cal


from fastapi import Request

@router.get("/kakaoshare")
async def send_kakaomsg(req: Request, gid: int, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    send_msg = await send_kakao(req, gid, user, db)
    return send_msg


@router.get("/invited/{gid}")
async def print_uid(gid: int, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    register_success = await invited_register(gid, user, user, db)
    return register_success

import os.path
from fastapi.templating import Jinja2Templates

templates=Jinja2Templates(directory='./app/googlemap')
@router.get("/googlemap")
async def get_map(req: Request):
    return templates.TemplateResponse('map.html',{"request":req})


@router.get("/weeklygroupcal")
async def get_weekly_group_cal(gid: int, start_date: datetime.date, end_date: datetime.date, db: Session = Depends(get_db)):
    group_cal = await get_weekly_groupcal(gid, start_date, end_date, db)
    return group_cal

# get group info by gid
@router.get("/groupinfo")
async def get_group_info(gid: int, db: Session = Depends(get_db)):
    group_info = await get_groupinfo(gid, db)
    return group_info


@router.get("/votetime")
async def get_vote_time(gid: int, db: Session = Depends(get_db)):
    vote_time = await get_votetime(gid, db)
    return vote_time

@router.post("/votetime")
async def generate_vote_time(vt: VoteTimeSchema, db: Session = Depends(get_db)):
    vote_time = await generate_votetime(vt, db)
    return vote_time

@router.get("/vote")
async def get_allvote(gid: int, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    vote = await get_all_vote(gid, user, db)
    return vote

@router.post("/vote")
async def add_vote(vid_list: VoteSchema, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    vote = await vote_func(vid_list, user, db)
    return vote

# @router.delete("/vote")
# async def del_vote(vid: int, user: str = Depends(authenticate), db: Session = Depends(get_db)):
#     vote = await vote_delete(vid, user, db)
#     return vote

@router.get("/voteresult")
async def get_vote_result(gid: int, db: Session = Depends(get_db)):
    vote_result = await get_voteresult(gid, db)
    return vote_result

@router.get("/friendcal")
async def get_friend_cal(fid: str, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    friend_cal = await get_friendcal(fid, user, db)
    return friend_cal

@router.get("/membercal")
async def get_member_cal(gid: int, fid: str, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    member_cal = await get_membercal(gid, fid, user, db)
    return member_cal

@router.get("/upcoming")
async def get_upcoming_meeting(gid: int, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    upcoming = await get_upcoming(gid, user, db)
    return upcoming

@router.delete("/account")
async def delete_account(user: str = Depends(authenticate), db: Session = Depends(get_db)):
    remove_success = await remove_account(user, db)
    return remove_success