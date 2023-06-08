from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from sqlalchemy import func, or_, and_
from datetime import datetime, timedelta

from ..auth.jwt_handler import create_access_token
from ..models.models import User, Event, Friend, FriendRequest, Group, Member, Meeting,\
    GroupEvent, Invited, Favorite, GenerateVote, Vote, VoteResult
from ..auth.hash_password import HashPassword
from ..schemas.schemas import UserSchema, EventSchema, GroupSchema, MemberSchema, InviteSchema, \
    MeetingSchema, displayMeeting, FriendSchema, VoteTimeSchema, VoteSchema, displayEvent
from ..googlecal.cal_func import get_event
from ..timecodi.timecodi import calender_to_timetable
from ..timecodi.generatevote import create_vote

import random

hash_password = HashPassword()

async def get_login(user: str):
    return {"success": True}

async def signin(user: OAuth2PasswordRequestForm, db: Session):
    user_exist = db.query(User).filter(User.id == user.username).first()
    if not user_exist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User doesn't exist")
    if hash_password.verify_hash(user.password, user_exist.pw):
        access_token = create_access_token(user_exist.id)
        return {
            "access_token": access_token,
            "token_type": "Bearer",
            "userid": user_exist.id,
            "username": user_exist.name
        }
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid details passed")

async def signup(user: UserSchema, db: Session):
    user_exist = db.query(User).filter(User.id == user.id).first()
    if user_exist:
        raise HTTPException(status_code=401, detail="Existed user")
    user.pw = hash_password.create_hash(user.pw)
    db_user = User(id=user.id, pw=user.pw, name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"msg": "User created successfully."}

# async def get_all_events(date: datetime.date, user: str, db: Session):
#     return db.query(Event).filter(Event.uid == user, func.date(Event.sdatetime) <= date, date <= func.date(Event.edatetime)).all()

async def get_all_events(user: str, db: Session):
    return db.query(Event).filter(Event.uid == user).all()

def genPass():
    alphabet="abcdefghijklmnopqrstuvwxyz0123456789"
    weekly_word=""
    for i in range(6):
        index=random.randrange(len(alphabet))
        weekly_word=weekly_word+alphabet[index]
    return weekly_word

async def event_register(event: EventSchema, user: str, db: Session):
    if event.edatetime <= event.sdatetime:
        return {"msg": "invalid event."}
    event_exist = db.query(Event).filter(Event.uid == user,
    or_(
        and_((Event.sdatetime <= event.sdatetime), (event.sdatetime < Event.edatetime)),
        and_((Event.sdatetime < event.edatetime), (event.edatetime <= Event.edatetime)),
        and_((event.sdatetime <= Event.sdatetime), (Event.sdatetime < event.edatetime)),
        and_((event.sdatetime < Event.edatetime), (Event.edatetime <= event.edatetime))
        )
    ).all()
    if event_exist:
        return {"msg": "event exist."}    
    # enddate가 null이 아니면 enddate까지 일주일마다 반복
    if event.enddate:
        if event.edatetime.date() > event.enddate:
            return {"msg": "invalid event."}
        else:
            weekly_id=genPass()
            while event.edatetime.date()<=event.enddate:
                db_event = Event(uid=user, cname=event.cname, visibility=event.visibility, \
                    sdatetime=event.sdatetime, edatetime=event.edatetime, weekly=weekly_id, enddate=event.enddate)
                db.add(db_event)
                db.commit()
                db.refresh(db_event)
                calendar_success = await groupcal_register(db_event.cid, user, db)
                event.sdatetime+=timedelta(weeks=1)
                event.edatetime+=timedelta(weeks=1)
    # enddate가 null이면 반복 x
    else:       
        db_event = Event(uid=user, cname=event.cname, visibility=event.visibility, \
            sdatetime=event.sdatetime, edatetime=event.edatetime, weekly=event.weekly, enddate=event.enddate)
        db.add(db_event)
        db.commit()
        db.refresh(db_event)
        calendar_success = await groupcal_register(db_event.cid, user, db)
    return {"msg": "event added successfully."}
        

async def event_remove(cid: int, deleteall: bool, user: str, db: Session):
    db_event = db.query(Event).filter(Event.uid == user, Event.cid == cid).first()
    if not db_event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event doesn't exist")
    calendar_success = await groupcal_remove(db_event.cid, db)
    db.delete(db_event)
    db.commit()
    weekly_id=db_event.weekly
    
    if deleteall==True and weekly_id!="0":        
        while True:
            db_event = db.query(Event).filter(Event.uid == user, Event.weekly == weekly_id).first()
            if not db_event:
                break
            calendar_success = await groupcal_remove(db_event.cid, db)
            db.delete(db_event)
            db.commit()
    return {"msg": "event deleted successfully."}    

async def event_update(event: displayEvent, user: str, db: Session):
    db_event = db.query(Event).filter(Event.uid == user, Event.cid == event.cid).first()
    if not db_event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event doesn't exist")
    db_event.cname = event.cname
    db_event.visibility = event.visibility
    db_event.sdatetime = event.sdatetime
    db_event.edatetime = event.edatetime
    db.add(db_event)
    db.commit()
    calendar_success = await groupcal_update(event.cid, event, db)
    return {"msg": "event updated successfully."}


async def get_all_friends(user: str, db: Session):
    select = db.query(User).join(Friend, Friend.fid == User.id).filter(Friend.uid == user).all()
    friendList = []
    for i in select:
        friendList.append({"id": i.id, "name": i.name})
    return friendList

async def friend_register(friend: FriendSchema, user: str, db: Session):
    friend_user_exist = db.query(User).filter(User.id == friend.fid).first()
    if not friend_user_exist:
        raise HTTPException(status_code=404, detail="There is no user")
    already_friend = db.query(Friend).filter(Friend.uid == user, Friend.fid == friend.fid).first()
    if already_friend:
        raise HTTPException(status_code=401, detail="already friend")
    db_friendship_1 = Friend(uid=user, fid=friend.fid)
    db_friendship_2 = Friend(uid=friend.fid, fid=user)
    db.add(db_friendship_1)
    db.add(db_friendship_2)
    db.commit()
    db.refresh(db_friendship_1)
    db.refresh(db_friendship_2)
    return {"msg": "friend added successfully."}

async def friend_remove(friend: FriendSchema, user: str, db: Session):
    db_friendship1 = db.query(Friend).filter(Friend.uid == user, Friend.fid == friend.fid).first()
    if not db_friendship1:
        raise HTTPException(status_code=404, detail="There is no friend")
    db_friendship2 = db.query(Friend).filter(Friend.uid == friend.fid, Friend.fid == user).first()
    db.delete(db_friendship1)
    db.delete(db_friendship2)
    db.commit()
    return {"msg": "friend deleted successfully."}

async def get_all_requests(user: str, db: Session):
    # return db.query(FriendRequest).filter(FriendRequest.fid == user).all()
    return db.query(User).join(FriendRequest, FriendRequest.uid == User.id).filter(FriendRequest.fid == user).all()

async def friend_request(friend: FriendSchema, user: str, db: Session):
    friend_user_exist = db.query(User).filter(User.id == friend.fid).first()
    if user == friend.fid:
        raise HTTPException(status_code=401, detail="it's you")
    if not friend_user_exist:
        raise HTTPException(status_code=404, detail="There is no user")
    already_friend = db.query(Friend).filter(Friend.uid == user, Friend.fid == friend.fid).first()
    if already_friend:
        raise HTTPException(status_code=401, detail="already friend")

    friend_request_exist = db.query(FriendRequest).filter(or_(FriendRequest.uid == user, FriendRequest.fid == user)).all()
    if friend_request_exist:
        raise HTTPException(status_code=401, detail="already request")

    db_friendrequest = FriendRequest(uid=user, fid=friend.fid)
    db.add(db_friendrequest)
    db.commit()
    db.refresh(db_friendrequest)
    return {"msg": "send friend request successfully."}

async def request_remove(friend: FriendSchema, user: str, db: Session):
    friend_request_exist = db.query(FriendRequest).filter(FriendRequest.uid == user, FriendRequest.fid == friend.fid).first()
    if not friend_request_exist:
        raise HTTPException(status_code=404, detail="There is no request")

    db.delete(friend_request_exist)
    db.commit()
    return {"msg": "delete friend request successfully."}

async def friend_accept(friend: FriendSchema, user: str, db: Session):
    friend_request_exist = db.query(FriendRequest).filter(FriendRequest.uid == friend.fid, FriendRequest.fid == user).first()
    if not friend_request_exist:
        raise HTTPException(status_code=404, detail="There is no request")

    db_friendship_1 = Friend(uid=user, fid=friend.fid)
    db_friendship_2 = Friend(uid=friend.fid, fid=user)
    db.add(db_friendship_1)
    db.add(db_friendship_2)
    db.delete(friend_request_exist)
    db.commit()
    db.refresh(db_friendship_1)
    db.refresh(db_friendship_2)
    return {"msg": "friend added successfully."}

async def accept_remove(friend: FriendSchema, user: str, db: Session):
    friend_request_exist = db.query(FriendRequest).filter(FriendRequest.uid == friend.fid, FriendRequest.fid == user).first()
    if not friend_request_exist:
        raise HTTPException(status_code=404, detail="There is no accept")

    db.delete(friend_request_exist)
    db.commit()
    return {"msg": "reject accept successfully."}

async def group_register(group: GroupSchema, user: str, db: Session):
    db_group = Group(gname=group.gname, admin=user)
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    register_success = await member_register2(db_group.gid, user, user, db)
    return {"msg": "group added successfully."}

# 그룹명 수정
async def group_update(gid: int, group: GroupSchema, db: Session):
    db_group = db.query(Group).filter(Group.gid == gid).first()
    if not db_group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group doesn't exist")
    db_group.gname = group.gname
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return {"msg": "group name updated successfully."}

async def group_remove(group: MemberSchema, user: str, db: Session):
    db_group = db.query(Group).filter(Group.gid == group.gid).first()
    if not db_group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group doesn't exist")

    if not get_is_admin(group.gid, user, db):
        return {"msg": "admin can only"}
    # 멤버, 그룹 일정, 미팅 일정, 초대, 즐겨찾기, 그룹 삭제
    db_member = db.query(Member).filter(Member.gid == group.gid).all()
    for member in db_member:
        db.delete(member)

    db_favorite = db.query(Favorite).filter(Favorite.gid == group.gid).all()
    for favorite in db_favorite:
        db.delete(favorite)

    db_groupcal = db.query(GroupEvent).filter(GroupEvent.gid == group.gid).all()
    for groupcal in db_groupcal:
        db.delete(groupcal)
    
    db_invite = db.query(Invited).filter(Invited.gid == group.gid).all()
    for invite in db_invite:
        db.delete(invite)

    db_meeting = db.query(Meeting).filter(Meeting.gid == group.gid).all()
    for meeting in db_meeting:
        db.delete(meeting)

    db.delete(db_group)
    db.commit()
    return {"msg": "delete success"}

async def group_leave(group: MemberSchema, user: str, db: Session):
    db_group = db.query(Group).filter(Group.gid == group.gid).first()
    if not db_group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group doesn't exist")
    db_member = db.query(Member).filter(Member.gid == group.gid, Member.uid == user).first()
    if not db_member:
        raise HTTPException(status_code=401, detail="Not group member")
    if get_is_admin(group.gid, user, db):
        return {"msg": "Transfer the admin permission and then leave please."}
    db.delete(db_member)
    db.commit()
    
    db_favorite = db.query(Favorite).filter(Favorite.gid == group.gid, Favorite.uid == user).first()
    if db_favorite:
        # raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Favorite group doesn't exist")
        db.delete(db_favorite)
        db.commit()
    
    db_event = db.query(Event).filter(Event.uid == user).all()
    for x in db_event:
        db_delete = db.query(GroupEvent).filter(GroupEvent.gid == group.gid, GroupEvent.ccid == x.cid).first()
        db.delete(db_delete)
        db.commit()
    return {"msg": "group member deleted successfully."}

async def invited_register(invite: InviteSchema, user: str, db: Session):
    if get_is_admin(invite.gid, user, db):
        db_user = db.query(User).filter(User.id == invite.uid).first()
        if not db_user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User doesn't exist")
        already_invited = db.query(Invited).filter(Invited.uid == invite.uid, Invited.gid == invite.gid).first()
        if already_invited:
            raise HTTPException(status_code=401, detail="already invited")
        already_member = db.query(Member).filter(Member.gid == invite.gid, Member.uid == invite.uid).first()
        if already_member:
            raise HTTPException(status_code=401, detail="already member")
        db_group = Invited(gid=invite.gid, uid=invite.uid)
        db.add(db_group)
        db.commit()
        db.refresh(db_group)
        return {"msg": "invited added successfully."}
    else:
        raise HTTPException(status_code=status.HTTP_401_NOT_FOUND, detail="Only admin can invite members")

async def invited_delete(group: MemberSchema, user: str, db: Session):
    already_invited = db.query(Invited).filter(Invited.uid == user, Invited.gid == group.gid).first()
    if not already_invited:
        raise HTTPException(status_code=401, detail="not already invited")
    
    db.delete(already_invited)
    db.commit()
    return {"msg": "invited deleted successfully."}

    
async def get_all_meetings(gid: int, db: Session):
    return db.query(Meeting).filter(Meeting.gid == gid).all()

async def meeting_register(meeting: MeetingSchema, db: Session):
    db_group = db.query(Group).filter(Group.gid == meeting.gid).first()
    if not db_group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group doesn't exist")
    db_meeting = Meeting(gid = meeting.gid, 
                         title = meeting.title,
                         sdatetime = meeting.sdatetime,
                         edatetime = meeting.edatetime,
                         location = meeting.location,
                         loc_detail = meeting.loc_detail,
                         memo = meeting.memo)
    db.add(db_meeting)
    db.commit()
    db.refresh(db_meeting)
    return {"msg": "meeting added successfully."}

async def meeting_update(meeting: displayMeeting, db: Session):
    db_meeting = db.query(Meeting).filter(Meeting.meetid == meeting.meetid).first()
    if not db_meeting:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meeting doesn't exist")
    db_meeting.title = meeting.title
    db_meeting.sdatetime = meeting.sdatetime
    db_meeting.edatetime = meeting.edatetime
    db_meeting.location = meeting.location
    db_meeting.loc_detail = meeting.loc_detail
    db_meeting.memo = meeting.memo
    db.add(db_meeting)
    db.commit()
    return {"msg": "meeting info updated successfully."}

async def meeting_remove(meetid: int, db: Session):
    db_meeting = db.query(Meeting).filter(Meeting.meetid == meetid).first()
    if not db_meeting:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meeting doesn't exist")
    db.delete(db_meeting)
    db.commit()
    return {"msg": "meeting deleted successfully."}

async def get_all_members(gid: int, user: str, db: Session):
    select = db.query(User).join(Member, Member.uid == User.id).filter(Member.gid == gid).all()
    memberList = []
    for i in select:
        memberList.append({"id": i.id, "name": i.name})
    return memberList

async def member_register(group: MemberSchema, user: str, db: Session):
    db_user = db.query(User).filter(User.id == user).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User doesn't exist")
    already_member = db.query(Member).filter(Member.gid == group.gid, Member.uid == user).first()
    if already_member:
        raise HTTPException(status_code=401, detail="already member")
    already_invited = db.query(Invited).filter(Invited.uid == user, Invited.gid == group.gid).first()
    if not already_invited:
        raise HTTPException(status_code=401, detail="not already invited")
    db_member = Member(gid=group.gid, uid=user)
    db.add(db_member)
    db.delete(already_invited)
    db.commit()
    db.refresh(db_member)
    calendar_success = await groupcal_register2(group.gid, user, db)
    return {"msg": "member added successfully."}

async def member_register2(gid: int, member: str, user: str, db: Session):
    db_user = db.query(User).filter(User.id == member).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User doesn't exist")
    already_member = db.query(Member).filter(Member.gid == gid, Member.uid == member).first()
    if already_member:
        raise HTTPException(status_code=401, detail="already member")
    db_member = Member(gid=gid, uid=member)
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    calendar_success = await groupcal_register2(gid, member, db)
    return {"msg": "member added successfully."}

async def get_is_admin(gid: int, user: str, db: Session):
    db_group = db.query(Group).filter(Group.gid==gid).first()
    if not db_group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group doesn't exist")
    return user == db_group.admin

async def transfer_admin(who: InviteSchema, user: str, db: Session):
    if get_is_admin(who.gid, user, db):
        if who.uid == user:
            raise HTTPException(status_code=401, detail="You are already admin!")
        db_group = db.query(Group).filter(Group.gid==who.gid).first()
        db_group.admin = who.uid
        group = {"gid": who.gid}
        group_leave(group, user, db)
        db.commit()
        db.refresh(db_group)
        return {"success": True}
    else:
        return {"success": False}
async def kick_member(who: InviteSchema, user: str, db: Session):
    if get_is_admin(who.gid, user, db):
        db_group = db.query(Group).filter(Group.gid == who.gid).first()
        if not db_group:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group doesn't exist")
        db_member = db.query(Member).filter(Member.gid == who.gid, Member.uid == who.uid).first()
        if not db_member:
            raise HTTPException(status_code=401, detail="Not group member")
        if who.uid == user:
            raise HTTPException(status_code=401, detail="You can't kick out yourself!")
        db.delete(db_member)
        db.commit()
        
        db_favorite = db.query(Favorite).filter(Favorite.gid == who.gid, Favorite.uid == who.uid).first()
        if db_favorite:
            db.delete(db_favorite)
            db.commit()
        
        db_event = db.query(Event).filter(Event.uid == who.uid).all()
        for x in db_event:
            db_delete = db.query(GroupEvent).filter(GroupEvent.gid == who.gid, GroupEvent.ccid == x.cid).first()
            db.delete(db_delete)
            db.commit()
        return {"success": True}
    else:
        return {"success": False}

# 멤버인 상태에서 개인 캘린더 추가하면 반영
async def groupcal_register(ccid: int, member: str, db: Session):
    db_member = db.query(Member).filter(Member.uid == member).all()
    for x in db_member:
        db_exist = db.query(Event).filter(Event.uid == member, Event.cid == ccid).first()
        if not db_exist:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event doesn't exist") 
        db_event = GroupEvent(gid=x.gid, ccid=db_exist.cid, cname=db_exist.cname, \
            sdatetime=db_exist.sdatetime, edatetime=db_exist.edatetime, visibility=db_exist.visibility)
        db.add(db_event)
        db.commit()
    return {"msg": "group calendar added successfully."}

# 멤버 등록시 그룹캘린더에 일정 추가
async def groupcal_register2(gid: int, member: str, db: Session):
    db_group = db.query(Group).filter(Group.gid == gid).first()
    if not db_group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group doesn't exist") 
    db_allevent = db.query(Event).filter(Event.uid == member).all()
    for x in db_allevent:
        db_event = GroupEvent(gid=gid, ccid=x.cid, cname=x.cname, \
            sdatetime=x.sdatetime, edatetime=x.edatetime, visibility=x.visibility)
        db.add(db_event)
        db.commit()
    return {"msg": "user events added to group calendar successfully."}

async def groupcal_update(ccid: int, event: EventSchema, db: Session):
    db_event = db.query(GroupEvent).filter(GroupEvent.ccid == ccid).all()
    if not db_event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="events doesn't exist")
    for x in db_event:
        x.cname = event.cname
        x.sdatetime = event.sdatetime
        x.edatetime = event.edatetime
        x.visibility = event.visibility
        db.add(x)
        db.commit()
    return {"msg": "events info updated successfully."}

async def groupcal_remove(ccid: int, db: Session):
    db_event = db.query(GroupEvent).filter(GroupEvent.ccid == ccid).all()
    if not db_event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="events doesn't exist")
    for x in db_event:
        db.delete(x)
        db.commit()
    return {"msg": "events deleted successfully."}

async def get_all_groupcal(gid: int, user: str, db: Session):
    return db.query(GroupEvent).filter(GroupEvent.gid == gid).all()

async def google_event_register(user: str, db: Session):
    google=get_event()
    # print(google)
    if google==None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Google event doesn't exist")
    for event in google:
        sdt=event[0]
        edt=event[1]
        cn=event[2]
        vsb=event[3]
        event_exist = db.query(Event).filter(Event.uid == user,
        or_(
            and_((Event.sdatetime <= sdt), (sdt < Event.edatetime)),
            and_((Event.sdatetime < edt), (edt <= Event.edatetime)),
            and_((sdt <= Event.sdatetime), (Event.sdatetime < edt)),
            and_((sdt< Event.edatetime), (Event.edatetime <= edt))
            )
        ).all()
        
        if event_exist:
            continue
        else:
            db_event = Event(uid=user, cname=cn, visibility=vsb, sdatetime=sdt, edatetime=edt, weekly="0", enddate=None)
            db.add(db_event)
            db.commit()
            db.refresh(db_event)
    return {"msg": "google calendar events added successfully."}

async def get_my_group(user: str, db: Session):
    db_group = db.query(Group).filter(Group.gid == Member.gid, Member.uid == user).all()
    # if not db_group:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group doesn't exist")
    return db_group

async def get_my_invited(user: str, db: Session):
    db_invited = db.query(Group).join(Invited, Invited.gid == Group.gid).filter(Invited.uid == user).all()
    # if not db_invited:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invited list doesn't exist")
    return db_invited


from fastapi import Request
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates

templates=Jinja2Templates(directory='./app/kakaoshare')
async def send_kakao(req: Request, gid: int, user: str, db: Session):
    db_group = db.query(Group).filter(Group.gid == gid).first()
    if not db_group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group doesn't exist")
    return templates.TemplateResponse("kakao_share.html",
                                      {"request": req,
                                       "groupname": db_group.gname,
                                       "gid": gid,
                                       "username": user})
    # return RedirectResponse("/", status_code=302)

async def get_weekly_groupcal(gid: int, start_date: datetime, end_date: datetime, db: Session):
    db_event = db.query(GroupEvent).filter(
        GroupEvent.gid == gid, 
        GroupEvent.sdatetime <= end_date + timedelta(days=1),
        GroupEvent.edatetime >= start_date
    ).all()
    db_num_member = db.query(Member).filter(Member.gid == gid).count()

    # Convert db_event objects to dictionaries
    event_list = []
    for event in db_event:
        event_dict = {
            "cname": event.cname,
            "cid": event.cid,
            "sdatetime": event.sdatetime.isoformat(),
            "visibility": event.visibility,
            "ccid": event.ccid,
            "gid": event.gid,
            "edatetime": event.edatetime.isoformat()
        }
        event_list.append(event_dict)

    if not db_event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group calendar doesn't exist")
    return calender_to_timetable(event_list, db_num_member, start_date)

async def get_votetime(gid: int, db: Session):
    db_group = db.query(Group).filter(Group.gid == gid).first()
    if not db_group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group doesn't exist")
    votetime_exist = db.query(GenerateVote).filter(GenerateVote.gid == gid)
    # if not votetime_exist.first():
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="votetime doesn't exist")
    return votetime_exist.all()


async def generate_votetime(vt: VoteTimeSchema, db: Session):
    # sdatetime = vt.sdatetime.isoformat()
    # edatetime = vt.edatetime.isoformat()
    db_group = db.query(Group).filter(Group.gid == vt.gid).first()
    if not db_group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group doesn't exist")
    
    # 기존 투표결과 존재 -> 제거
    voteresult_exist = db.query(VoteResult).filter(VoteResult.gid == vt.gid)
    if voteresult_exist.first():
        for i in voteresult_exist.all():
            db.delete(i)
            db.commit()
    # 기존 투표 존재 -> 제거
    votetime_exist = db.query(GenerateVote).filter(GenerateVote.gid == vt.gid)
    if votetime_exist.first():
        for i in votetime_exist.all():
            db.delete(i)
            db.commit()
    vote_exist = db.query(Vote).filter(Vote.gid == vt.gid)
    if vote_exist.first():
        for i in vote_exist.all():
            db.delete(i)
            db.commit()
    
    group_cal = await get_weekly_groupcal(vt.gid, vt.sdatetime, vt.edatetime, db)
    for x in create_vote(group_cal[0], vt.meetingtime):
        db_votetime = GenerateVote(gid = vt.gid, day = x[0], s_time = x[1], e_time = x[2], members = 0)
        db.add(db_votetime)
        db.commit()
        db.refresh(db_votetime)
    return {"msg": "votetime added successfully."}

async def vote_func(vid_list: VoteSchema, user: str, db: Session):
    if len(vid_list.vidlist)==0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Please vote time at least one!")
    db_exist = await get_all_vote(vid_list.gid, user, db)
    # 기존 투표 존재하는데 vid_list에서 제외됐으면 삭제 
    if db_exist:
        for x in db_exist:
            vid = x.vid
            if vid not in vid_list:
                db_delete = await vote_delete(vid, user, db)
    for vid in vid_list.vidlist:
        votetime_exist = db.query(GenerateVote).filter(GenerateVote.vid == vid).first()
        if not votetime_exist:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="votetime doesn't exist")
        # 이미 존재하는 투표인지 확인
        db_vote = db.query(Vote).filter(Vote.vid == vid, Vote.uid == user).first()
        # 기존에 투표되어있음
        if db_vote:
            continue
        # 새투표 등록
        else:
            db_register = await vote_register(vid, user, db)
    return {"msg": "user vote successfully."}

async def get_all_vote(gid: str, user: str, db: Session):
    db_group = db.query(Member).filter(Member.gid == gid, Member.uid == user).first()
    if not db_group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="not group member")
    db_vote = db.query(Vote).filter(Vote.gid == gid, Vote.uid == user).all()
    return db_vote

async def vote_register(vid: int, user: str, db: Session):
    votetime_exist = db.query(GenerateVote).filter(GenerateVote.vid == vid).first()
    if not votetime_exist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="votetime doesn't exist")
    vote_exist= db.query(Vote).filter(Vote.vid == vid, Vote.uid == user).first()
    if vote_exist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="vote already exist")
    db_votetime = db.query(GenerateVote).filter(GenerateVote.vid == vid).first()
    gid = db_votetime.gid
    db_member = db.query(Member).filter(Member.gid == gid, Member.uid == user).first()
    if not db_member:
        raise HTTPException(status_code=401, detail="user not group member")
    db_vote = Vote(vid=vid, gid=gid, uid=user)
    db_votetime.members+=1
    db.add(db_vote)
    db.commit()
    db.refresh(db_vote)
    return {"msg": "user vote successfully."}
    
    
async def vote_delete(vid: int, user: str, db: Session):
    db_vote = db.query(Vote).filter(Vote.vid == vid, Vote.uid == user).first()
    if not db_vote:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="vote doesn't exist")
    db_votetime = db.query(GenerateVote).filter(GenerateVote.vid == vid).first()
    db_votetime.members-=1
    db.delete(db_vote)
    db.commit()
    return {"msg": "user delete vote successfully."}

async def add_voteresult(gid: int, db: Session):
    db_group = db.query(Group).filter(Group.gid == gid).first()
    if not db_group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group doesn't exist")
    db_result = db.query(GenerateVote).filter(GenerateVote.gid == gid).all()
    max_members=0
    # find max vote members
    for x in db_result:
        if x.members > max_members:
            max_members = x.members
    if max_members==0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No one voted")
    db_max = db.query(GenerateVote).filter(GenerateVote.gid == gid, GenerateVote.members == max_members).all()
    for x in db_max:
        max1 = VoteResult(gid=gid, day=x.day, s_time=x.s_time, e_time=x.e_time, members=x.members)
        db.add(max1)
        db.commit()
        db.refresh(max1)
    
    max_members2=0
    for x in db_result:
        if x.members > max_members2 and x.members < max_members:
            max_members2 = x.members
    if max_members2!=0:
        db_max2 = db.query(GenerateVote).filter(GenerateVote.gid == gid, GenerateVote.members == max_members2).all()
        for x in db_max2:
            max2 = VoteResult(gid=gid, day=x.day, s_time=x.s_time, e_time=x.e_time, members=x.members)
            db.add(max2)
            db.commit()
            db.refresh(max2)
            
    # 기존 투표 존재 -> 제거
    votetime_exist = db.query(GenerateVote).filter(GenerateVote.gid == gid)
    if votetime_exist.first():
        for i in votetime_exist.all():
            db.delete(i)
            db.commit()
    vote_exist = db.query(Vote).filter(Vote.gid == gid)
    if vote_exist.first():
        for i in vote_exist.all():
            db.delete(i)
            db.commit()
    return {"msg": "generate vote result successfully."}

async def get_voteresult(gid: int, db: Session):
    db_voteresult = db.query(VoteResult).filter(VoteResult.gid == gid).all()
    if not db_voteresult:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="vote result doesn't exist")
    return db_voteresult

# get group info by gid
async def get_groupinfo(gid: int, db: Session):
    db_group = db.query(Group).filter(Group.gid == gid).first()
    if not db_group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group doesn't exist")
    return db_group


async def favorite_group_register(gid: int, user: str, db: Session):
    db_group = db.query(Group).filter(Group.gid == gid).first()
    if not db_group:
        raise HTTPException(status_code=401, detail="group doesn't exist")
    db_member = db.query(Member).filter(Member.gid == gid, Member.uid == user).first()
    if not db_member:
        raise HTTPException(status_code=401, detail="not group member")
    db_group = db.query(Group).filter(Group.gid == gid).first()
    db_favorite = Favorite(uid=user, gid=gid, gname=db_group.gname)
    db.add(db_favorite)
    db.commit()
    db.refresh(db_favorite)
    return {"msg": "favorite group added successfully."}

async def favorite_group_get(user: str, db: Session):
    db_favorite = db.query(Favorite).filter(Favorite.uid == user).all()
    if not db_favorite:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Favorite list doesn't exist")
    return db_favorite

async def favorite_group_delete(gid: int, user: str, db: Session):
    db_favorite = db.query(Favorite).filter(Favorite.gid == gid, Favorite.uid == user).first()
    if not db_favorite:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Favorite group doesn't exist")
    db.delete(db_favorite)
    db.commit()
    return {"msg": "favorite deleted successfully."}

async def get_friendcal(fid: str, user: str, db: Session):
    is_friend = db.query(Friend).filter(Friend.uid == user, Friend.fid == fid).first()
    if not is_friend:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Friend doesn't exist")
    return db.query(Event).filter(Event.uid == fid).all()

async def get_membercal(gid: int, fid: str, user: str, db: Session):
    is_member = db.query(Member).filter(Member.gid == gid, Member.uid == user).first()
    if is_member:
        also_member = db.query(Member).filter(Member.gid == gid, Member.uid == fid).first()
        if also_member:
            return db.query(Event).filter(Event.uid == fid).all()
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Member doesn't exist")
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group doesn't exist")
        
async def get_upcoming(gid: int, user: str, db: Session):
    is_member = db.query(Member).filter(Member.gid == gid, Member.uid == user).first()
    if not is_member:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group doesn't exist")
    
    now = datetime.now() + timedelta(hours=9)

    current = db.query(Meeting).filter(Meeting.sdatetime <= now, Meeting.edatetime > now).first()
    if current:
        return current
    else:
        upcoming_list = db.query(Meeting).filter(Meeting.sdatetime > now).all()
        if not upcoming_list:
            return 
        else:
            upcoming = upcoming_list[0]
            for meeting in upcoming_list:
                if meeting.sdatetime < upcoming.sdatetime:
                    upcoming = meeting
            return upcoming

async def remove_account(user: str, db: Session):
    db_user = db.query(User).filter(User.id == user).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User doesn't exist")

    is_admin = db.query(Group).filter(Group.admin == user).first()
    if is_admin:
        return {"msg": "Transfer Admin first!"}

    db_cal = db.query(Event).filter(Event.uid == user).all()
    for i in db_cal:
        db.delete(i)

    db_favorite = db.query(Favorite).filter(Favorite.uid == user).all()
    for i in db_favorite:
        db.delete(i)

    db_friendrequest = db.query(FriendRequest).filter(FriendRequest.fid == user).all()
    for i in db_friendrequest:
        db.delete(i)

    db_friend = db.query(Friend).filter(or_(Friend.uid == user, Friend.fid == user)).all()
    for i in db_friendrequest:
        db.delete(i)

    db_invite = db.query(Invited).filter(Invited.uid == user).all()
    for i in db_invite:
        db.delete(i)
    
    db_member = db.query(Member).filter(Member.uid == user).all()
    for i in db_member:
        db.delete(i)

    db_vote = db.query(Vote).filter(Vote.uid == user).all()
    for i in db_vote:
        db.delete(i)

    db.delete(db_user)
    db.commit()
    return {"msg": "account deleted!"}