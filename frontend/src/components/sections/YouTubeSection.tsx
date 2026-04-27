import { useEffect, useState } from "react";
import { youtubeApi } from "../../services/api";
import { useLang } from "../../context/LanguageContext";
import type { YoutubeVideo, YoutubeChannel } from "../../types";

const FALLBACK_VIDEOS: YoutubeVideo[] = [
  { id: 1, video_id: "dQw4w9WgXcQ", title: "Ouvrier de la Moisson",
    description: "Un appel à travailler pour le Seigneur", is_featured: true, order: 1, created_at: "" },
  { id: 2, video_id: "kJQP7kiw5Fk", title: "Seigneur Mon Roi",
    description: "Adorons le Roi des rois", is_featured: false, order: 2, created_at: "" },
  { id: 3, video_id: "9bZkp7q19f0", title: "La Gloire de l'Éternel",
    description: "Chantons la gloire de Dieu", is_featured: false, order: 3, created_at: "" },
];

const FALLBACK_CHANNEL: YoutubeChannel = {
  id: 1,
  channel_url: "https://www.youtube.com/@ThenellaOfficiel",
  channel_name: "Thenella Officiel",
  channel_description_en:
    "Subscribe to Thenella's official YouTube channel for worship videos, ministry sessions, and gospel music.",
  channel_description_fr:
    "Abonnez-vous à la chaîne officielle de Thenella pour des vidéos de louange, sessions de ministère et musique gospel.",
};

function ytThumb(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
}

export default function YouTubeSection() {
  const { t } = useLang();
  const [videos, setVideos] = useState<YoutubeVideo[]>(FALLBACK_VIDEOS);
  const [channel, setChannel] = useState<YoutubeChannel>(FALLBACK_CHANNEL);
  const [current, setCurrent] = useState<YoutubeVideo | null>(null);

  useEffect(() => {
    youtubeApi.getVideos()
      .then((data) => {
        if (data.length) {
          setVideos(data);
          const featured = data.find((v: YoutubeVideo) => v.is_featured) || data[0];
          setCurrent(featured);
        } else {
          setCurrent(FALLBACK_VIDEOS[0]);
        }
      })
      .catch(() => setCurrent(FALLBACK_VIDEOS[0]));

    youtubeApi.getChannel().then(setChannel).catch(() => {});
  }, []);

  const active = current || (videos.length ? videos[0] : null);

  return (
    <section className="youtube-section" id="youtube">
      <div className="container">
        <div className="section-title">
          <h2>{t("Watch & Listen", "Regarder & Écouter")}</h2>
        </div>

        <div className="youtube-layout">
          {/* ── Main player ── */}
          <div>
            <div className="youtube-player-wrap">
              {active && (
                <iframe
                  key={active.video_id}
                  src={`https://www.youtube.com/embed/${active.video_id}?rel=0&modestbranding=1`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
            {active && (
              <div className="youtube-player-title">
                <i className="fab fa-youtube" style={{ color: "#FF0000", marginRight: 8 }} />
                {active.title}
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="youtube-sidebar">
            {/* Channel card */}
            <div className="youtube-channel-card">
              <h3>
                <i className="fab fa-youtube" />
                {channel.channel_name}
              </h3>
              <p>{t(channel.channel_description_en, channel.channel_description_fr)}</p>
              <div className="youtube-channel-btns">
                <a
                  href={channel.channel_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-youtube"
                >
                  <i className="fab fa-youtube" />
                  {t("Visit Channel", "Voir la Chaîne")}
                </a>
                <a
                  href={`${channel.channel_url}?sub_confirmation=1`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                  style={{ textAlign: "center" }}
                >
                  <i className="fas fa-bell" style={{ marginRight: 8 }} />
                  {t("Subscribe", "S'abonner")}
                </a>
              </div>
            </div>

            {/* Playlist */}
            <div className="youtube-playlist">
              <h4>
                <i className="fas fa-list" style={{ marginRight: 8 }} />
                {t("More Videos", "Plus de Vidéos")}
              </h4>
              <div className="video-thumb-list">
                {videos.map((v) => (
                  <div
                    key={v.id}
                    className={`video-thumb ${active?.id === v.id ? "active" : ""}`}
                    onClick={() => setCurrent(v)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setCurrent(v)}
                  >
                    <img
                      src={ytThumb(v.video_id)}
                      alt={v.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200";
                      }}
                    />
                    <div className="video-thumb-info">
                      <p>{v.title}</p>
                      <span>{v.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
