import { useMemo, useState } from "react";
import { Search, Filter, Users, ShieldCheck, Clock3, AlertCircle, Eye, CheckCircle2, X, Building2 } from "lucide-react";
import "./HRNurseDirectory.css";
import useHRDirectory from "../../hooks/useHRDirectory";
import { confirmEmployment } from "../../apiService";

function formatDate(date) { return date ? new Date(`${date}T00:00:00`).toLocaleDateString("en-GB") : "Not recorded"; }
function HRNurseDirectory() {
  const { nurses, employers, loading, error, setNurses, token } = useHRDirectory();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [pending, setPending] = useState(null);
  const [actionError, setActionError] = useState("");
  const filtered = useMemo(() => nurses.filter((n) => (!search || `${n.name} ${n.nannmId}`.toLowerCase().includes(search.toLowerCase())) && (statusFilter === "All" || n.licenceStatus === statusFilter)), [nurses, search, statusFilter]);
  async function confirm() {
    if (!pending) return;
    try {
      const updated = await confirmEmployment(pending.id, token);
      setNurses((current) => current.map((n) => n.id === updated.id ? { ...n, employment: "Confirmed", employment_confirmed: true } : n));
      setSelected((current) => current?.id === updated.id ? { ...current, employment: "Confirmed" } : current);
      setPending(null); setActionError("");
    } catch (err) { setActionError(err.message); }
  }
  const count = (status) => nurses.filter((n) => n.licenceStatus === status).length;
  return <section className="hr-directory"><header className="hr-directory-heading"><div><span className="hr-dashboard-eyebrow">HOSPITAL ADMINISTRATION</span><h1>Nurse Directory</h1><p>Records are restricted to nurses associated with your employer.</p></div><div className="hr-directory-hospital"><Building2 size={18} /><span>{employers.map((e) => e.name).join(", ") || "Employer Workspace"}</span></div></header>
    {error && <p role="alert">{error}</p>}{actionError && <p role="alert">{actionError}</p>}
    <div className="hr-directory-summary">{[["Total Nurses", nurses.length, Users, "blue"], ["Active Licences", count("Active"), ShieldCheck, "green"], ["Expiring Soon", count("Expiring Soon"), Clock3, "orange"], ["Expired", count("Expired"), AlertCircle, "red"]].map(([title, value, Icon, color]) => <article className="hr-directory-summary-card" key={title}><div className={`hr-directory-summary-icon ${color}`}><Icon size={21} /></div><div><strong>{value}</strong><span>{title}</span></div></article>)}</div>
    <div className="hr-directory-panel"><div className="hr-directory-panel-heading"><div><h2>Registered Nurses</h2><p>{filtered.length} of {nurses.length} records</p></div></div>
      <div className="hr-directory-toolbar"><div className="hr-directory-search"><Search size={18} /><input type="search" placeholder="Search nurse name or NANNM ID" value={search} onChange={(e) => setSearch(e.target.value)} /></div><div className="hr-directory-filter-label"><Filter size={17} /><span>Filter</span></div><select aria-label="Filter by licence status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option>All</option>{["Active", "Expiring Soon", "Expired", "Pending", "Rejected", "Suspended", "Revoked", "Flagged"].map((s) => <option key={s}>{s}</option>)}</select></div>
      {loading ? <p>Loading employer records…</p> : <div className="hr-directory-table-wrapper"><table className="hr-directory-table"><thead><tr><th>Nurse</th><th>NANNM ID</th><th>Ward</th><th>Licence Status</th><th>Expiry Date</th><th>Employment</th><th>Action</th></tr></thead><tbody>{filtered.map((n) => <tr key={n.id}><td><div className="hr-directory-nurse-cell"><div className="hr-directory-avatar">{n.initials}</div><div><strong>{n.name}</strong><span>{n.cadre}</span></div></div></td><td>{n.nanm_id || "Pending"}</td><td>{n.ward || "—"}</td><td>{n.licenceStatus}</td><td>{formatDate(n.expiry)}</td><td>{n.employment}</td><td><button type="button" onClick={() => setSelected(n)}><Eye size={16} /> View</button></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="hr-directory-empty"><Users size={30} /><strong>{nurses.length ? "No matching nurses" : "No nurses associated with your employer"}</strong></div>}</div>}
    </div>
    {selected && <div className="hr-directory-modal-overlay" role="presentation" onClick={() => setSelected(null)}><section className="hr-directory-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}><div className="hr-directory-modal-heading"><div><span className="hr-dashboard-eyebrow">NURSE RECORD</span><h2>{selected.name}</h2></div><button type="button" aria-label="Close details" onClick={() => setSelected(null)}><X size={20} /></button></div><p>{selected.nanm_id || "NANNM ID pending"} · {selected.cadre || "Cadre not recorded"}</p><p>Employer: {selected.employer}</p><p>Ward: {selected.ward || "Not recorded"} · Specialty: {selected.specialty || "Not recorded"}</p><p>Licence: {selected.licenceStatus} · Expiry: {formatDate(selected.expiry)}</p><p>Employment: {selected.employment}</p>{selected.employment === "Pending" && <button type="button" onClick={() => setPending(selected)}><CheckCircle2 size={17} /> Confirm Employment</button>}</section></div>}
    {pending && <div className="hr-directory-modal-overlay"><section className="hr-directory-confirm-dialog" role="alertdialog" aria-modal="true"><h2>Confirm Employment?</h2><p>Confirm that <strong>{pending.name}</strong> currently works for your employer.</p><div className="hr-directory-confirm-actions"><button type="button" onClick={() => setPending(null)}>Cancel</button><button type="button" onClick={confirm}>Confirm Employment</button></div></section></div>}
  </section>;
}
export default HRNurseDirectory;
