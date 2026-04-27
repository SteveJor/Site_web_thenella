from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


# ─── Auth ────────────────────────────────────────────────────────────────────

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str

class AdminUserOut(BaseModel):
    id: int
    username: str
    email: str
    is_active: bool
    created_at: datetime
    class Config:
        from_attributes = True


# ─── Biography ───────────────────────────────────────────────────────────────

class BiographyUpdate(BaseModel):
    name: Optional[str] = None
    subtitle_en: Optional[str] = None
    subtitle_fr: Optional[str] = None
    bio_text1_en: Optional[str] = None
    bio_text1_fr: Optional[str] = None
    bio_text2_en: Optional[str] = None
    bio_text2_fr: Optional[str] = None
    bio_text3_en: Optional[str] = None
    bio_text3_fr: Optional[str] = None
    image_url: Optional[str] = None

class BiographyOut(BaseModel):
    id: int
    name: str
    subtitle_en: Optional[str]
    subtitle_fr: Optional[str]
    bio_text1_en: Optional[str]
    bio_text1_fr: Optional[str]
    bio_text2_en: Optional[str]
    bio_text2_fr: Optional[str]
    bio_text3_en: Optional[str]
    bio_text3_fr: Optional[str]
    image_url: Optional[str]
    updated_at: Optional[datetime]
    class Config:
        from_attributes = True


# ─── Achievement ─────────────────────────────────────────────────────────────

class AchievementCreate(BaseModel):
    icon: str = "fas fa-trophy"
    title_en: str
    title_fr: Optional[str] = None
    description_en: Optional[str] = None
    description_fr: Optional[str] = None
    order: int = 0

class AchievementUpdate(BaseModel):
    icon: Optional[str] = None
    title_en: Optional[str] = None
    title_fr: Optional[str] = None
    description_en: Optional[str] = None
    description_fr: Optional[str] = None
    order: Optional[int] = None

class AchievementOut(BaseModel):
    id: int
    icon: str
    title_en: str
    title_fr: Optional[str]
    description_en: Optional[str]
    description_fr: Optional[str]
    order: int
    created_at: datetime
    class Config:
        from_attributes = True


# ─── Music ───────────────────────────────────────────────────────────────────

class MusicCreate(BaseModel):
    title: str
    year: Optional[int] = None
    description_en: Optional[str] = None
    description_fr: Optional[str] = None
    cover_url: Optional[str] = ""
    listen_url: Optional[str] = ""
    order: int = 0

class MusicUpdate(BaseModel):
    title: Optional[str] = None
    year: Optional[int] = None
    description_en: Optional[str] = None
    description_fr: Optional[str] = None
    cover_url: Optional[str] = None
    listen_url: Optional[str] = None
    order: Optional[int] = None

class MusicOut(BaseModel):
    id: int
    title: str
    year: Optional[int]
    description_en: Optional[str]
    description_fr: Optional[str]
    cover_url: Optional[str]
    listen_url: Optional[str]
    order: int
    created_at: datetime
    class Config:
        from_attributes = True


# ─── Gallery ─────────────────────────────────────────────────────────────────

class GalleryCreate(BaseModel):
    image_url: str
    caption_en: Optional[str] = ""
    caption_fr: Optional[str] = ""
    order: int = 0

class GalleryUpdate(BaseModel):
    image_url: Optional[str] = None
    caption_en: Optional[str] = None
    caption_fr: Optional[str] = None
    order: Optional[int] = None

class GalleryOut(BaseModel):
    id: int
    image_url: str
    caption_en: Optional[str]
    caption_fr: Optional[str]
    order: int
    created_at: datetime
    class Config:
        from_attributes = True


# ─── YouTube ─────────────────────────────────────────────────────────────────

class YoutubeVideoCreate(BaseModel):
    video_id: str
    title: Optional[str] = ""
    description: Optional[str] = ""
    is_featured: bool = False
    order: int = 0

class YoutubeVideoUpdate(BaseModel):
    video_id: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    is_featured: Optional[bool] = None
    order: Optional[int] = None

class YoutubeVideoOut(BaseModel):
    id: int
    video_id: str
    title: Optional[str]
    description: Optional[str]
    is_featured: bool
    order: int
    created_at: datetime
    class Config:
        from_attributes = True

class YoutubeChannelUpdate(BaseModel):
    channel_url: Optional[str] = None
    channel_name: Optional[str] = None
    channel_description_en: Optional[str] = None
    channel_description_fr: Optional[str] = None

class YoutubeChannelOut(BaseModel):
    id: int
    channel_url: str
    channel_name: str
    channel_description_en: Optional[str]
    channel_description_fr: Optional[str]
    class Config:
        from_attributes = True


# ─── Social Media ────────────────────────────────────────────────────────────

class SocialMediaLinkCreate(BaseModel):
    label_en: str
    label_fr: Optional[str] = ""
    url: str
    icon: str = "fas fa-link"

class SocialMediaLinkOut(BaseModel):
    id: int
    label_en: Optional[str]
    label_fr: Optional[str]
    url: Optional[str]
    icon: Optional[str]
    class Config:
        from_attributes = True

class SocialMediaCreate(BaseModel):
    platform: str
    description_en: Optional[str] = ""
    description_fr: Optional[str] = ""
    links: List[SocialMediaLinkCreate] = []

class SocialMediaUpdate(BaseModel):
    description_en: Optional[str] = None
    description_fr: Optional[str] = None
    links: Optional[List[SocialMediaLinkCreate]] = None

class SocialMediaOut(BaseModel):
    id: int
    platform: str
    description_en: Optional[str]
    description_fr: Optional[str]
    links: List[SocialMediaLinkOut] = []
    class Config:
        from_attributes = True


# ─── Contact ─────────────────────────────────────────────────────────────────

class ContactCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = ""
    event_type: Optional[str] = ""
    message: Optional[str] = ""

class ContactOut(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str]
    event_type: Optional[str]
    message: Optional[str]
    created_at: datetime
    is_read: bool
    class Config:
        from_attributes = True
