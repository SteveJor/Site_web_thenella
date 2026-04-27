import { useEffect, useState } from "react";
import { socialMediaApi } from "../../services/api";
import { useLang } from "../../context/LanguageContext";
import type { SocialMedia } from "../../types";

const PLATFORM_ICON: Record<string, string> = {
  youtube:   "fab fa-youtube",
  tiktok:    "fab fa-tiktok",
  facebook:  "fab fa-facebook",
  instagram: "fab fa-instagram",
};

const PLATFORM_CLASS: Record<string, string> = {
  youtube:   "youtube-card",
  tiktok:    "tiktok-card",
  facebook:  "facebook-card",
  instagram: "instagram-card",
};

export default function SocialSection() {
  const { t } = useLang();
  const [items, setItems] = useState<SocialMedia[]>([]);

  useEffect(() => {
    socialMediaApi.getAll().then(setItems).catch(() => {});
  }, []);

  return (
    <section className="accounts" id="accounts">
      <div className="container">
        <div className="section-title">
          <h2>{t("Social Media & Music", "Réseaux Sociaux & Musique")}</h2>
        </div>
        <div className="accounts-grid">
          {items.map((item) => (
            <div
              key={item.id}
              className={`account-card ${PLATFORM_CLASS[item.platform] || ""}`}
            >
              <div className="account-icon">
                <i className={PLATFORM_ICON[item.platform] || "fas fa-share-alt"} />
              </div>
              <h3 style={{ textTransform: "capitalize" }}>{item.platform}</h3>
              <p>{t(item.description_en, item.description_fr)}</p>
              {item.links.length > 0 && (
                <ul className="account-links">
                  {item.links.map((link) => (
                    <li key={link.id}>
                      <a href={link.url} target="_blank" rel="noreferrer">
                        <i className={`${link.icon} song-icon`} />
                        <span>{t(link.label_en, link.label_fr || link.label_en)}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
