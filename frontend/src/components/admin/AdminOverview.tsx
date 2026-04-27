import { useEffect, useState } from "react";
import {
  achievementsApi, musicApi, galleryApi,
  youtubeApi, contactApi, socialMediaApi,
} from "../../services/api";

type Section = "overview"|"biography"|"achievements"|"music"|"gallery"|"youtube"|"social"|"messages";

export default function AdminOverview({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const [stats, setStats] = useState({
    achievements: 0, music: 0, gallery: 0, videos: 0, messages: 0, unread: 0, social: 0,
  });

  useEffect(() => {
    Promise.allSettled([
      achievementsApi.getAll(),
      musicApi.getAll(),
      galleryApi.getAll(),
      youtubeApi.getVideos(),
      contactApi.getAll(),
      contactApi.getAll(false),
      socialMediaApi.getAll(),
    ]).then(([ach, mus, gal, vids, msgs, unread, soc]) => {
      setStats({
        achievements: ach.status === "fulfilled" ? ach.value.length : 0,
        music:        mus.status === "fulfilled" ? mus.value.length : 0,
        gallery:      gal.status === "fulfilled" ? gal.value.length : 0,
        videos:       vids.status === "fulfilled" ? vids.value.length : 0,
        messages:     msgs.status === "fulfilled" ? msgs.value.length : 0,
        unread:       unread.status === "fulfilled" ? unread.value.length : 0,
        social:       soc.status === "fulfilled" ? soc.value.length : 0,
      });
    });
  }, []);

  const STAT_CARDS = [
    { icon: "fas fa-trophy",  label: "Réalisations",    value: stats.achievements, section: "achievements" as Section },
    { icon: "fas fa-music",   label: "Albums/Singles",  value: stats.music,        section: "music" as Section },
    { icon: "fas fa-images",  label: "Photos Galerie",  value: stats.gallery,      section: "gallery" as Section },
    { icon: "fab fa-youtube", label: "Vidéos YouTube",  value: stats.videos,       section: "youtube" as Section },
    { icon: "fas fa-envelope",label: "Messages reçus",  value: stats.messages,     section: "messages" as Section },
    { icon: "fas fa-bell",    label: "Non lus",         value: stats.unread,       section: "messages" as Section, highlight: true },
    { icon: "fas fa-share-alt",label: "Réseaux Sociaux",value: stats.social,       section: "social" as Section },
  ];

  const QUICK_LINKS: { icon: string; label: string; desc: string; section: Section }[] = [
    { icon: "fas fa-user",       label: "Modifier la Biographie", desc: "Texte, photo et sous-titre",         section: "biography" },
    { icon: "fas fa-music",      label: "Ajouter un Album",       desc: "Discographie & singles",              section: "music" },
    { icon: "fab fa-youtube",    label: "Gérer les Vidéos",       desc: "Vidéos & chaîne YouTube",             section: "youtube" },
    { icon: "fas fa-images",     label: "Gérer la Galerie",       desc: "Photos de performances et événements",section: "gallery" },
    { icon: "fas fa-envelope",   label: "Voir les Messages",      desc: "Demandes de booking reçues",          section: "messages" },
    { icon: "fas fa-share-alt",  label: "Réseaux Sociaux",        desc: "Liens et descriptions des plateformes",section: "social" },
  ];

  return (
    <div>
      {/* Stats */}
      <div className="admin-stats">
        {STAT_CARDS.map((s) => (
          <div
            className="stat-card"
            key={s.label}
            onClick={() => onNavigate(s.section)}
            style={{ cursor: "pointer" }}
          >
            <div className="stat-icon" style={s.highlight ? { background: "rgba(218,165,32,0.15)", color: "var(--secondary)" } : {}}>
              <i className={s.icon} />
            </div>
            <div className="stat-info">
              <h3 style={s.highlight ? { color: "var(--secondary)" } : {}}>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick access cards — même style que les cards du site */}
      <div className="section-title" style={{ textAlign: "left", marginBottom: 24 }}>
        <h2 style={{ fontSize: "1.6rem", display: "inline-block" }}>Accès Rapide</h2>
      </div>
      <div className="admin-cards-grid">
        {QUICK_LINKS.map((q) => (
          <div
            className="admin-card"
            key={q.label}
            onClick={() => onNavigate(q.section)}
            style={{ cursor: "pointer" }}
          >
            <div className="admin-card-body" style={{ padding: 28 }}>
              <div className="admin-card-icon">
                <i className={q.icon} />
              </div>
              <h3>{q.label}</h3>
              <p>{q.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
