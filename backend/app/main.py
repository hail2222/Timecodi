from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers.routers import router
from .models.models import Base
from .db.connection import engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["https://time-codi.netlify.app"]
# "https://timecodi.netlify.app"

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
async def get_home():
    return {"hello": "hi"}