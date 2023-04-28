from fastapi import FastAPI, HTTPException, Depends, status
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean, func
from sqlalchemy.orm import sessionmaker, scoped_session, Session
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel, BaseSettings
from auth.hash_password import HashPassword
from fastapi.security import OAuth2PasswordRequestForm
from auth.jwt_handler import create_access_token
from auth.authenticate import authenticate
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from datetime import datetime

# MariaDB 연결 정보
config = {
    'host': 'svc.sel3.cloudtype.app',
    'user': 'test',
    'password': '1234',
    'database': 'test',
    'port': 30350
}

engine = create_engine(f"mysql+pymysql://{config['user']}:{config['password']}@{config['host']}:{config['port']}/{config['database']}")
session_factory = sessionmaker(bind=engine)
session = scoped_session(session_factory)

Base = declarative_base()

hash_password = HashPassword()

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

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    try:
        db = session()
        yield db
    finally:
        db.close()

@app.get("/")
async def get_home():
    return {"hello": "hi"}

# @app.get("/{id}")
# async def load_user(id: str, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.id == id).first()
#     if not user:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No user")
#     return {"pw": user.pw}

@app.get("/login")
async def login(user: str = Depends(authenticate)):
    return {"success": True}
    # return user

@app.post("/signin", response_model=TokenResponse)
async def signin_user(user: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
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


@app.post("/signup")
async def signup_user(user: UserSchema, db: Session = Depends(get_db)):
    user_exist = db.query(User).filter(User.id == user.id).first()
    if user_exist:
        raise HTTPException(status_code=401, detail="Existed user")
    user.pw = hash_password.create_hash(user.pw)
    db_user = User(id=user.id, pw=user.pw, name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"msg": "User created successfully."}

@app.get("/event")    
async def get_event(user: str = Depends(authenticate), db: Session = Depends(get_db)):
    # return db.query(Event).filter(Event.uid == user, func.date(Event.sdatetime) == "2023-04-04").all()
    return db.query(Event).filter(Event.uid == user).all()

@app.post("/event")
# 일정이 이미 존재하는 경우 고려하는 기능 추가 필요
async def add_event(event: EventSchema, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    db_event = Event(uid=user, cname=event.cname, visibility=event.visibility, sdatetime=event.sdatetime, edatetime=event.edatetime)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return {"msg": "event added successfully."}

@app.delete("/event")    
async def del_event(cid: int, user: str = Depends(authenticate), db: Session = Depends(get_db)):
    db_event = db.query(Event).filter(Event.uid == user, Event.cid == cid).first()
    if not db_event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event doesn't exist")
    db.delete(db_event)
    db.commit()
    return {"msg": "event deleted successfully."}