from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.core.config import settings
from app.api import router as api_router

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="THENELLA Ministries API",
    description="Backend pour le site de l'artiste gospel THENELLA",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")


@app.get("/", tags=["Root"])
def root():
    return {"message": "THENELLA Ministries API — en ligne ✝️"}
