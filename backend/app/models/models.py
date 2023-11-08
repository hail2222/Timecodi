from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Date

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(String(255), primary_key=True)
    pw = Column(String(512))
    name = Column(String(255))

class Event(Base):
    __tablename__ = "calendars"

    cid = Column(Integer, primary_key=True)
    uid = Column(String(255))
    cname = Column(String(255))
    visibility = Column(String(255))
    sdatetime = Column(DateTime)
    edatetime = Column(DateTime)
    weekly = Column(String(255))
    enddate = Column(Date)

class Friend(Base):
    __tablename__ = "friends"

    uid = Column(String(255), primary_key=True)
    fid = Column(String(255), primary_key=True)

class FriendRequest(Base):
    __tablename__ = "friend requests"

    uid = Column(String(255), primary_key=True)
    fid = Column(String(255), primary_key=True)

class Group(Base):
    __tablename__ = "groups"

    gid = Column(Integer, primary_key=True)
    gname = Column(String(255))
    admin = Column(String(255))
    
class Invited(Base):
    __tablename__ = "invited"
    
    iid = Column(Integer, primary_key=True)
    gid = Column(Integer)
    uid = Column(String(255))
    
class Meeting(Base):
    __tablename__ = "meeting"

    meetid = Column(Integer, primary_key=True)
    gid = Column(Integer)
    title = Column(String(255))
    sdatetime = Column(DateTime)
    edatetime = Column(DateTime)
    location = Column(String(255))
    loc_detail = Column(String(255))
    memo = Column(String(255))

class Member(Base):
    __tablename__ = "members"

    mid = Column(Integer, primary_key=True)
    gid = Column(Integer)
    uid = Column(String(255))

class GroupEvent(Base):
    __tablename__ = "group calendars"

    cid = Column(Integer, primary_key=True)
    ccid = Column(Integer)
    gid = Column(Integer)
    cname = Column(String(255))
    visibility = Column(String(255))
    sdatetime = Column(DateTime)
    edatetime = Column(DateTime)
    
    
class Favorite(Base):
    __tablename__ = "favorites"

    fgid = Column(Integer, primary_key=True)
    uid = Column(String(255))
    gid = Column(Integer)
    gname = Column(String(255))
    
class GenerateVote(Base):
    __tablename__ = "generate votes"

    vid = Column(Integer, primary_key=True)
    gid = Column(Integer)
    day = Column(String(255))
    s_time = Column(String(255))
    e_time = Column(String(255))
    members = Column(Integer)

class VoteResult(Base):
    __tablename__ = "vote results"
    
    rid = Column(Integer, primary_key=True)
    gid = Column(Integer)
    day = Column(String(255))
    s_time = Column(String(255))
    e_time = Column(String(255))
    members = Column(Integer)

class Vote(Base):
    __tablename__ = "votes"
    
    vvid = Column(Integer, primary_key=True)
    vid = Column(Integer)
    gid = Column(Integer)
    uid = Column(String(255))