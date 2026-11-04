import { useEffect, useState } from "react";
import { Users, ClipboardCheck, ShieldCheck, Clock, AlertTriangle, Ban, Building2, FileCheck, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
import { getAdminSummary } from "../../apiService";

function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    let active = true;
    getAdminSummary(token).then((data) => { if (active) setSummary(data); })
      .catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [token]);
  const cards = summary ? [
    ["Registered Nurses", summary.total_nurses, "Registry records", Users, "blue"],
    ["Pending Nurses", summary.pending_nurses, "Awaiting review", ClipboardCheck, "orange"],
    ["Active Licences", summary.active_licences, "Outside warning window", ShieldCheck, "green"],
    ["Expiring Licences", summary.expiring_licences, "Within warning window", Clock, "purple"],
    ["Expired Licences", summary.expired_licences, "Need attention", AlertTriangle, "red"],
    ["Restricted Nurses", summary.restricted_nurses, "Suspended or revoked", Ban, "grey"],
  ] : [];
  return <div className="admin-dashboard"><section className="admin-page-heading"><div><span className="admin-eyebrow">REGISTRY ADMINISTRATION</span><h1>Overview</h1><p>Live registry status and review queues.</p></div></section>
    {error && <p role="alert">{error}</p>}{loading ? <p>Loading registry overview…</p> : summary && <>
      <section className="admin-summary-grid">{cards.map(([label, value, detail, Icon, color]) => <article className="admin-summary-card" key={label}><div className={`admin-summary-icon ${color}`}><Icon size={23} /></div><div className="admin-summary-content"><span>{label}</span><strong>{value}</strong><small>{detail}</small></div></article>)}</section>
      <section className="admin-dashboard-grid"><article className="admin-panel"><div className="admin-panel-heading"><div><h2>Review queues</h2><p>Current applications and documents awaiting action.</p></div></div><p><Building2 size={18} /> HR registrations: <strong>{summary.pending_hr_registrations}</strong> <Link to="/admin/hr-users?tab=review">Review</Link></p><p><FileCheck size={18} /> Licence renewals: <strong>{summary.pending_renewals}</strong> <Link to="/admin/renewals">Review</Link></p></article>
        <article className="admin-panel"><div className="admin-panel-heading"><div><h2>Recent nurse records</h2><p>Latest records from the registry.</p></div><ArrowUpRight size={18} /></div>{summary.recent_nurses.length ? <div className="admin-table-wrapper"><table className="admin-table"><thead><tr><th>Nurse</th><th>Employer</th><th>Status</th><th>Submitted</th></tr></thead><tbody>{summary.recent_nurses.map((nurse) => <tr key={nurse.id}><td><strong>{nurse.full_name}</strong><br /><small>{nurse.nanm_id || `Request ${nurse.id}`}</small></td><td>{nurse.employer__name}</td><td>{nurse.record_status}</td><td>{new Date(nurse.created_at).toLocaleDateString()}</td></tr>)}</tbody></table></div> : <p>No nurse records yet.</p>}</article></section>
    </>}
  </div>;
}
export default AdminDashboard;
