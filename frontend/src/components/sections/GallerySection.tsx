import { useEffect, useState, useRef } from "react";
import { galleryApi } from "../../services/api";
import { useLang } from "../../context/LanguageContext";
import type { GalleryImage } from "../../types";

const FALLBACK: GalleryImage[] = [
  { id: 1, order: 1, created_at: "", caption_en: "Ministry & Worship", caption_fr: "Ministère & Adoration",
    image_url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800" },
  { id: 2, order: 2, created_at: "", caption_en: "Live Gospel Performances", caption_fr: "Performances Gospel en Direct",
    image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800" },
  { id: 3, order: 3, created_at: "", caption_en: "Music Creation Process", caption_fr: "Processus de Création Musicale",
    image_url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800" },
  { id: 4, order: 4, created_at: "", caption_en: "Community Outreach & Evangelism", caption_fr: "Action Communautaire & Évangélisation",
    image_url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800" },
];

export default function GallerySection() {
  const { t } = useLang();
  const [slides, setSlides] = useState<GalleryImage[]>(FALLBACK);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    galleryApi.getAll().then((data) => { if (data.length) setSlides(data); }).catch(() => {});
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [slides.length]);

  const prev = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  };
  const next = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrent((c) => (c + 1) % slides.length);
  };

  return (
    <section className="media" id="gallery">
      <div className="container">
        <div className="section-title">
          <h2>{t("Gallery", "Galerie")}</h2>
        </div>
        <div className="media-slider">
          <div
            className="slider-container"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((s) => (
              <div className="slide" key={s.id}>
                <img
                  src={s.image_url}
                  alt={t(s.caption_en, s.caption_fr)}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK[0].image_url;
                  }}
                />
                <div className="slide-caption">
                  <h3>{t(s.caption_en, s.caption_fr)}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="slider-controls">
            <button className="slider-btn" onClick={prev} aria-label="Précédent">
              <i className="fas fa-chevron-left" />
            </button>
            <button className="slider-btn" onClick={next} aria-label="Suivant">
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
