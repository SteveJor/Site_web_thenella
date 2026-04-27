import { useLang } from "../../context/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-col">
            <h3>{t("THENELLA Ministries", "Ministères THENELLA")}</h3>
            <p>
              {t(
                "Spreading the gospel through music, worship, and evangelism. Based in Douala, Cameroon.",
                "Diffuser l'évangile par la musique, la louange et l'évangélisation. Basé à Douala, Cameroun."
              )}
            </p>
            <div className="social-icons">
              <a href="https://www.facebook.com/search/top?q=thenella+gospel" target="_blank" rel="noreferrer">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="https://www.instagram.com/explore/tags/thenella/" target="_blank" rel="noreferrer">
                <i className="fab fa-instagram" />
              </a>
              <a href="https://www.youtube.com/@ThenellaOfficiel" target="_blank" rel="noreferrer">
                <i className="fab fa-youtube" />
              </a>
              <a href="https://www.tiktok.com/search?q=thenella+gospel" target="_blank" rel="noreferrer">
                <i className="fab fa-tiktok" />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h3>{t("Quick Links", "Liens Rapides")}</h3>
            <ul className="footer-links">
              {[
                ["home", "Home", "Accueil"],
                ["biography", "Biography", "Biographie"],
                ["music", "Music", "Musique"],
                ["youtube", "YouTube", "YouTube"],
                ["contact", "Contact", "Contact"],
              ].map(([id, en, fr]) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>
                    {t(en, fr)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>{t("Contact Info", "Informations de Contact")}</h3>
            <ul className="footer-links">
              <li>
                <i className="fas fa-map-marker-alt" style={{ color: "var(--secondary)" }} />
                <span>{t("Douala, Cameroon", "Douala, Cameroun")}</span>
              </li>
              <li>
                <i className="fas fa-envelope" style={{ color: "var(--secondary)" }} />
                <span>contact@thenellaministries.com</span>
              </li>
              <li>
                <i className="fas fa-phone" style={{ color: "var(--secondary)" }} />
                <span>+237 XXX XXX XXX</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="copyright">
          <p>
            &copy; {new Date().getFullYear()} THENELLA Ministries.{" "}
            {t("All rights reserved.", "Tous droits réservés.")}{" "}
            | {t("Designed with", "Conçu avec")} ❤️{" "}
            {t("for gospel music lovers", "pour les amateurs de musique gospel")}
          </p>
        </div>
      </div>
    </footer>
  );
}
