from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from sqlalchemy import func, or_, and_
import datetime

from ..auth.jwt_handler import create_access_token
from ..models.models import User, Event, Friend, Group, Member, GroupEvent
from ..auth.hash_password import HashPassword
from ..schemas.schemas import UserSchema, EventSchema
from ..googlecal.cal_func import get_event

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
            "token_type": "Bearer"
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

async def get_all_events(date: datetime.date, user: str, db: Session):
    return db.query(Event).filter(Event.uid == user, func.date(Event.sdatetime) <= date, date <= func.date(Event.edatetime)).all()

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
    else:
        db_event = Event(uid=user, cname=event.cname, visibility=event.visibility, sdatetime=event.sdatetime, edatetime=event.edatetime)
        db.add(db_event)
        db.commit()
        db.refresh(db_event)
        return {"msg": "event added successfully."}

async def event_remove(cid: int, user: str, db: Session):
    db_event = db.query(Event).filter(Event.uid == user, Event.cid == cid).first()
    if not db_event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event doesn't exist")
    db.delete(db_event)
    db.commit()
    return {"msg": "event deleted successfully."}

async def get_all_friends(user: str, db: Session):
    return db.query(Friend).filter(Friend.uid == user).all()

async def friend_register(fid: str, user: str, db: Session):
    friend_user_exist = db.query(User).filter(User.id == fid).first()
    if not friend_user_exist:
        raise HTTPException(status_code=404, detail="There is no user")
    already_friend = db.query(Friend).filter(Friend.uid == user, Friend.fid == fid).first()
    if already_friend:
        raise HTTPException(status_code=401, detail="already friend")
    db_friendship_1 = Friend(uid=user, fid=fid)
    db_friendship_2 = Friend(uid=fid, fid=user)
    db.add(db_friendship_1)
    db.add(db_friendship_2)
    db.commit()
    db.refresh(db_friendship_1)
    db.refresh(db_friendship_2)
    return {"msg": "friend added successfully."}

async def group_register(gname: str, user: str, db: Session):
    db_group = Group(gname=gname)
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    register_success = await member_register(db_group.gid, user, user, db)
    return {"msg": "group added successfully."}

async def member_register(gid: int, member: str, user: str, db: Session):
    db_member = Member(gid=gid, uid=member)
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return {"msg": "member added successfully."}

async def google_event_register(user: str, db: Session):
    google=get_event()
    # print(google)
    for event in google:
        sdt=event[0]
        edt=event[1]
        cn=event[2]
        vsb=event[3]
        if vsb=="default" or vsb=="public":
            vsb=True
        else:
            vsb=False
        
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
            db_event = Event(uid=user, cname=cn, visibility=vsb, sdatetime=sdt, edatetime=edt)
            db.add(db_event)
            db.commit()
            db.refresh(db_event)
    return {"msg": "google calendar events added successfully."}