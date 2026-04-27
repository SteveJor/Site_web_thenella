import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "Identifiants incorrects");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-box">
        <a href="/" className="logo">
          THEN<span>ELLA</span>
        </a>
        <h2>Espace Administration</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Identifiant</label>
            <input
              type="text"
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="Nom d'utilisateur ou email"
            />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="form-error" style={{ marginBottom: 16 }}>
              <i className="fas fa-exclamation-circle" style={{ marginRight: 8 }} />
              {error}
            </div>
          )}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin" style={{ marginRight: 8 }} />
                Connexion…
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt" style={{ marginRight: 8 }} />
                Se connecter
              </>
            )}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 24, fontSize: "0.85rem", color: "var(--text-light)" }}>
          <a href="/" style={{ color: "var(--primary)", textDecoration: "none" }}>
            ← Retour au site
          </a>
        </p>
      </div>
    </div>
  );
}
