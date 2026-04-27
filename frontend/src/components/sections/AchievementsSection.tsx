import { useEffect, useState } from "react";
import { achievementsApi } from "../../services/api";
import { useLang } from "../../context/LanguageContext";
import type { Achievement } from "../../types";

const FALLBACK: Achievement[] = [
  { id: 1, icon: "fas fa-trophy", order: 1, created_at: "",
    title_en: "Revelation of the Year", title_fr: "Révélation de l'Année",
    description_en: "Zamba Awards after the release of 'Cœur Nouveau' album",
    description_fr: "Zamba Awards après la sortie de l'album 'Cœur Nouveau'" },
  { id: 2, icon: "fas fa-music", order: 2, created_at: "",
    title_en: "Breakthrough Album", title_fr: "Album Révélation",
    description_en: "'Cœur Nouveau' (2019) with 10 inspirational tracks",
    description_fr: "'Cœur Nouveau' (2019) avec 10 titres inspirants" },
  { id: 3, icon: "fas fa-hands-praying", order: 3, created_at: "",
    title_en: "Ordained Evangelist", title_fr: "Évangéliste Ordonnée",
    description_en: "Officially ordained in September 2017 for ministry work",
    description_fr: "Ordonnée officiellement en septembre 2017" },
  { id: 4, icon: "fas fa-record-vinyl", order: 4, created_at: "",
    title_en: "Multiple Albums", title_fr: "Plusieurs Albums",
    description_en: "Released several successful albums and singles since 2017",
    description_fr: "Plusieurs albums et singles à succès depuis 2017" },
];

export default function AchievementsSection() {
  const { t } = useLang();
  const [items, setItems] = useState<Achievement[]>(FALLBACK);

  useEffect(() => {
    achievementsApi.getAll().then((data) => { if (data.length) setItems(data); }).catch(() => {});
  }, []);

  return (
    <section className="achievements" id="achievements">
      <div className="container">
        <div className="section-title">
          <h2>{t("Achievements & Awards", "Réalisations & Récompenses")}</h2>
        </div>
        <div className="achievements-grid">
          {items.map((item) => (
            <div className="achievement-card" key={item.id}>
              <div className="achievement-icon">
                <i className={item.icon} />
              </div>
              <h3>{t(item.title_en, item.title_fr || item.title_en)}</h3>
              <p>{t(item.description_en || "", item.description_fr || item.description_en || "")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
