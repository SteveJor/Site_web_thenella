"""
seed.py — Popule la base de données avec les données initiales de THENELLA.
Exécuter : python seed.py
"""
from app.core.database import SessionLocal, engine, Base
from app.core.security import hash_password
from app.models.models import (
    AdminUser, Biography, Achievement, Music, GalleryImage,
    YoutubeVideo, YoutubeChannel, SocialMedia, SocialMediaLink, ContactMessage
)

Base.metadata.create_all(bind=engine)
db = SessionLocal()


def seed():
    # ── Admin user ──────────────────────────────────────────────────────────
    if not db.query(AdminUser).first():
        db.add(AdminUser(
            username="thenella_admin",
            email="admin@thenellaministries.com",
            hashed_password=hash_password("Thenella2024!"),
            is_active=True,
        ))
        print("✅  Admin créé  (user: thenella_admin / pass: Thenella2024!)")

    # ── Biography ───────────────────────────────────────────────────────────
    if not db.query(Biography).first():
        db.add(Biography(
            name="Bonog Thérèse Ornella",
            subtitle_en="Cameroonian Gospel Artist · Evangelist · Worship Leader",
            subtitle_fr="Artiste Gospel Camerounaise · Évangéliste · Leader de Louange",
            bio_text1_en=(
                "Thenella, born Bonog Thérèse Ornella, is a Cameroonian gospel singer, "
                "songwriter, worship leader, and evangelist. Her spiritual journey began "
                "in a Christian family where her father's miraculous healing experience "
                "profoundly shaped her faith."
            ),
            bio_text1_fr=(
                "Thenella, née Bonog Thérèse Ornella, est une chanteuse de gospel, "
                "auteure-compositrice, leader de louange et évangéliste camerounaise. "
                "Son parcours spirituel a commencé dans une famille chrétienne où "
                "l'expérience de guérison miraculeuse de son père a profondément façonné sa foi."
            ),
            bio_text2_en=(
                "For years, she served as lead vocalist and choir director at various churches, "
                "working with gospel groups like No Greater Love Family and Divine Harmonie. "
                "In September 2017, she was ordained as an evangelist, expanding her ministry "
                "beyond music to include preaching and outreach to vulnerable communities across Africa."
            ),
            bio_text2_fr=(
                "Pendant des années, elle a servi comme vocaliste principale et directrice de chœur "
                "dans diverses églises, travaillant avec des groupes gospel comme No Greater Love "
                "Family et Divine Harmonie. En septembre 2017, elle a été ordonnée évangéliste, "
                "élargissant son ministère au-delà de la musique."
            ),
            bio_text3_en=(
                "Married to Dr. Philippe Totto Ndong, Thenella continues to minister through her "
                "music and gospel outreach from Douala, Cameroon, touching hearts with worship "
                "that bridges earthly experiences and divine encounters."
            ),
            bio_text3_fr=(
                "Mariée au Dr. Philippe Totto Ndong, Thenella continue à exercer son ministère "
                "depuis Douala, Cameroun, touchant les cœurs avec une louange qui relie les "
                "expériences terrestres aux rencontres divines."
            ),
            image_url="https://i.imgur.com/placeholder-thenella.jpg",
        ))
        print("✅  Biographie créée")

    # ── Achievements ────────────────────────────────────────────────────────
    if not db.query(Achievement).first():
        achievements = [
            Achievement(icon="fas fa-trophy", order=1,
                title_en="Revelation of the Year", title_fr="Révélation de l'Année",
                description_en="Zamba Awards after the release of 'Cœur Nouveau' album",
                description_fr="Zamba Awards après la sortie de l'album 'Cœur Nouveau'"),
            Achievement(icon="fas fa-music", order=2,
                title_en="Breakthrough Album", title_fr="Album Révélation",
                description_en="'Cœur Nouveau' (2019) with 10 inspirational tracks",
                description_fr="'Cœur Nouveau' (2019) avec 10 titres inspirants"),
            Achievement(icon="fas fa-hands-praying", order=3,
                title_en="Ordained Evangelist", title_fr="Évangéliste Ordonnée",
                description_en="Officially ordained in September 2017 for ministry work",
                description_fr="Ordonnée officiellement en septembre 2017"),
            Achievement(icon="fas fa-record-vinyl", order=4,
                title_en="Multiple Albums", title_fr="Plusieurs Albums",
                description_en="Released several successful albums and singles since 2017",
                description_fr="Plusieurs albums et singles à succès depuis 2017"),
        ]
        db.add_all(achievements)
        print("✅  Réalisations créées")

    # ── Music ────────────────────────────────────────────────────────────────
    if not db.query(Music).first():
        music_list = [
            Music(title="Cœur Nouveau", year=2019, order=1,
                description_en="Breakthrough album with 10 tracks of spiritual transformation",
                description_fr="Album révélation avec 10 titres de transformation spirituelle",
                cover_url="https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/placeholder.jpg",
                listen_url="https://music.apple.com/us/album/c%C5%93ur-nouveau/1454733587"),
            Music(title="Une Autre Dimension", year=2024, order=2,
                description_en="Latest album capturing praise, worship, and testimony themes",
                description_fr="Dernier album capturant des thèmes de louange et d'adoration",
                cover_url="https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/placeholder2.jpg",
                listen_url="https://music.apple.com/sn/album/une-autre-dimension/1786566551"),
            Music(title="Je te bénirai (Live)", year=2024, order=3,
                description_en="Live single reflecting grateful worship and praise",
                description_fr="Single en direct reflétant une adoration reconnaissante",
                cover_url="https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/placeholder3.jpg",
                listen_url="https://music.apple.com/gb/album/je-te-b%C3%A9nirai-live-single/1755108856"),
        ]
        db.add_all(music_list)
        print("✅  Musiques créées")

    # ── Gallery ──────────────────────────────────────────────────────────────
    if not db.query(GalleryImage).first():
        gallery = [
            GalleryImage(order=1,
                image_url="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
                caption_en="Ministry & Worship", caption_fr="Ministère & Adoration"),
            GalleryImage(order=2,
                image_url="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
                caption_en="Live Gospel Performances", caption_fr="Performances Gospel en Direct"),
            GalleryImage(order=3,
                image_url="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
                caption_en="Music Creation Process", caption_fr="Processus de Création Musicale"),
            GalleryImage(order=4,
                image_url="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800",
                caption_en="Community Outreach & Evangelism", caption_fr="Action Communautaire & Évangélisation"),
        ]
        db.add_all(gallery)
        print("✅  Galerie créée")

    # ── YouTube ──────────────────────────────────────────────────────────────
    if not db.query(YoutubeChannel).first():
        db.add(YoutubeChannel(
            channel_url="https://www.youtube.com/@ThenellaOfficiel",
            channel_name="Thenella Officiel",
            channel_description_en="Subscribe to Thenella's official YouTube channel for worship videos, ministry sessions, and gospel music.",
            channel_description_fr="Abonnez-vous à la chaîne officielle de Thenella pour des vidéos de louange, sessions de ministère et musique gospel.",
        ))
        print("✅  Chaîne YouTube créée")

    if not db.query(YoutubeVideo).first():
        videos = [
            YoutubeVideo(video_id="dQw4w9WgXcQ", title="Ouvrier de la Moisson",
                description="Un appel à travailler pour le Seigneur", is_featured=True, order=1),
            YoutubeVideo(video_id="kJQP7kiw5Fk", title="Seigneur Mon Roi",
                description="Adorons le Roi des rois", is_featured=False, order=2),
            YoutubeVideo(video_id="9bZkp7q19f0", title="La Gloire de l'Éternel",
                description="Chantons la gloire de Dieu", is_featured=False, order=3),
        ]
        db.add_all(videos)
        print("✅  Vidéos YouTube créées")

    # ── Social Media ─────────────────────────────────────────────────────────
    if not db.query(SocialMedia).first():
        platforms = [
            {
                "platform": "youtube",
                "description_en": "Official music videos and worship sessions",
                "description_fr": "Vidéos musicales officielles et sessions de louange",
                "links": [
                    {"label_en": "Ouvrier de la Moisson", "label_fr": "Ouvrier de la Moisson",
                     "url": "https://www.youtube.com/results?search_query=Thenella+Officiel",
                     "icon": "fas fa-play-circle"},
                    {"label_en": "Seigneur Mon Roi", "label_fr": "Seigneur Mon Roi",
                     "url": "https://www.youtube.com/results?search_query=Thenella+Officiel",
                     "icon": "fas fa-play-circle"},
                ],
            },
            {
                "platform": "tiktok",
                "description_en": "Short videos, behind the scenes, and worship clips",
                "description_fr": "Vidéos courtes, coulisses et clips de louange",
                "links": [
                    {"label_en": "Worship Moments", "label_fr": "Moments de Louange",
                     "url": "https://www.tiktok.com/search?q=thenella+gospel",
                     "icon": "fas fa-video"},
                    {"label_en": "Ministry Updates", "label_fr": "Mises à Jour du Ministère",
                     "url": "https://www.tiktok.com/search?q=thenella+gospel",
                     "icon": "fas fa-video"},
                ],
            },
            {
                "platform": "facebook",
                "description_en": "Thenella Ministries official page for updates and events",
                "description_fr": "Page officielle pour mises à jour et événements",
                "links": [
                    {"label_en": "Ministry Publications", "label_fr": "Publications du Ministère",
                     "url": "https://www.facebook.com/search/top?q=thenella+gospel",
                     "icon": "fas fa-newspaper"},
                    {"label_en": "Community Events", "label_fr": "Événements Communautaires",
                     "url": "https://www.facebook.com/search/top?q=thenella+gospel",
                     "icon": "fas fa-users"},
                ],
            },
            {
                "platform": "instagram",
                "description_en": "Personal ministry moments and inspirational posts",
                "description_fr": "Moments personnels du ministère et publications inspirantes",
                "links": [
                    {"label_en": "#ThenellaMinistries", "label_fr": "#ThenellaMinistries",
                     "url": "https://www.instagram.com/explore/tags/thenella/",
                     "icon": "fas fa-hashtag"},
                    {"label_en": "#CameroonianGospel", "label_fr": "#CameroonianGospel",
                     "url": "https://www.instagram.com/explore/tags/thenella/",
                     "icon": "fas fa-hashtag"},
                ],
            },
        ]
        for p in platforms:
            links = p.pop("links")
            sm = SocialMedia(**p)
            db.add(sm)
            db.flush()
            for lk in links:
                db.add(SocialMediaLink(social_media_id=sm.id, **lk))
        print("✅  Réseaux sociaux créés")

    db.commit()
    db.close()
    print("\n🎉  Seed terminé avec succès !")
    print("   → Admin URL  : http://localhost:5173/admin")
    print("   → Login      : thenella_admin  /  Thenella2024!")
    print("   → API Docs   : http://localhost:8000/api/docs")


if __name__ == "__main__":
    seed()
