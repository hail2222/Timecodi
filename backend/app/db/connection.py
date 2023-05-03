from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from fastapi.security import OAuth2PasswordRequestForm
from dotenv import load_dotenv
import os

load_dotenv()
env = os.environ

# MariaDB 연결 정보
config = {
    'host': env["host"],
    'user': env["user"],
    'password': env["password"],
    'database': env["database"],
    'port': env["port"]
}

engine = create_engine(f"mysql+pymysql://{config['user']}:{config['password']}@{config['host']}:{config['port']}/{config['database']}")
session_factory = sessionmaker(bind=engine)
session = scoped_session(session_factory)

def get_db():
    try:
        db = session()
        yield db
    finally:
        db.close()