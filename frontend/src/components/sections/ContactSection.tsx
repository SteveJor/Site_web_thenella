import { useState } from "react";
import { contactApi } from "../../services/api";
import { useLang } from "../../context/LanguageContext";

export default function ContactSection() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", phone: "", event_type: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await contactApi.send(form);
      setStatus("ok");
      setForm({ name: "", email: "", phone: "", event_type: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-title">
          <h2>{t("Contact & Booking", "Contact & Réservation")}</h2>
        </div>
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t("Full Name", "Nom Complet")}</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>{t("Email Address", "Adresse Email")}</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>{t("Phone Number", "Numéro de Téléphone")}</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>{t("Type of Event", "Type d'Événement")}</label>
              <select
                required
                value={form.event_type}
                onChange={(e) => setForm({ ...form, event_type: e.target.value })}
              >
                <option value="">{t("Select an option", "Sélectionnez une option")}</option>
                <option value="concert">{t("Concert", "Concert")}</option>
                <option value="church-service">{t("Church Service", "Culte d'Église")}</option>
                <option value="conference">{t("Conference", "Conférence")}</option>
                <option value="wedding">{t("Wedding", "Mariage")}</option>
                <option value="other">{t("Other", "Autre")}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t("Message", "Message")}</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={t(
                  "Tell us about your event and how Thenella can minister...",
                  "Parlez-nous de votre événement et comment Thenella peut exercer son ministère..."
                )}
              />
            </div>
            <button type="submit" className="btn" disabled={status === "loading"}>
              {status === "loading"
                ? t("Sending...", "Envoi en cours...")
                : t("Send Booking Request", "Envoyer la Demande de Réservation")}
            </button>
            {status === "ok" && (
              <div className="form-success">
                <i className="fas fa-check-circle" style={{ marginRight: 8 }} />
                {t(
                  "Thank you! Your message has been received. We will contact you shortly.",
                  "Merci ! Votre message a bien été reçu. Nous vous contacterons bientôt."
                )}
              </div>
            )}
            {status === "error" && (
              <div className="form-error">
                {t("An error occurred. Please try again.", "Une erreur est survenue. Veuillez réessayer.")}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
