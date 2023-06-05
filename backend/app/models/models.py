from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Date

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(String, primary_key=True)
    pw = Column(String)
    name = Column(String)

class Event(Base):
    __tablename__ = "calendars"

    cid = Column(Integer, primary_key=True)
    uid = Column(String)
    cname = Column(String)
    visibility = Column(String)
    sdatetime = Column(DateTime)
    edatetime = Column(DateTime)
    weekly = Column(Integer)
    enddate = Column(Date)

class Friend(Base):
    __tablename__ = "friends"

    uid = Column(String, primary_key=True)
    fid = Column(String, primary_key=True)

class FriendRequest(Base):
    __tablename__ = "friend requests"

    uid = Column(String, primary_key=True)
    fid = Column(String, primary_key=True)

class Group(Base):
    __tablename__ = "groups"

    gid = Column(Integer, primary_key=True)
    gname = Column(String)
    admin = Column(String)
    
class Invited(Base):
    __tablename__ = "invited"
    
    iid = Column(Integer, primary_key=True)
    gid = Column(Integer)
    uid = Column(String)
    
class Meeting(Base):
    __tablename__ = "meeting"

    meetid = Column(Integer, primary_key=True)
    gid = Column(Integer)
    title = Column(String)
    sdatetime = Column(DateTime)
    edatetime = Column(DateTime)
    location = Column(String)
    loc_detail = Column(String)
    memo = Column(String)

class Member(Base):
    __tablename__ = "members"

    mid = Column(Integer, primary_key=True)
    gid = Column(Integer)
    uid = Column(String)

class GroupEvent(Base):
    __tablename__ = "group calendars"

    cid = Column(Integer, primary_key=True)
    ccid = Column(Integer)
    gid = Column(Integer)
    cname = Column(String)
    visibility = Column(String)
    sdatetime = Column(DateTime)
    edatetime = Column(DateTime)
    
    
class Favorite(Base):
    __tablename__ = "favorites"

    fgid = Column(Integer, primary_key=True)
    uid = Column(String)
    gid = Column(Integer)
    gname = Column(String)
    
class GenerateVote(Base):
    __tablename__ = "generate votes"

    vid = Column(Integer, primary_key=True)
    gid = Column(Integer)
    day = Column(String)
    s_time = Column(String)
    e_time = Column(String)
    members = Column(Integer)

class Vote(Base):
    __tablename__ = "votes"
    
    vvid = Column(Integer, primary_key=True)
    vid = Column(Integer)
    gid = Column(Integer)
    uid = Column(String)