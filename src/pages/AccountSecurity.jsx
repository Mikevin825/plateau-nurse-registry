import { useState } from "react";
import { Link } from "react-router-dom";
import { changePassword } from "../apiService";
import "./AccountSecurity.css";
export default function AccountSecurity() {
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({ current_password: "", new_password: "", confirm: "" });
  const [notice, setNotice] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(e) { e.preventDefault(); setNotice(""); if (form.new_password !== form.confirm) { setNotice("New passwords do not match."); return; } setBusy(true); try { const result = await changePassword({ current_password: form.current_password, new_password: form.new_password }, token); setNotice(result.detail); setForm({ current_password: "", new_password: "", confirm: "" }); } catch (error) { setNotice(error.message); } finally { setBusy(false); } }
  return <main className="account-security"><Link to="/">Nurse Registry</Link><h1>Account security</h1><p>Change your password for this registry account.</p>{notice && <p role="status">{notice}</p>}<form onSubmit={submit}><label>Current password<input type="password" autoComplete="current-password" required value={form.current_password} onChange={e => setForm(v => ({ ...v, current_password: e.target.value }))} /></label><label>New password<input type="password" minLength={8} autoComplete="new-password" required value={form.new_password} onChange={e => setForm(v => ({ ...v, new_password: e.target.value }))} /></label><label>Confirm new password<input type="password" minLength={8} autoComplete="new-password" required value={form.confirm} onChange={e => setForm(v => ({ ...v, confirm: e.target.value }))} /></label><button disabled={busy}>{busy ? "Updating…" : "Update password"}</button></form></main>;
}
