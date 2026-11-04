import { useEffect, useState } from "react";
import { Building2, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { createAdminHRUser, deleteAdminHRUser, getAdminHRUsers, getCurrentUser, updateAdminHRUser } from "../../apiService";
import "./AdminRecords.css";
import HRRegistrationReview from "./HRRegistrationReview";

export default function AdminHRUsers() {
  const token = localStorage.getItem("token");
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState(() => new URLSearchParams(window.location.search).get("tab") === "review" ? "requests" : "accounts");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function refresh(term = search) {
    try { setRows(await getAdminHRUsers(token, term)); setError(""); }
    catch (err) { setError(err.message); }
  }
  useEffect(() => {
    let active = true;
    getCurrentUser(token).then((user) => {
      if (!active) return;
      const admin = user.role === "super_admin";
      setIsAdmin(admin);
      if (!admin) { setActiveTab("requests"); return; }
      getAdminHRUsers(token, "").then((data) => { if (active) setRows(data); })
        .catch((err) => { if (active) setError(err.message); });
    }).catch((err) => { if (active) setError(err.message); });
    return () => { active = false; };
  }, [token]);
  async function save(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const employer = selected.employers[0] || {};
    setBusy(true);
    try {
      const values = {
        id: selected.id, email: form.get("email"), first_name: form.get("first_name"),
        last_name: form.get("last_name"), is_active: form.get("is_active") === "true",
        password: form.get("password"),
        employer: { id: employer.id, name: form.get("hospital_name"), type: form.get("type"),
          lga: form.get("lga"), contact_email: form.get("contact_email"), approved: form.get("approved") === "true" },
      };
      await updateAdminHRUser(values, token);
      setSelected(null); await refresh();
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  async function addAccount(event) {
    event.preventDefault(); const form = new FormData(event.currentTarget); setBusy(true); setError("");
    try {
      await createAdminHRUser({ email: form.get("email"), password: form.get("password"), first_name: form.get("first_name"), last_name: form.get("last_name"), employer: { name: form.get("hospital_name"), type: form.get("type"), lga: form.get("lga"), contact_email: form.get("contact_email"), approved: true } }, token);
      setIsAdding(false); await refresh(""); setSearch("");
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  async function remove(row) {
    if (!window.confirm(`Delete ${row.email}'s hospital HR account? Their login will be removed.`)) return;
    setBusy(true); setError("");
    try { await deleteAdminHRUser(row.id, token); await refresh(); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <section className="admin-records"><header className="admin-records-heading"><div><span className="admin-eyebrow">ACCOUNT MANAGEMENT</span><h1>Hospital HR</h1><p>Manage hospital staff accounts and review new requests for institutional access.</p></div>{isAdmin && activeTab === "accounts" && <button className="admin-records-button primary" type="button" onClick={() => setIsAdding((value) => !value)}><Plus size={16} /> Add HR account</button>}</header>
    <nav className="admin-record-tabs" aria-label="Hospital HR sections">{isAdmin && <button type="button" className={activeTab === "accounts" ? "active" : ""} aria-current={activeTab === "accounts" ? "page" : undefined} onClick={() => setActiveTab("accounts")}>HR accounts <span>{rows.length}</span></button>}<button type="button" className={activeTab === "requests" ? "active" : ""} aria-current={activeTab === "requests" ? "page" : undefined} onClick={() => setActiveTab("requests")}>Registration review</button></nav>
    {activeTab === "requests" ? <HRRegistrationReview embedded /> : <>
    {error && <p className="admin-records-error" role="alert">{error}</p>}
    {isAdding && <section className="admin-records-panel"><h2>Create a hospital HR account</h2><form className="admin-record-edit-form admin-hr-create-form" onSubmit={addAccount}><label>First name<input name="first_name" required /></label><label>Last name<input name="last_name" required /></label><label>Work email<input name="email" type="email" required /></label><label>Temporary password<input name="password" type="password" minLength="12" required /></label><label>Hospital name<input name="hospital_name" required /></label><label>Institution type<select name="type"><option value="hospital">Hospital</option><option value="primary_health_centre">Primary health centre</option><option value="clinic">Clinic</option><option value="other">Other</option></select></label><label>LGA<input name="lga" required /></label><label>Contact email<input name="contact_email" type="email" /></label><footer><button className="admin-records-button secondary" type="button" onClick={() => setIsAdding(false)}>Cancel</button><button className="admin-records-button primary" disabled={busy}>{busy ? "Creating…" : "Create account"}</button></footer></form></section>}
    <form className="admin-records-toolbar" onSubmit={(event) => { event.preventDefault(); refresh(search.trim()); }}><label className="admin-records-search"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search staff email or hospital" aria-label="Search HR accounts" /></label><button className="admin-records-button primary"><Search size={16} /> Search</button></form>
    <div className="admin-records-panel">{rows.length ? <div className="admin-records-table-wrap"><table className="admin-records-table"><thead><tr><th>HR user</th><th>Hospital</th><th>Location</th><th>Account</th><th>Actions</th></tr></thead><tbody>{rows.map((row) => { const employer = row.employers[0]; return <tr key={row.id}><td><strong>{row.first_name} {row.last_name}</strong><small>{row.email}</small></td><td><span className="admin-record-with-icon"><Building2 size={16} />{employer?.name || "No institution"}</span><small>{employer?.type || ""}</small></td><td>{employer?.lga || "—"}<small>{employer?.contact_email || "No contact email"}</small></td><td><span className={`admin-status-chip ${row.is_active && employer?.approved ? "approved" : "pending"}`}>{!row.is_active ? "disabled" : employer?.approved ? "active" : "institution unapproved"}</span></td><td className="admin-record-actions"><button className="admin-records-button secondary" onClick={() => setSelected(row)}><Pencil size={15} /> Edit</button><button className="admin-records-button danger" disabled={busy} onClick={() => remove(row)}><Trash2 size={15} /> Delete</button></td></tr>; })}</tbody></table></div> : <p className="admin-records-empty">No hospital HR accounts found.</p>}</div>
    {selected && <div className="admin-record-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><section className="admin-record-modal" role="dialog" aria-modal="true" aria-labelledby="hr-edit-title"><header><div><span className="admin-eyebrow">HOSPITAL HR</span><h2 id="hr-edit-title">Edit account</h2><p>{selected.email}</p></div><button className="admin-records-icon-button" type="button" aria-label="Close editor" onClick={() => setSelected(null)}><X /></button></header>
      <form className="admin-record-edit-form" onSubmit={save}><label>First name<input name="first_name" defaultValue={selected.first_name} /></label><label>Last name<input name="last_name" defaultValue={selected.last_name} /></label><label>Email<input name="email" type="email" defaultValue={selected.email} required /></label><label>Hospital name<input name="hospital_name" defaultValue={selected.employers[0]?.name || ""} required /></label><label>Institution type<select name="type" defaultValue={selected.employers[0]?.type || "hospital"}><option value="hospital">Hospital</option><option value="primary_health_centre">Primary health centre</option><option value="clinic">Clinic</option><option value="other">Other</option></select></label><label>LGA<input name="lga" defaultValue={selected.employers[0]?.lga || ""} required /></label><label>Contact email<input name="contact_email" type="email" defaultValue={selected.employers[0]?.contact_email || ""} /></label><label>Account access<select name="is_active" defaultValue={String(selected.is_active)}><option value="true">Enabled</option><option value="false">Disabled</option></select></label><label>Institution status<select name="approved" defaultValue={String(selected.employers[0]?.approved || false)}><option value="true">Approved</option><option value="false">Unapproved</option></select></label><label>Reset password (optional)<input name="password" type="password" minLength="12" autoComplete="new-password" /></label><footer><button type="button" className="admin-records-button secondary" onClick={() => setSelected(null)}>Cancel</button><button className="admin-records-button primary" disabled={busy}>{busy ? "Saving…" : "Save changes"}</button></footer></form>
    </section></div>}
    </>}
  </section>;
}
