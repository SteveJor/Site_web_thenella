import { useEffect, useState } from "react";
import { musicApi } from "../../services/api";
import { useLang } from "../../context/LanguageContext";
import type { Music } from "../../types";

const FALLBACK: Music[] = [
  { id: 1, title: "Cœur Nouveau", year: 2019, order: 1, created_at: "",
    description_en: "Breakthrough album with 10 tracks of spiritual transformation",
    description_fr: "Album révélation avec 10 titres de transformation spirituelle",
    cover_url: "/public/592x592bb.webp",
    listen_url: "https://music.apple.com/us/album/c%C5%93ur-nouveau/1454733587" },
  { id: 2, title: "Une Autre Dimension", year: 2024, order: 2, created_at: "",
    description_en: "Latest album capturing praise, worship, and testimony themes",
    description_fr: "Dernier album capturant des thèmes de louange et d'adoration",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/ac/59/c2/ac59c25e-placeholder.jpg/592x592bb.jpg",
    listen_url: "https://music.apple.com/sn/album/une-autre-dimension/1786566551" },
  { id: 3, title: "Je te bénirai (Live)", year: 2024, order: 3, created_at: "",
    description_en: "Live single reflecting grateful worship and praise",
    description_fr: "Single en direct reflétant une adoration reconnaissante",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/ac/59/c2/ac59c25e-placeholder.jpg/592x592bb.jpg",
    listen_url: "https://music.apple.com/gb/album/je-te-b%C3%A9nirai-live-single/1755108856" },
];

const COVER_FALLBACK = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400";

export default function MusicSection() {
  const { t } = useLang();
  const [items, setItems] = useState<Music[]>(FALLBACK);

  useEffect(() => {
    musicApi.getAll().then((data) => { if (data.length) setItems(data); }).catch(() => {});
  }, []);

  return (
    <section className="music" id="music">
      <div className="container">
        <div className="section-title">
          <h2>{t("Discography", "Discographie")}</h2>
        </div>
        <div className="music-grid">
          {items.map((item) => (
            <div className="music-card" key={item.id}>
              <div className="music-img">
                <img
                  src={item.cover_url || COVER_FALLBACK}
                  alt={item.title}
                  onError={(e) => { (e.target as HTMLImageElement).src = COVER_FALLBACK; }}
                />
              </div>
              <div className="music-info">
                <h3>{item.title}{item.year ? ` (${item.year})` : ""}</h3>
                <p>{t(item.description_en || "", item.description_fr || item.description_en || "")}</p>
                {item.listen_url && (
                  <a href={item.listen_url} target="_blank" rel="noreferrer" className="btn">
                    {t("Listen Now", "Écouter")}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
