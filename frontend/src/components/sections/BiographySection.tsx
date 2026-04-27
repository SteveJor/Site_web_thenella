import { useEffect, useState } from "react";
import { biographyApi } from "../../services/api";
import { useLang } from "../../context/LanguageContext";
import type { Biography } from "../../types";

const FALLBACK: Biography = {
  id: 1,
  name: "Bonog Thérèse Ornella",
  subtitle_en: "Cameroonian Gospel Artist · Evangelist · Worship Leader",
  subtitle_fr: "Artiste Gospel Camerounaise · Évangéliste · Leader de Louange",
  bio_text1_en:
    "Thenella, born Bonog Thérèse Ornella, is a Cameroonian gospel singer, songwriter, worship leader, and evangelist. Her spiritual journey began in a Christian family where her father's miraculous healing experience profoundly shaped her faith.",
  bio_text1_fr:
    "Thenella, née Bonog Thérèse Ornella, est une chanteuse de gospel, auteure-compositrice, leader de louange et évangéliste camerounaise. Son parcours spirituel a commencé dans une famille chrétienne.",
  bio_text2_en:
    "For years, she served as lead vocalist and choir director at various churches, working with gospel groups like No Greater Love Family and Divine Harmonie. In September 2017, she was ordained as an evangelist.",
  bio_text2_fr:
    "Pendant des années, elle a servi comme vocaliste principale et directrice de chœur dans diverses églises. En septembre 2017, elle a été ordonnée évangéliste.",
  bio_text3_en:
    "Married to Dr. Philippe Totto Ndong, Thenella continues to minister through her music and gospel outreach from Douala, Cameroon, touching hearts with worship that bridges earthly experiences and divine encounters.",
  bio_text3_fr:
    "Mariée au Dr. Philippe Totto Ndong, Thenella continue à exercer son ministère depuis Douala, Cameroun, touchant les cœurs avec une louange qui relie les expériences terrestres aux rencontres divines.",
  image_url:
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600",
  updated_at: "",
};

export default function BiographySection() {
  const { t } = useLang();
  const [bio, setBio] = useState<Biography>(FALLBACK);

  useEffect(() => {
    biographyApi.get().then(setBio).catch(() => {});
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <section className="biography" id="biography">
      <div className="container">
        <div className="section-title">
          <h2>{t("Her Story", "Son Histoire")}</h2>
        </div>
        <div className="bio-content">
          <div className="bio-img">
            <img
              src={"/public/OIP.webp"}
              alt="THENELLA"
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK.image_url;
              }}
            />
          </div>
          <div className="bio-text">
            <h3>{bio.name}</h3>
            {[
              [bio.bio_text1_en, bio.bio_text1_fr],
              [bio.bio_text2_en, bio.bio_text2_fr],
              [bio.bio_text3_en, bio.bio_text3_fr],
            ].map(([en, fr], i) =>
              en || fr ? (
                <p key={i}>{t(en || "", fr || "")}</p>
              ) : null
            )}
            <button className="btn" onClick={() => scrollTo("achievements")}>
              {t("See Her Achievements", "Voir Ses Réalisations")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
