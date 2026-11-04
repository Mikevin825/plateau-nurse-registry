import { useMemo, useState } from "react";
import { Search, Filter, ShieldCheck, Clock3, AlertCircle, Ban, Building2, Info } from "lucide-react";
import "./HRLicenceMonitoring.css";
import useHRDirectory from "../../hooks/useHRDirectory";

function HRLicenceMonitoring() {
  const { nurses, employers, loading, error } = useHRDirectory();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const filtered = useMemo(() => nurses.filter((n) => (!search || `${n.name} ${n.nannmId}`.toLowerCase().includes(search.toLowerCase())) && (statusFilter === "All" || n.licenceStatus === statusFilter)), [nurses, search, statusFilter]);
  const count = (status) => nurses.filter((n) => n.licenceStatus === status).length;
  return <section className="hr-licence-page"><header className="hr-licence-heading"><div><span className="hr-dashboard-eyebrow">HOSPITAL ADMINISTRATION</span><h1>Licence Monitoring</h1><p>Monitor licensing health and expiry warnings for nurses associated with your employer.</p></div><div className="hr-licence-workspace"><Building2 size={19} /><span>{employers.map((e) => e.name).join(", ") || "Employer Workspace"}</span></div></header>
    <div className="hr-licence-notice"><Info size={21} /><p>Licence approvals and regulatory decisions remain with registry reviewers.</p></div>{error && <p role="alert">{error}</p>}
    <div className="hr-licence-summary">{[["Active", count("Active"), ShieldCheck], ["Expiring Soon", count("Expiring Soon"), Clock3], ["Expired", count("Expired"), AlertCircle], ["Suspended", count("Suspended"), Ban]].map(([title, value, Icon]) => <article className="hr-licence-summary-card" key={title}><div className="hr-licence-summary-icon"><Icon size={23} /></div><div><strong>{value}</strong><span>{title}</span></div></article>)}</div>
    <section className="hr-licence-panel"><div className="hr-licence-panel-heading"><div><h2>Employer Licence Register</h2><p>Showing {filtered.length} of {nurses.length} records</p></div></div><div className="hr-licence-toolbar"><label className="hr-licence-search"><Search size={20} /><input type="search" placeholder="Search nurse or NANNM ID" value={search} onChange={(e) => setSearch(e.target.value)} /></label><div className="hr-licence-filter-label"><Filter size={19} /><span>Filter records</span></div><select aria-label="Filter licence status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option>All</option>{["Active", "Expiring Soon", "Expired", "Pending", "Rejected", "Suspended", "Revoked", "Flagged"].map((s) => <option key={s}>{s}</option>)}</select></div>
      {loading ? <p>Loading employer records…</p> : <div className="hr-licence-table-wrapper"><table className="hr-licence-table"><thead><tr><th>Nurse</th><th>NANNM ID</th><th>Ward</th><th>Cadre</th><th>Licence Status</th><th>Expiry</th></tr></thead><tbody>{filtered.map((n) => <tr key={n.id}><td>{n.name}</td><td>{n.nanm_id || "Pending"}</td><td>{n.ward || "—"}</td><td>{n.cadre || "—"}</td><td>{n.licenceStatus}</td><td>{n.expiry ? new Date(`${n.expiry}T00:00:00`).toLocaleDateString("en-GB") : "Not recorded"}</td></tr>)}</tbody></table>{filtered.length === 0 && <p>No licence records match these filters.</p>}</div>}
    </section>
  </section>;
}
export default HRLicenceMonitoring;
