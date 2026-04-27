import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AdminBiography from "../../components/admin/AdminBiography";
import AdminAchievements from "../../components/admin/AdminAchievements";
import AdminMusic from "../../components/admin/AdminMusic";
import AdminGallery from "../../components/admin/AdminGallery";
import AdminYoutube from "../../components/admin/AdminYoutube";
import AdminSocial from "../../components/admin/AdminSocial";
import AdminMessages from "../../components/admin/AdminMessages";
import AdminOverview from "../../components/admin/AdminOverview";

type Section =
  | "overview"
  | "biography"
  | "achievements"
  | "music"
  | "gallery"
  | "youtube"
  | "social"
  | "messages";

const NAV: { id: Section; icon: string; label: string }[] = [
  { id: "overview",     icon: "fas fa-tachometer-alt", label: "Tableau de bord" },
  { id: "biography",    icon: "fas fa-user",            label: "Biographie" },
  { id: "achievements", icon: "fas fa-trophy",          label: "Réalisations" },
  { id: "music",        icon: "fas fa-music",           label: "Musique" },
  { id: "gallery",      icon: "fas fa-images",          label: "Galerie" },
  { id: "youtube",      icon: "fab fa-youtube",         label: "YouTube" },
  { id: "social",       icon: "fas fa-share-alt",       label: "Réseaux Sociaux" },
  { id: "messages",     icon: "fas fa-envelope",        label: "Messages" },
];

const TITLES: Record<Section, string> = {
  overview:     "Tableau de bord",
  biography:    "Biographie",
  achievements: "Réalisations & Awards",
  music:        "Discographie",
  gallery:      "Galerie",
  youtube:      "YouTube",
  social:       "Réseaux Sociaux",
  messages:     "Messages reçus",
};

export default function AdminDashboard() {
  const { username, logout } = useAuth();
  const [section, setSection] = useState<Section>("overview");

  const renderSection = () => {
    switch (section) {
      case "overview":     return <AdminOverview onNavigate={setSection} />;
      case "biography":    return <AdminBiography />;
      case "achievements": return <AdminAchievements />;
      case "music":        return <AdminMusic />;
      case "gallery":      return <AdminGallery />;
      case "youtube":      return <AdminYoutube />;
      case "social":       return <AdminSocial />;
      case "messages":     return <AdminMessages />;
    }
  };

  return (
    <div className="admin-layout">
      {/* ── Sidebar ── */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <a href="/" className="logo">THEN<span>ELLA</span></a>
          <p>Administration</p>
        </div>

        <nav className="admin-nav">
          {NAV.map((item) => (
            <button
              key={item.id}
              className={`admin-nav-item ${section === item.id ? "active" : ""}`}
              onClick={() => setSection(item.id)}
            >
              <i className={item.icon} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <p>Connecté en tant que<br /><strong style={{ color: "var(--secondary)" }}>{username}</strong></p>
          <button className="btn btn-outline" style={{ width: "100%", textAlign: "center", borderColor: "#bbb", color: "#bbb" }} onClick={logout}>
            <i className="fas fa-sign-out-alt" style={{ marginRight: 8 }} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="admin-main">
        <div className="admin-topbar">
          <h1>
            <i
              className={NAV.find((n) => n.id === section)?.icon || "fas fa-home"}
              style={{ marginRight: 12, color: "var(--secondary)" }}
            />
            {TITLES[section]}
          </h1>
          <div className="admin-topbar-right">
            <span className="admin-badge">
              <i className="fas fa-user-shield" style={{ marginRight: 6 }} />
              Admin
            </span>
            <a href="/" target="_blank" className="btn btn-outline" style={{ padding: "8px 18px", fontSize: "0.85rem" }}>
              <i className="fas fa-external-link-alt" style={{ marginRight: 6 }} />
              Voir le site
            </a>
          </div>
        </div>

        <div className="admin-content">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}
