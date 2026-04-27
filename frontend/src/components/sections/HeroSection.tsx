import { useLang } from "../../context/LanguageContext";

export default function HeroSection() {
  const { t } = useLang();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>THENELLA</h1>
        <p>{t(
          "Cameroonian Gospel Artist · Evangelist · Worship Leader",
          "Artiste Gospel Camerounaise · Évangéliste · Leader de Louange"
        )}</p>
        <p>{t(
          "Ministering through music that transforms hearts and glorifies God",
          "Ministère par la musique qui transforme les cœurs et glorifie Dieu"
        )}</p>
        <div className="hero-btns">
          <button className="btn" onClick={() => scrollTo("music")}>
            {t("Listen to Music", "Écouter la Musique")}
          </button>
          <button className="btn btn-outline" onClick={() => scrollTo("contact")}>
            {t("Book for Ministry", "Réserver pour le Ministère")}
          </button>
        </div>
      </div>
    </section>
  );
}
