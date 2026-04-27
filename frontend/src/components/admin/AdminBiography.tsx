import { useEffect, useState } from "react";
import { biographyApi } from "../../services/api";

export default function AdminBiography() {
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    biographyApi.get().then(setForm).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await biographyApi.update(form);
      setMsg("✅ Biographie mise à jour avec succès !");
    } catch {
      setMsg("❌ Erreur lors de la sauvegarde.");
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 4000);
    }
  };

  const f = (field: string) => ({
    value: form[field] || "",
    onChange: (e: any) => setForm({ ...form, [field]: e.target.value }),
  });

  if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;

  return (
    <div className="admin-form-card">
      <h2>Modifier la Biographie</h2>

      <form onSubmit={handleSave}>
        {/* Preview card */}
        <div className="admin-card" style={{ marginBottom: 28 }}>
          <div className="admin-card-img">
            {form.image_url ? (
              <img src={form.image_url} alt="Preview" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            ) : (
              <div className="admin-card-img-placeholder"><i className="fas fa-user" /></div>
            )}
          </div>
          <div className="admin-card-body">
            <h3>{form.name || "Nom de l'artiste"}</h3>
            <p>{form.subtitle_fr || form.subtitle_en || "Sous-titre"}</p>
          </div>
        </div>

        <div className="admin-form-grid">
          <div className="form-group full-width">
            <label>Nom complet</label>
            <input type="text" {...f("name")} />
          </div>
          <div className="form-group">
            <label>Sous-titre (EN)</label>
            <input type="text" {...f("subtitle_en")} />
          </div>
          <div className="form-group">
            <label>Sous-titre (FR)</label>
            <input type="text" {...f("subtitle_fr")} />
          </div>
          <div className="form-group full-width">
            <label>URL de la photo</label>
            <input type="text" {...f("image_url")} placeholder="https://..." />
          </div>
          <div className="form-group">
            <label>Paragraphe 1 (EN)</label>
            <textarea rows={4} {...f("bio_text1_en")} />
          </div>
          <div className="form-group">
            <label>Paragraphe 1 (FR)</label>
            <textarea rows={4} {...f("bio_text1_fr")} />
          </div>
          <div className="form-group">
            <label>Paragraphe 2 (EN)</label>
            <textarea rows={4} {...f("bio_text2_en")} />
          </div>
          <div className="form-group">
            <label>Paragraphe 2 (FR)</label>
            <textarea rows={4} {...f("bio_text2_fr")} />
          </div>
          <div className="form-group">
            <label>Paragraphe 3 (EN)</label>
            <textarea rows={4} {...f("bio_text3_en")} />
          </div>
          <div className="form-group">
            <label>Paragraphe 3 (FR)</label>
            <textarea rows={4} {...f("bio_text3_fr")} />
          </div>
        </div>

        {msg && (
          <div className={msg.startsWith("✅") ? "form-success" : "form-error"} style={{ marginBottom: 16 }}>
            {msg}
          </div>
        )}
        <button type="submit" className="btn" disabled={saving}>
          {saving ? "Sauvegarde…" : "Sauvegarder les modifications"}
        </button>
      </form>
    </div>
  );
}
