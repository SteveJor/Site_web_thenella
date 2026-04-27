import { useEffect, useState } from "react";
import { socialMediaApi } from "../../services/api";

const PLATFORMS = ["youtube","tiktok","facebook","instagram"];
const PLATFORM_ICON: Record<string, string> = {
  youtube:"fab fa-youtube", tiktok:"fab fa-tiktok", facebook:"fab fa-facebook", instagram:"fab fa-instagram",
};
const PLATFORM_COLOR: Record<string, string> = {
  youtube:"#FF0000", tiktok:"#000", facebook:"#1877F2", instagram:"#E4405F",
};
const EMPTY_LINK = { label_en: "", label_fr: "", url: "", icon: "fas fa-link" };

export default function AdminSocial() {
  const [items, setItems] = useState<any[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<any>({ platform: "youtube", description_en: "", description_fr: "", links: [{ ...EMPTY_LINK }] });
  const [saving, setSaving] = useState(false);

  const load = () => socialMediaApi.getAll().then(setItems).catch(() => {});
  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ platform: "youtube", description_en: "", description_fr: "", links: [{ ...EMPTY_LINK }] });
    setModal(true);
  };
  const openEdit = (item: any) => {
    setEditing(item);
    setForm({ platform: item.platform, description_en: item.description_en, description_fr: item.description_fr,
      links: item.links.length ? item.links.map((l: any) => ({ ...l })) : [{ ...EMPTY_LINK }] });
    setModal(true);
  };

  const setLink = (i: number, field: string, val: string) => {
    const links = [...form.links];
    links[i] = { ...links[i], [field]: val };
    setForm({ ...form, links });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) await socialMediaApi.update(editing.id, form);
      else await socialMediaApi.create(form);
      await load();
      setModal(false);
    } catch {} finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce réseau ?")) return;
    await socialMediaApi.delete(id);
    await load();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
        <button className="btn" onClick={openNew}>
          <i className="fas fa-plus" style={{ marginRight: 8 }} />Ajouter un réseau
        </button>
      </div>

      {/* Même style que les account-card du site */}
      <div className="accounts-grid">
        {items.map((item) => (
          <div className="account-card" key={item.id}>
            <div className="account-icon">
              <i className={PLATFORM_ICON[item.platform] || "fas fa-share-alt"} style={{ color: PLATFORM_COLOR[item.platform] }} />
            </div>
            <h3 style={{ textTransform: "capitalize" }}>{item.platform}</h3>
            <p>{item.description_fr || item.description_en}</p>
            <ul className="account-links">
              {item.links.map((l: any) => (
                <li key={l.id}>
                  <a href={l.url} target="_blank" rel="noreferrer">
                    <i className={`${l.icon} song-icon`} />
                    <span>{l.label_fr || l.label_en}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="admin-card-actions" style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #f0ebe4", display: "flex", gap: 10 }}>
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
            <h3>{editing ? "Modifier le réseau" : "Nouveau réseau social"}</h3>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Plateforme</label>
                <select
                  value={form.platform}
                  onChange={(e) => setForm({ ...form, platform: e.target.value })}
                  disabled={!!editing}
                >
                  {PLATFORMS.map((p) => (
                    <option key={p} value={p} style={{ textTransform: "capitalize" }}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="admin-form-grid">
                <div className="form-group">
                  <label>Description (EN)</label>
                  <textarea rows={2} value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Description (FR)</label>
                  <textarea rows={2} value={form.description_fr} onChange={(e) => setForm({ ...form, description_fr: e.target.value })} />
                </div>
              </div>

              <h4 style={{ fontFamily: "'Playfair Display', serif", marginBottom: 12, color: "var(--dark)" }}>
                Liens ({form.links.length})
              </h4>
              {form.links.map((lk: any, i: number) => (
                <div key={i} style={{ background: "var(--light)", borderRadius: 8, padding: 14, marginBottom: 10 }}>
                  <div className="admin-form-grid">
                    <div className="form-group">
                      <label>Label EN</label>
                      <input type="text" value={lk.label_en} onChange={(e) => setLink(i, "label_en", e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Label FR</label>
                      <input type="text" value={lk.label_fr} onChange={(e) => setLink(i, "label_fr", e.target.value)} />
                    </div>
                    <div className="form-group full-width">
                      <label>URL</label>
                      <input type="text" value={lk.url} onChange={(e) => setLink(i, "url", e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Icône FA</label>
                      <input type="text" value={lk.icon} onChange={(e) => setLink(i, "icon", e.target.value)} placeholder="fas fa-link" />
                    </div>
                    <div className="form-group" style={{ display: "flex", alignItems: "flex-end" }}>
                      {form.links.length > 1 && (
                        <button type="button" className="btn-delete" style={{ height: 42 }}
                          onClick={() => setForm({ ...form, links: form.links.filter((_: any, j: number) => j !== i) })}>
                          <i className="fas fa-trash" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn-outline" style={{ fontSize: "0.85rem", marginBottom: 16 }}
                onClick={() => setForm({ ...form, links: [...form.links, { ...EMPTY_LINK }] })}>
                <i className="fas fa-plus" style={{ marginRight: 6 }} />Ajouter un lien
              </button>

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
