import { useEffect, useState } from "react";
import { contactApi } from "../../services/api";

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [selected, setSelected] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const is_read = filter === "all" ? undefined : filter === "read";
      const data = await contactApi.getAll(is_read);
      setMessages(data);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [filter]);

  const handleRead = async (msg: any) => {
    if (!msg.is_read) {
      await contactApi.markRead(msg.id);
      await load();
    }
    setSelected(msg);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce message ?")) return;
    await contactApi.delete(id);
    if (selected?.id === id) setSelected(null);
    await load();
  };

  const EVENT_LABELS: Record<string, string> = {
    concert: "Concert", "church-service": "Culte d'Église",
    conference: "Conférence", wedding: "Mariage", other: "Autre",
  };

  return (
    <div>
      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {["all","unread","read"].map((f) => (
          <button
            key={f}
            className={`btn ${filter === f ? "" : "btn-outline"}`}
            style={{ fontSize: "0.85rem", padding: "8px 18px" }}
            onClick={() => setFilter(f as any)}
          >
            {f === "all" ? "Tous" : f === "unread" ? "Non lus" : "Lus"}
          </button>
        ))}
        <span style={{ marginLeft: "auto", color: "var(--text-light)", alignSelf: "center", fontSize: "0.9rem" }}>
          {messages.length} message{messages.length !== 1 ? "s" : ""}
        </span>
      </div>

      {loading ? (
        <div className="loading-spinner"><div className="spinner" /></div>
      ) : messages.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", color: "var(--text-light)" }}>
          <i className="fas fa-inbox" style={{ fontSize: "3rem", marginBottom: 16, display: "block" }} />
          Aucun message
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1fr" : "1fr", gap: 24 }}>
          {/* Table */}
          <div>
            <div style={{ overflowX: "auto" }}>
              <table className="messages-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Événement</th>
                    <th>Date</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr
                      key={msg.id}
                      className={!msg.is_read ? "unread" : ""}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRead(msg)}
                    >
                      <td>
                        {!msg.is_read && (
                          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "var(--primary)", marginRight: 8 }} />
                        )}
                        {msg.name}
                      </td>
                      <td>{msg.email}</td>
                      <td>{EVENT_LABELS[msg.event_type] || msg.event_type || "—"}</td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        {new Date(msg.created_at).toLocaleDateString("fr-FR")}
                      </td>
                      <td>
                        <span className={msg.is_read ? "badge-read" : "badge-unread"}>
                          {msg.is_read ? "Lu" : "Non lu"}
                        </span>
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <button className="btn-delete" style={{ padding: "4px 12px" }} onClick={() => handleDelete(msg.id)}>
                          <i className="fas fa-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="admin-form-card" style={{ margin: 0, position: "sticky", top: 90, maxHeight: "calc(100vh - 130px)", overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <h2 style={{ border: "none", padding: 0, margin: 0, fontSize: "1.2rem" }}>Détail du message</h2>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer", color: "var(--text-light)" }}>
                  <i className="fas fa-times" />
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  ["fas fa-user",     "Nom",          selected.name],
                  ["fas fa-envelope", "Email",        selected.email],
                  ["fas fa-phone",    "Téléphone",    selected.phone || "—"],
                  ["fas fa-calendar", "Événement",    EVENT_LABELS[selected.event_type] || selected.event_type || "—"],
                  ["fas fa-clock",    "Date",         new Date(selected.created_at).toLocaleString("fr-FR")],
                ].map(([icon, label, value]) => (
                  <div key={label} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <i className={icon as string} style={{ color: "var(--secondary)", marginTop: 3, width: 16, textAlign: "center" }} />
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-light)", textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
                      <div style={{ color: "var(--dark)", fontWeight: 500 }}>{value}</div>
                    </div>
                  </div>
                ))}

                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-light)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
                    <i className="fas fa-comment" style={{ color: "var(--secondary)", marginRight: 8 }} />
                    Message
                  </div>
                  <div style={{ background: "var(--light)", borderRadius: 8, padding: 16, color: "var(--text)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                    {selected.message || "—"}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                  <a href={`mailto:${selected.email}`} className="btn" style={{ flex: 1, textAlign: "center" }}>
                    <i className="fas fa-reply" style={{ marginRight: 8 }} />Répondre
                  </a>
                  <button className="btn-delete" style={{ flex: 1 }} onClick={() => handleDelete(selected.id)}>
                    <i className="fas fa-trash" style={{ marginRight: 8 }} />Supprimer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
