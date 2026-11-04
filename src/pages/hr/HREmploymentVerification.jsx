import { useState } from "react";
import { Search, Users, UserCheck, Clock3, Building2, CheckCircle2 } from "lucide-react";
import "./HREmploymentVerification.css";
import useHRDirectory from "../../hooks/useHRDirectory";
import { confirmEmployment } from "../../apiService";

function HREmploymentVerification() {
  const { nurses, employers, loading, error, setNurses, token } = useHRDirectory();
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState(null);
  const [message, setMessage] = useState("");
  const rows = nurses.filter((n) => (!search || `${n.name} ${n.nannmId}`.toLowerCase().includes(search.toLowerCase())));
  async function confirm(nurse) {
    setBusy(nurse.id); setMessage("");
    try {
      await confirmEmployment(nurse.id, token);
      setNurses((current) => current.map((item) => item.id === nurse.id ? { ...item, employment: "Confirmed" } : item));
      setMessage(`Employment confirmed for ${nurse.name}.`);
    } catch (err) { setMessage(err.message); }
    finally { setBusy(null); }
  }
  const confirmed = nurses.filter((n) => n.employment === "Confirmed").length;
  return <section className="hr-employment-page"><header className="hr-employment-heading"><div><span className="hr-dashboard-eyebrow">HOSPITAL ADMINISTRATION</span><h1>Employment Verification</h1><p>Confirm that a nurse is employed by your associated institution. This does not change licence status.</p></div><div className="hr-employment-workspace"><Building2 size={19} /><span>{employers.map((e) => e.name).join(", ") || "Employer Workspace"}</span></div></header>
    {error && <p role="alert">{error}</p>}{message && <p role="status">{message}</p>}
    <div className="hr-employment-summary">{[["Total Records", nurses.length, Users], ["Confirmed", confirmed, UserCheck], ["Pending", nurses.length - confirmed, Clock3]].map(([title, value, Icon]) => <article className="hr-employment-summary-card" key={title}><div className="hr-employment-summary-icon"><Icon size={23} /></div><div><strong>{value}</strong><span>{title}</span></div></article>)}</div>
    <section className="hr-employment-panel"><div className="hr-employment-panel-heading"><div><h2>Employer records</h2><p>Only your linked employers' nurses appear here.</p></div></div><label className="hr-employment-search"><Search size={20} /><input type="search" placeholder="Search by name or NANNM ID" value={search} onChange={(e) => setSearch(e.target.value)} /></label>
      {loading ? <p>Loading records…</p> : <div className="hr-employment-table-wrapper"><table className="hr-employment-table"><thead><tr><th>Nurse</th><th>NANNM ID</th><th>Ward</th><th>Cadre</th><th>Employment</th><th>Action</th></tr></thead><tbody>{rows.map((n) => <tr key={n.id}><td>{n.name}</td><td>{n.nanm_id || "Pending"}</td><td>{n.ward || "—"}</td><td>{n.cadre || "—"}</td><td>{n.employment}</td><td>{n.employment === "Pending" ? <button type="button" disabled={busy === n.id} onClick={() => confirm(n)}><CheckCircle2 size={17} />{busy === n.id ? "Saving…" : "Confirm"}</button> : "Confirmed"}</td></tr>)}</tbody></table>{rows.length === 0 && <p>No employment records match your search.</p>}</div>}
    </section>
  </section>;
}
export default HREmploymentVerification;
