from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base


class AdminUser(Base):
    __tablename__ = "admin_users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Biography(Base):
    __tablename__ = "biography"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, default="Bonog Thérèse Ornella")
    subtitle_en = Column(String(300), default="Cameroonian Gospel Artist · Evangelist · Worship Leader")
    subtitle_fr = Column(String(300), default="Artiste Gospel Camerounaise · Évangéliste · Leader de Louange")
    bio_text1_en = Column(Text)
    bio_text1_fr = Column(Text)
    bio_text2_en = Column(Text)
    bio_text2_fr = Column(Text)
    bio_text3_en = Column(Text)
    bio_text3_fr = Column(Text)
    image_url = Column(String(500), default="")
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Achievement(Base):
    __tablename__ = "achievements"
    id = Column(Integer, primary_key=True, index=True)
    icon = Column(String(100), default="fas fa-trophy")
    title_en = Column(String(200), nullable=False)
    title_fr = Column(String(200))
    description_en = Column(Text)
    description_fr = Column(Text)
    order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)


class Music(Base):
    __tablename__ = "music"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    year = Column(Integer)
    description_en = Column(Text)
    description_fr = Column(Text)
    cover_url = Column(String(500), default="")
    listen_url = Column(String(500), default="")
    order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)


class GalleryImage(Base):
    __tablename__ = "gallery_images"
    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String(500), nullable=False)
    caption_en = Column(String(200), default="")
    caption_fr = Column(String(200), default="")
    order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)


class YoutubeVideo(Base):
    __tablename__ = "youtube_videos"
    id = Column(Integer, primary_key=True, index=True)
    video_id = Column(String(20), nullable=False, unique=True)
    title = Column(String(200), default="")
    description = Column(Text, default="")
    is_featured = Column(Boolean, default=False)
    order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)


class YoutubeChannel(Base):
    __tablename__ = "youtube_channel"
    id = Column(Integer, primary_key=True)
    channel_url = Column(String(300), default="https://www.youtube.com/@ThenellaOfficiel")
    channel_name = Column(String(100), default="Thenella Officiel")
    channel_description_en = Column(Text, default="Subscribe to Thenella's official YouTube channel for worship videos and ministry content.")
    channel_description_fr = Column(Text, default="Abonnez-vous à la chaîne YouTube officielle de Thenella pour des vidéos de louange et du contenu ministériel.")


class SocialMedia(Base):
    __tablename__ = "social_media"
    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String(50), nullable=False)  # youtube | tiktok | facebook | instagram
    description_en = Column(Text, default="")
    description_fr = Column(Text, default="")
    links = relationship("SocialMediaLink", back_populates="social_media", cascade="all, delete-orphan")


class SocialMediaLink(Base):
    __tablename__ = "social_media_links"
    id = Column(Integer, primary_key=True, index=True)
    social_media_id = Column(Integer, ForeignKey("social_media.id"))
    label_en = Column(String(100), default="")
    label_fr = Column(String(100), default="")
    url = Column(String(500), default="")
    icon = Column(String(100), default="fas fa-link")
    social_media = relationship("SocialMedia", back_populates="links")


class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    phone = Column(String(50), default="")
    event_type = Column(String(50), default="")
    message = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)
    is_read = Column(Boolean, default=False)
