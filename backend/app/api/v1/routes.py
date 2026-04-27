from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.core.security import (
    verify_password, create_access_token, get_current_admin, hash_password
)
from app.models.models import (
    AdminUser, Biography, Achievement, Music, GalleryImage,
    YoutubeVideo, YoutubeChannel, SocialMedia, SocialMediaLink, ContactMessage
)
from app.schemas.schemas import (
    LoginRequest, TokenResponse, AdminUserOut,
    BiographyUpdate, BiographyOut,
    AchievementCreate, AchievementUpdate, AchievementOut,
    MusicCreate, MusicUpdate, MusicOut,
    GalleryCreate, GalleryUpdate, GalleryOut,
    YoutubeVideoCreate, YoutubeVideoUpdate, YoutubeVideoOut,
    YoutubeChannelUpdate, YoutubeChannelOut,
    SocialMediaCreate, SocialMediaUpdate, SocialMediaOut,
    ContactCreate, ContactOut,
)

router = APIRouter()


# ═══════════════════════════════════════════════════════════════════════════════
# AUTH
# ═══════════════════════════════════════════════════════════════════════════════

@router.post("/auth/login", response_model=TokenResponse, tags=["Auth"])
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(AdminUser).filter(
        (AdminUser.username == payload.username) | (AdminUser.email == payload.username)
    ).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Identifiants incorrects")
    token = create_access_token({"sub": str(user.id)})
    return TokenResponse(access_token=token, username=user.username)


@router.get("/auth/me", response_model=AdminUserOut, tags=["Auth"])
def get_me(current=Depends(get_current_admin)):
    return current


# ═══════════════════════════════════════════════════════════════════════════════
# BIOGRAPHY  (public GET, admin PUT)
# ═══════════════════════════════════════════════════════════════════════════════

@router.get("/biography", response_model=BiographyOut, tags=["Biography"])
def get_biography(db: Session = Depends(get_db)):
    bio = db.query(Biography).first()
    if not bio:
        raise HTTPException(status_code=404, detail="Biographie non trouvée")
    return bio


@router.put("/biography", response_model=BiographyOut, tags=["Biography"])
def update_biography(
    payload: BiographyUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    bio = db.query(Biography).first()
    if not bio:
        bio = Biography()
        db.add(bio)
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(bio, field, value)
    db.commit()
    db.refresh(bio)
    return bio


# ═══════════════════════════════════════════════════════════════════════════════
# ACHIEVEMENTS
# ═══════════════════════════════════════════════════════════════════════════════

@router.get("/achievements", response_model=List[AchievementOut], tags=["Achievements"])
def get_achievements(db: Session = Depends(get_db)):
    return db.query(Achievement).order_by(Achievement.order).all()


@router.post("/achievements", response_model=AchievementOut, tags=["Achievements"])
def create_achievement(
    payload: AchievementCreate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    obj = Achievement(**payload.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.put("/achievements/{id}", response_model=AchievementOut, tags=["Achievements"])
def update_achievement(
    id: int,
    payload: AchievementUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    obj = db.query(Achievement).filter(Achievement.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Non trouvé")
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/achievements/{id}", tags=["Achievements"])
def delete_achievement(
    id: int,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    obj = db.query(Achievement).filter(Achievement.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Non trouvé")
    db.delete(obj)
    db.commit()
    return {"ok": True}


# ═══════════════════════════════════════════════════════════════════════════════
# MUSIC
# ═══════════════════════════════════════════════════════════════════════════════

@router.get("/music", response_model=List[MusicOut], tags=["Music"])
def get_music(db: Session = Depends(get_db)):
    return db.query(Music).order_by(Music.order).all()


@router.post("/music", response_model=MusicOut, tags=["Music"])
def create_music(
    payload: MusicCreate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    obj = Music(**payload.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.put("/music/{id}", response_model=MusicOut, tags=["Music"])
def update_music(
    id: int,
    payload: MusicUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    obj = db.query(Music).filter(Music.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Non trouvé")
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/music/{id}", tags=["Music"])
def delete_music(
    id: int,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    obj = db.query(Music).filter(Music.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Non trouvé")
    db.delete(obj)
    db.commit()
    return {"ok": True}


# ═══════════════════════════════════════════════════════════════════════════════
# GALLERY
# ═══════════════════════════════════════════════════════════════════════════════

@router.get("/gallery", response_model=List[GalleryOut], tags=["Gallery"])
def get_gallery(db: Session = Depends(get_db)):
    return db.query(GalleryImage).order_by(GalleryImage.order).all()


@router.post("/gallery", response_model=GalleryOut, tags=["Gallery"])
def create_gallery(
    payload: GalleryCreate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    obj = GalleryImage(**payload.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.put("/gallery/{id}", response_model=GalleryOut, tags=["Gallery"])
def update_gallery(
    id: int,
    payload: GalleryUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    obj = db.query(GalleryImage).filter(GalleryImage.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Non trouvé")
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/gallery/{id}", tags=["Gallery"])
def delete_gallery(
    id: int,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    obj = db.query(GalleryImage).filter(GalleryImage.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Non trouvé")
    db.delete(obj)
    db.commit()
    return {"ok": True}


# ═══════════════════════════════════════════════════════════════════════════════
# YOUTUBE VIDEOS
# ═══════════════════════════════════════════════════════════════════════════════

@router.get("/youtube/videos", response_model=List[YoutubeVideoOut], tags=["YouTube"])
def get_youtube_videos(db: Session = Depends(get_db)):
    return db.query(YoutubeVideo).order_by(YoutubeVideo.order).all()


@router.post("/youtube/videos", response_model=YoutubeVideoOut, tags=["YouTube"])
def create_youtube_video(
    payload: YoutubeVideoCreate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    # If set as featured, unset others
    if payload.is_featured:
        db.query(YoutubeVideo).update({"is_featured": False})
    obj = YoutubeVideo(**payload.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.put("/youtube/videos/{id}", response_model=YoutubeVideoOut, tags=["YouTube"])
def update_youtube_video(
    id: int,
    payload: YoutubeVideoUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    obj = db.query(YoutubeVideo).filter(YoutubeVideo.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Non trouvé")
    if payload.is_featured:
        db.query(YoutubeVideo).filter(YoutubeVideo.id != id).update({"is_featured": False})
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/youtube/videos/{id}", tags=["YouTube"])
def delete_youtube_video(
    id: int,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    obj = db.query(YoutubeVideo).filter(YoutubeVideo.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Non trouvé")
    db.delete(obj)
    db.commit()
    return {"ok": True}


@router.get("/youtube/channel", response_model=YoutubeChannelOut, tags=["YouTube"])
def get_youtube_channel(db: Session = Depends(get_db)):
    ch = db.query(YoutubeChannel).first()
    if not ch:
        raise HTTPException(status_code=404, detail="Chaîne non configurée")
    return ch


@router.put("/youtube/channel", response_model=YoutubeChannelOut, tags=["YouTube"])
def update_youtube_channel(
    payload: YoutubeChannelUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    ch = db.query(YoutubeChannel).first()
    if not ch:
        ch = YoutubeChannel()
        db.add(ch)
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(ch, field, value)
    db.commit()
    db.refresh(ch)
    return ch


# ═══════════════════════════════════════════════════════════════════════════════
# SOCIAL MEDIA
# ═══════════════════════════════════════════════════════════════════════════════

@router.get("/social-media", response_model=List[SocialMediaOut], tags=["Social Media"])
def get_social_media(db: Session = Depends(get_db)):
    return db.query(SocialMedia).all()


@router.post("/social-media", response_model=SocialMediaOut, tags=["Social Media"])
def create_social_media(
    payload: SocialMediaCreate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    links_data = payload.model_dump().pop("links", [])
    obj = SocialMedia(
        platform=payload.platform,
        description_en=payload.description_en,
        description_fr=payload.description_fr,
    )
    db.add(obj)
    db.flush()
    for link in links_data:
        db.add(SocialMediaLink(social_media_id=obj.id, **link))
    db.commit()
    db.refresh(obj)
    return obj


@router.put("/social-media/{id}", response_model=SocialMediaOut, tags=["Social Media"])
def update_social_media(
    id: int,
    payload: SocialMediaUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    obj = db.query(SocialMedia).filter(SocialMedia.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Non trouvé")
    if payload.description_en is not None:
        obj.description_en = payload.description_en
    if payload.description_fr is not None:
        obj.description_fr = payload.description_fr
    if payload.links is not None:
        # Replace links
        db.query(SocialMediaLink).filter(SocialMediaLink.social_media_id == id).delete()
        for link in payload.links:
            db.add(SocialMediaLink(social_media_id=id, **link.model_dump()))
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/social-media/{id}", tags=["Social Media"])
def delete_social_media(
    id: int,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    obj = db.query(SocialMedia).filter(SocialMedia.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Non trouvé")
    db.delete(obj)
    db.commit()
    return {"ok": True}


# ═══════════════════════════════════════════════════════════════════════════════
# CONTACT MESSAGES
# ═══════════════════════════════════════════════════════════════════════════════

@router.post("/contact", response_model=ContactOut, tags=["Contact"], status_code=201)
def create_contact(payload: ContactCreate, db: Session = Depends(get_db)):
    obj = ContactMessage(**payload.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.get("/contact", response_model=List[ContactOut], tags=["Contact"])
def get_contacts(
    is_read: Optional[bool] = None,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    q = db.query(ContactMessage)
    if is_read is not None:
        q = q.filter(ContactMessage.is_read == is_read)
    return q.order_by(ContactMessage.created_at.desc()).all()


@router.patch("/contact/{id}/read", response_model=ContactOut, tags=["Contact"])
def mark_contact_read(
    id: int,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    obj = db.query(ContactMessage).filter(ContactMessage.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Non trouvé")
    obj.is_read = True
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/contact/{id}", tags=["Contact"])
def delete_contact(
    id: int,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    obj = db.query(ContactMessage).filter(ContactMessage.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Non trouvé")
    db.delete(obj)
    db.commit()
    return {"ok": True}
