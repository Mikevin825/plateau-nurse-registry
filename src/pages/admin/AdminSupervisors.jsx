import { useEffect, useState } from "react";
import { Pencil, Search, ShieldPlus, Trash2, UserRoundPlus, X } from "lucide-react";
import { createAdminSupervisor, deleteAdminSupervisor, getAdminSupervisors, updateAdminSupervisor } from "../../apiService";
import "./AdminRecords.css";

export default function AdminSupervisors() {
  const token = localStorage.getItem("token");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const visibleRows = rows.filter((row) => `${row.first_name} ${row.last_name} ${row.email}`.toLowerCase().includes(search.trim().toLowerCase()));
  async function refresh() {
    try { setRows(await getAdminSupervisors(token)); setError(""); }
    catch (err) { setError(err.message); }
  }
  useEffect(() => {
    let active = true;
    getAdminSupervisors(token).then((data) => { if (active) setRows(data); })
      .catch((err) => { if (active) setError(err.message); });
    return () => { active = false; };
  }, [token]);
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError(""); setSuccess("");
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    try {
      await createAdminSupervisor(values, token);
      setSuccess(`Supervisor account created for ${values.email}. Share the temporary password securely.`);
      form.reset(); await refresh();
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  async function saveEdit(event) {
    event.preventDefault(); const values = Object.fromEntries(new FormData(event.currentTarget)); setBusy(true); setError("");
    try { await updateAdminSupervisor(selected.id, values, token); setSelected(null); await refresh(); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  async function remove(user) {
    if (!window.confirm(`Remove supervisor access for ${user.email}?`)) return;
    setBusy(true); setError("");
    try { await deleteAdminSupervisor(user.id, token); await refresh(); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <section className="admin-records"><header className="admin-records-heading"><div><span className="admin-eyebrow">STAFF ACCESS</span><h1>Supervisors</h1><p>Create and manage registry reviewers. Supervisors can review nurse and hospital HR registrations.</p></div></header>
    {error && <p className="admin-records-error" role="alert">{error}</p>}{success && <p className="admin-records-success" role="status">{success}</p>}
    <div className="admin-supervisor-grid"><section className="admin-records-panel"><h2><UserRoundPlus size={20} /> Add a supervisor</h2><p>Create a staff login using their work email and a temporary password.</p><form className="admin-record-edit-form" onSubmit={submit}><label>First name<input name="first_name" autoComplete="given-name" required /></label><label>Last name<input name="last_name" autoComplete="family-name" required /></label><label>Work email<input name="email" type="email" autoComplete="email" required /></label><label>Temporary password<input name="password" type="password" autoComplete="new-password" minLength="12" required /><small>At least 12 characters. Share it with the staff member through a secure channel.</small></label><button className="admin-records-button primary" disabled={busy}><ShieldPlus size={16} />{busy ? "Creating…" : "Create supervisor"}</button></form></section>
      <section className="admin-records-panel"><h2>Supervisor accounts <span className="admin-record-count-pill">{visibleRows.length}</span></h2><label className="admin-records-search admin-supervisor-search"><Search size={18} /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name or email" aria-label="Search supervisors" /></label>{visibleRows.length ? <ul className="admin-supervisor-list">{visibleRows.map((row) => <li key={row.id}><div><strong>{row.first_name} {row.last_name}</strong><span>{row.email}</span></div><span className={`admin-status-chip ${row.is_active ? "approved" : "suspended"}`}>{row.is_active ? "active" : "disabled"}</span><div className="admin-record-actions"><button type="button" className="admin-records-button secondary" onClick={() => setSelected(row)}><Pencil size={14} /> Edit</button><button type="button" className="admin-records-button danger" disabled={busy} onClick={() => remove(row)}><Trash2 size={14} /> Remove</button></div></li>)}</ul> : <p className="admin-records-empty">{rows.length ? "No supervisors match that search." : "No supervisors have been added yet."}</p>}</section></div>
    {selected && <div className="admin-record-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><section className="admin-record-modal" role="dialog" aria-modal="true" aria-labelledby="supervisor-edit-title"><header><div><span className="admin-eyebrow">STAFF ACCESS</span><h2 id="supervisor-edit-title">Edit supervisor</h2></div><button className="admin-records-icon-button" type="button" aria-label="Close" onClick={() => setSelected(null)}><X /></button></header><form className="admin-record-edit-form" onSubmit={saveEdit}><label>First name<input name="first_name" defaultValue={selected.first_name} required /></label><label>Last name<input name="last_name" defaultValue={selected.last_name} required /></label><label>Email<input name="email" type="email" defaultValue={selected.email} required /></label><label>Account access<select name="is_active" defaultValue={String(selected.is_active)}><option value="true">Enabled</option><option value="false">Disabled</option></select></label><label>Reset password (optional)<input name="password" type="password" minLength="12" autoComplete="new-password" /></label><footer><button className="admin-records-button secondary" type="button" onClick={() => setSelected(null)}>Cancel</button><button className="admin-records-button primary" disabled={busy}>{busy ? "Saving…" : "Save changes"}</button></footer></form></section></div>}
  </section>;
}
