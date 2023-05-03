import time
from datetime import datetime
from fastapi import HTTPException, status
from jose import jwt, JWTError
from dotenv import load_dotenv
import os

load_dotenv()
env = os.environ

def create_access_token(user: str):
    payload = {
        "user": user,
        "expires": time.time() + 600
    }

    token = jwt.encode(payload, env["SECRET_KEY"], algorithm="HS256")
    return token

def verify_access_token(token: str):
    try:
        data = jwt.decode(token, env["SECRET_KEY"], algorithms=["HS256"])
        expire = data.get("expires")

        if expire is  None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No access token")
        if datetime.utcnow() > datetime.utcfromtimestamp(expire):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Token expired!")
        return data
    except JWTError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token")