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
    visibility = Column(Boolean)
    sdatetime = Column(DateTime)
    edatetime = Column(DateTime)
    weekly = Column(Integer)
    enddate = Column(Date)

class Friend(Base):
    __tablename__ = "friends"

    uid = Column(String, primary_key=True)
    fid = Column(String, primary_key=True)

class Group(Base):
    __tablename__ = "groups"

    gid = Column(Integer, primary_key=True)
    gname = Column(String)
    
class Meeting(Base):
    __tablename__ = "meeting"

    meetid = Column(Integer, primary_key=True)
    gid = Column(Integer)
    title = Column(String)
    sdatetime = Column(DateTime)
    edatetime = Column(DateTime)
    location = Column(String)
    memo = Column(String)

class Member(Base):
    __tablename__ = "members"

    mid = Column(Integer, primary_key=True)
    gid = Column(Integer)
    uid = Column(String)

class GroupEvent(Base):
    __tablename__ = "group calendars"

    cid = Column(Integer, primary_key=True)
    gid = Column(Integer)
    cname = Column(String)
    visibility = Column(Boolean)
    sdatetime = Column(DateTime)
    edatetime = Column(DateTime)