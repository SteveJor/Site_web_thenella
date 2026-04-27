import { useEffect, useState } from "react";
import { youtubeApi } from "../../services/api";

const EMPTY_VIDEO = { video_id: "", title: "", description: "", is_featured: false, order: 0 };

function ytThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
}

export default function AdminYoutube() {
  const [videos, setVideos] = useState<any[]>([]);
  const [channel, setChannel] = useState<any>({});
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<any>(EMPTY_VIDEO);
  const [saving, setSaving] = useState(false);
  const [savingCh, setSavingCh] = useState(false);
  const [msgCh, setMsgCh] = useState("");

  const load = () => {
    youtubeApi.getVideos().then(setVideos).catch(() => {});
    youtubeApi.getChannel().then(setChannel).catch(() => {});
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm({ ...EMPTY_VIDEO, order: videos.length + 1 }); setModal(true); };
  const openEdit = (v: any) => { setEditing(v); setForm({ ...v }); setModal(true); };
  const fv = (field: string) => ({
    value: form[field] ?? "",
    onChange: (e: any) => setForm({ ...form, [field]: e.target.value }),
  });
  const fc = (field: string) => ({
    value: channel[field] ?? "",
    onChange: (e: any) => setChannel({ ...channel, [field]: e.target.value }),
  });

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, is_featured: Boolean(form.is_featured) };
      if (editing) await youtubeApi.updateVideo(editing.id, payload);
      else await youtubeApi.createVideo(payload);
      await load();
      setModal(false);
    } catch {} finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette vidéo ?")) return;
    await youtubeApi.deleteVideo(id);
    await load();
  };

  const handleFeature = async (v: any) => {
    await youtubeApi.updateVideo(v.id, { is_featured: true });
    await load();
  };

  const handleSaveChannel = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingCh(true);
    try {
      await youtubeApi.updateChannel(channel);
      setMsgCh("✅ Chaîne mise à jour !");
    } catch {
      setMsgCh("❌ Erreur lors de la sauvegarde.");
    } finally {
      setSavingCh(false);
      setTimeout(() => setMsgCh(""), 4000);
    }
  };

  return (
    <div>
      {/* ── Channel card ── */}
      <div className="admin-form-card" style={{ marginBottom: 32 }}>
        <h2>Chaîne YouTube</h2>
        <form onSubmit={handleSaveChannel}>
          <div className="admin-form-grid">
            <div className="form-group">
              <label>Nom de la chaîne</label>
              <input type="text" {...fc("channel_name")} />
            </div>
            <div className="form-group">
              <label>URL de la chaîne</label>
              <input type="text" placeholder="https://www.youtube.com/@..." {...fc("channel_url")} />
            </div>
            <div className="form-group">
              <label>Description (EN)</label>
              <textarea rows={3} {...fc("channel_description_en")} />
            </div>
            <div className="form-group">
              <label>Description (FR)</label>
              <textarea rows={3} {...fc("channel_description_fr")} />
            </div>
          </div>
          {msgCh && (
            <div className={msgCh.startsWith("✅") ? "form-success" : "form-error"} style={{ marginBottom: 12 }}>{msgCh}</div>
          )}
          <button type="submit" className="btn" disabled={savingCh}>
            {savingCh ? "Sauvegarde…" : "Mettre à jour la chaîne"}
          </button>
          {channel.channel_url && (
            <a href={channel.channel_url} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ marginLeft: 12 }}>
              <i className="fab fa-youtube" style={{ marginRight: 8, color: "#FF0000" }} />
              Voir la chaîne
            </a>
          )}
        </form>
      </div>

      {/* ── Videos ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "var(--dark)", margin: 0 }}>
          Vidéos ({videos.length})
        </h2>
        <button className="btn" onClick={openNew}>
          <i className="fas fa-plus" style={{ marginRight: 8 }} />Ajouter une vidéo
        </button>
      </div>

      <div>
        {videos.map((v) => (
          <div className="youtube-video-card" key={v.id}
            style={{ background: "var(--white)", border: "1px solid #f0ebe4", borderRadius: 10, padding: 16, display: "flex", gap: 16, alignItems: "center", marginBottom: 12, boxShadow: "var(--shadow)" }}>
            <img
              src={ytThumb(v.video_id)}
              alt={v.title}
              style={{ width: 130, height: 73, objectFit: "cover", borderRadius: 8, flexShrink: 0 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div style={{ flex: 1 }}>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "var(--dark)", marginBottom: 4 }}>
                {v.title}
                {v.is_featured && (
                  <span className="featured-badge" style={{ marginLeft: 8 }}>★ À la une</span>
                )}
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-light)", margin: 0 }}>{v.description}</p>
              <p style={{ fontSize: "0.8rem", color: "var(--secondary)", marginTop: 4 }}>
                ID: <code>{v.video_id}</code>
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {!v.is_featured && (
                <button className="btn-feature" onClick={() => handleFeature(v)} title="Mettre en vedette">
                  <i className="fas fa-star" style={{ marginRight: 6 }} />Vedette
                </button>
              )}
              <button className="btn-edit" onClick={() => openEdit(v)}>
                <i className="fas fa-pen" style={{ marginRight: 6 }} />Modifier
              </button>
              <button className="btn-delete" onClick={() => handleDelete(v.id)}>
                <i className="fas fa-trash" style={{ marginRight: 6 }} />Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setModal(false)}>
          <div className="modal-box">
            <h3>{editing ? "Modifier la vidéo" : "Ajouter une vidéo"}</h3>
            {form.video_id && (
              <img src={ytThumb(form.video_id)} alt="thumb" style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            )}
            <form onSubmit={handleSaveVideo}>
              <div className="admin-form-grid">
                <div className="form-group full-width">
                  <label>ID de la vidéo YouTube * <small style={{ color: "var(--text-light)" }}>(ex: dQw4w9WgXcQ depuis l'URL youtube.com/watch?v=...)</small></label>
                  <input required type="text" placeholder="dQw4w9WgXcQ" {...fv("video_id")} />
                </div>
                <div className="form-group">
                  <label>Titre</label>
                  <input type="text" {...fv("title")} />
                </div>
                <div className="form-group">
                  <label>Ordre</label>
                  <input type="number" {...fv("order")} />
                </div>
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea rows={3} {...fv("description")} />
                </div>
                <div className="form-group full-width">
                  <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={!!form.is_featured}
                      onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                      style={{ width: "auto", accentColor: "var(--secondary)" }}
                    />
                    Vidéo à la une (affichée en premier dans le lecteur)
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setModal(false)}>Annuler</button>
                <button type="submit" className="btn" disabled={saving}>{saving ? "…" : "Sauvegarder"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
