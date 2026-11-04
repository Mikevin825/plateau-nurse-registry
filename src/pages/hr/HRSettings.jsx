import { useEffect, useState } from "react";
import { getCurrentUser, changePassword } from "../../apiService";
import "./HRSettings.css";

export default function HRSettings() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [passwords, setPasswords] = useState({ current_password: "", new_password: "", confirm: "" });
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => { let active = true; getCurrentUser(token).then(value => { if (active) setUser(value); }).catch(error => { if (active) setNotice(error.message); }); return () => { active = false; }; }, [token]);
  async function submit(event) {
    event.preventDefault(); setNotice("");
    if (passwords.new_password !== passwords.confirm) { setNotice("New passwords do not match."); return; }
    setBusy(true);
    try { const result = await changePassword({ current_password: passwords.current_password, new_password: passwords.new_password }, token); setNotice(result.detail || "Password updated."); setPasswords({ current_password: "", new_password: "", confirm: "" }); }
    catch (error) { setNotice(error.message || "Password could not be updated."); }
    finally { setBusy(false); }
  }
  const employers = user?.employers || [];
  return <div className="hr-settings-page"><header className="hr-settings-header"><div><span className="hr-settings-eyebrow">ACCOUNT MANAGEMENT</span><h1>Settings</h1><p>Review your registry account and update its password.</p></div></header>
    {notice && <p className="hr-settings-notice" role="status">{notice}</p>}
    <section className="hr-settings-card"><div className="hr-settings-card-heading"><div><h2>HR account</h2><p>Account and assigned employer details from the registry.</p></div></div>
      {user ? <div className="hr-settings-information-grid"><div className="hr-settings-information-item"><span>Account name</span><strong>{[user.first_name, user.last_name].filter(Boolean).join(" ") || "Name not recorded"}</strong></div><div className="hr-settings-information-item"><span>Email</span><strong>{user.email}</strong></div><div className="hr-settings-information-item"><span>Role</span><strong>{user.role}</strong></div>{employers.map(employer => <div className="hr-settings-information-item" key={employer.id}><span>Assigned institution</span><strong>{employer.name}{employer.lga ? ` · ${employer.lga}` : ""}</strong></div>)}</div> : <p role="status">Loading account details…</p>}
      <p className="hr-settings-readonly">Employer assignments and account permissions are managed by the registry.</p>
    </section>
    <section className="hr-settings-card"><div className="hr-settings-card-heading"><div><h2>Account security</h2><p>Change the password used to sign in.</p></div></div><form className="hr-settings-password-form" onSubmit={submit}>
      <label><span>Current password</span><input type="password" autoComplete="current-password" required value={passwords.current_password} onChange={e => setPasswords(p => ({ ...p, current_password: e.target.value }))} /></label>
      <label><span>New password</span><input type="password" autoComplete="new-password" minLength={8} required value={passwords.new_password} onChange={e => setPasswords(p => ({ ...p, new_password: e.target.value }))} /></label>
      <label><span>Confirm new password</span><input type="password" autoComplete="new-password" minLength={8} required value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} /></label>
      <button type="submit" disabled={busy}>{busy ? "Updating…" : "Update password"}</button>
    </form></section>
  </div>;
}
