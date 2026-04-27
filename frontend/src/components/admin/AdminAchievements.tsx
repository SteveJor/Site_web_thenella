import { useEffect, useState } from "react";
import { achievementsApi } from "../../services/api";

const ICONS = [
  "fas fa-trophy","fas fa-music","fas fa-hands-praying","fas fa-record-vinyl",
  "fas fa-star","fas fa-award","fas fa-heart","fas fa-cross","fas fa-church",
];

const EMPTY = { icon: "fas fa-trophy", title_en: "", title_fr: "", description_en: "", description_fr: "", order: 0 };

export default function AdminAchievements() {
  const [items, setItems] = useState<any[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<any>(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = () => achievementsApi.getAll().then(setItems).catch(() => {});

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
      if (editing) await achievementsApi.update(editing.id, form);
      else await achievementsApi.create(form);
      await load();
      setModal(false);
    } catch {} finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette réalisation ?")) return;
    await achievementsApi.delete(id);
    await load();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
        <div />
        <button className="btn" onClick={openNew}>
          <i className="fas fa-plus" style={{ marginRight: 8 }} />Ajouter
        </button>
      </div>

      <div className="admin-cards-grid">
        {items.map((item) => (
          <div className="admin-card" key={item.id}>
            <div className="admin-card-body">
              <div className="admin-card-icon"><i className={item.icon} /></div>
              <h3>{item.title_fr || item.title_en}</h3>
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
            <h3>{editing ? "Modifier la réalisation" : "Nouvelle réalisation"}</h3>
            <form onSubmit={handleSave}>
              <div className="admin-form-grid">
                <div className="form-group full-width">
                  <label>Icône Font Awesome</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                    {ICONS.map((ic) => (
                      <button
                        type="button"
                        key={ic}
                        onClick={() => setForm({ ...form, icon: ic })}
                        style={{
                          padding: "8px 12px", borderRadius: 8, border: "2px solid",
                          borderColor: form.icon === ic ? "var(--secondary)" : "#ddd",
                          background: form.icon === ic ? "rgba(218,165,32,0.1)" : "transparent",
                          cursor: "pointer", fontSize: "1.2rem",
                        }}
                      >
                        <i className={ic} style={{ color: "var(--secondary)" }} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Titre (EN) *</label>
                  <input required {...f("title_en")} />
                </div>
                <div className="form-group">
                  <label>Titre (FR)</label>
                  <input {...f("title_fr")} />
                </div>
                <div className="form-group">
                  <label>Description (EN)</label>
                  <textarea rows={3} {...f("description_en")} />
                </div>
                <div className="form-group">
                  <label>Description (FR)</label>
                  <textarea rows={3} {...f("description_fr")} />
                </div>
                <div className="form-group">
                  <label>Ordre d'affichage</label>
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
