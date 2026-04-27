import { useEffect, useState } from "react";
import { galleryApi } from "../../services/api";

const EMPTY = { image_url: "", caption_en: "", caption_fr: "", order: 0 };
const FALLBACK = "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600";

export default function AdminGallery() {
  const [items, setItems] = useState<any[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<any>(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = () => galleryApi.getAll().then(setItems).catch(() => {});
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
      if (editing) await galleryApi.update(editing.id, form);
      else await galleryApi.create(form);
      await load();
      setModal(false);
    } catch {} finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette image ?")) return;
    await galleryApi.delete(id);
    await load();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
        <button className="btn" onClick={openNew}>
          <i className="fas fa-plus" style={{ marginRight: 8 }} />Ajouter une photo
        </button>
      </div>

      {/* Grille style gallery du site */}
      <div className="admin-cards-grid">
        {items.map((item) => (
          <div className="admin-card" key={item.id}>
            <div className="admin-card-img">
              <img
                src={item.image_url || FALLBACK}
                alt={item.caption_fr || item.caption_en}
                onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
              />
            </div>
            <div className="admin-card-body">
              <h3>{item.caption_fr || item.caption_en || "Sans titre"}</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>
                EN: {item.caption_en || "—"}
              </p>
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
            <h3>{editing ? "Modifier la photo" : "Ajouter une photo"}</h3>
            {form.image_url && (
              <img
                src={form.image_url}
                alt="preview"
                style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 8, marginBottom: 16 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            )}
            <form onSubmit={handleSave}>
              <div className="admin-form-grid">
                <div className="form-group full-width">
                  <label>URL de l'image *</label>
                  <input required type="text" placeholder="https://..." {...f("image_url")} />
                </div>
                <div className="form-group">
                  <label>Légende (EN)</label>
                  <input type="text" {...f("caption_en")} />
                </div>
                <div className="form-group">
                  <label>Légende (FR)</label>
                  <input type="text" {...f("caption_fr")} />
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
