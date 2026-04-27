import { useEffect, useState } from "react";
import { musicApi } from "../../services/api";

const EMPTY = { title: "", year: new Date().getFullYear(), description_en: "", description_fr: "", cover_url: "", listen_url: "", order: 0 };
const FALLBACK_IMG = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400";

export default function AdminMusic() {
  const [items, setItems] = useState<any[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<any>(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = () => musicApi.getAll().then(setItems).catch(() => {});
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm({ ...EMPTY, order: items.length + 1 }); setModal(true); };
  const openEdit = (item: any) => { setEditing(item); setForm({ ...item }); setModal(true); };
  const f = (field: string) => ({
    value: form[field] ?? "",
    onChange: (e: any) => setForm({ ...form, [field]: e.target.value }),
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) await musicApi.update(editing.id, form);
      else await musicApi.create(form);
      await load();
      setModal(false);
    } catch {} finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cet album/single ?")) return;
    await musicApi.delete(id);
    await load();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
        <button className="btn" onClick={openNew}>
          <i className="fas fa-plus" style={{ marginRight: 8 }} />Ajouter
        </button>
      </div>

      {/* Même style que les music-card du site */}
      <div className="music-grid">
        {items.map((item) => (
          <div className="music-card" key={item.id}>
            <div className="music-img">
              <img
                src={item.cover_url || FALLBACK_IMG}
                alt={item.title}
                onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
              />
            </div>
            <div className="music-info">
              <h3>{item.title}{item.year ? ` (${item.year})` : ""}</h3>
              <p>{item.description_fr || item.description_en}</p>
            </div>
            <div className="admin-card-actions">
              <button className="btn-edit" onClick={() => openEdit(item)}>
                <i className="fas fa-pen" style={{ marginRight: 6 }} />Modifier
              </button>
              <button className="btn-delete" onClick={() => handleDelete(item.id)}>
                <i className="fas fa-trash" style={{ marginRight: 6 }} />Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setModal(false)}>
          <div className="modal-box">
            <h3>{editing ? "Modifier l'album" : "Nouvel album / single"}</h3>
            <form onSubmit={handleSave}>
              <div className="admin-form-grid">
                <div className="form-group">
                  <label>Titre *</label>
                  <input required {...f("title")} />
                </div>
                <div className="form-group">
                  <label>Année</label>
                  <input type="number" {...f("year")} />
                </div>
                <div className="form-group">
                  <label>Description (EN)</label>
                  <textarea rows={3} {...f("description_en")} />
                </div>
                <div className="form-group">
                  <label>Description (FR)</label>
                  <textarea rows={3} {...f("description_fr")} />
                </div>
                <div className="form-group full-width">
                  <label>URL de la pochette</label>
                  <input type="text" placeholder="https://..." {...f("cover_url")} />
                </div>
                <div className="form-group full-width">
                  <label>Lien d'écoute (Apple Music, Spotify…)</label>
                  <input type="text" placeholder="https://..." {...f("listen_url")} />
                </div>
                <div className="form-group">
                  <label>Ordre</label>
                  <input type="number" {...f("order")} />
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
