import { useState, useEffect } from "react";
import { useLang } from "../../context/LanguageContext";

const sections = [
  { id: "home",         en: "Home",         fr: "Accueil" },
  { id: "biography",   en: "Biography",    fr: "Biographie" },
  { id: "achievements",en: "Achievements", fr: "Réalisations" },
  { id: "music",       en: "Music",        fr: "Musique" },
  { id: "youtube",     en: "YouTube",      fr: "YouTube" },
  { id: "gallery",     en: "Gallery",      fr: "Galerie" },
  { id: "accounts",    en: "Follow",       fr: "Suivre" },
  { id: "contact",     en: "Contact",      fr: "Contact" },
];

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="container">
        <nav className="navbar">
          <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); scrollTo("home"); }}>
            THEN<span>ELLA</span>
          </a>

          <button
            className="hamburger"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <i className={`fas ${open ? "fa-times" : "fa-bars"}`} />
          </button>

          <ul className={`nav-links ${open ? "open" : ""}`}>
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(s.id); }}
                >
                  {t(s.en, s.fr)}
                </a>
              </li>
            ))}
            <div className="language-switcher">
              <button
                className={`lang-btn ${lang === "en" ? "active" : ""}`}
                onClick={() => setLang("en")}
              >EN</button>
              <button
                className={`lang-btn ${lang === "fr" ? "active" : ""}`}
                onClick={() => setLang("fr")}
              >FR</button>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
}
