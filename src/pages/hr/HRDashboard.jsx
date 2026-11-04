import { Users, ShieldCheck, Clock3, AlertCircle, ClipboardCheck, ArrowUpRight, ArrowRight, Building2, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import "./HRDashboard.css";
import useHRDirectory from "../../hooks/useHRDirectory";

function HRDashboard() {
  const { nurses, employers, loading, error } = useHRDirectory();
  const active = nurses.filter((n) => n.licenceStatus === "Active").length;
  const expiring = nurses.filter((n) => n.licenceStatus === "Expiring Soon").length;
  const expired = nurses.filter((n) => n.licenceStatus === "Expired").length;
  const pending = nurses.filter((n) => n.employment === "Pending").length;
  const cards = [
    ["Total Registered Nurses", nurses.length, "In your employer workspace", Users, "blue"],
    ["Active Licences", active, "Currently valid", ShieldCheck, "green"],
    ["Expiring Soon", expiring, "Need follow up", Clock3, "orange"],
    ["Expired Licences", expired, "Require attention", AlertCircle, "red"],
    ["Pending Confirmations", pending, "Awaiting HR confirmation", ClipboardCheck, "purple"],
  ];
  return <section className="hr-dashboard">
    <div className="hr-dashboard-heading"><div><span className="hr-dashboard-eyebrow">HOSPITAL ADMINISTRATION</span><h1>Overview</h1><p>Monitor your employer's nursing workforce and licence compliance.</p></div><div className="hr-hospital-badge"><Building2 size={18} /><span>{employers.map((e) => e.name).join(", ") || "Employer Workspace"}</span></div></div>
    {error && <p role="alert">{error}</p>}
    {loading ? <p>Loading employer records…</p> : <>
      <div className="hr-summary-grid">{cards.map(([label, value, description, Icon, color]) => <article className="hr-summary-card" key={label}><div className="hr-summary-card-top"><div className={`hr-summary-icon ${color}`}><Icon size={21} /></div><ArrowUpRight size={17} className="hr-summary-arrow" /></div><div className="hr-summary-value">{value}</div><h3>{label}</h3><p>{description}</p></article>)}</div>
      <div className="hr-dashboard-grid"><section className="hr-panel hr-recent-panel"><div className="hr-panel-heading"><div><h2>Nurse Workforce</h2><p>Employer scoped records.</p></div><Link to="/hr/nurses" className="hr-panel-link">View directory <ArrowRight size={16} /></Link></div>
        {nurses.length ? <div className="hr-table-wrapper"><table className="hr-nurse-table"><thead><tr><th>Nurse</th><th>NANNM ID</th><th>Licence</th><th>Employment</th></tr></thead><tbody>{nurses.slice(0, 6).map((nurse) => <tr key={nurse.id}><td><div className="hr-nurse-cell"><div className="hr-nurse-avatar">{nurse.initials}</div><div><strong>{nurse.name}</strong><span>{nurse.cadre}</span></div></div></td><td className="hr-nannm-id">{nurse.nanm_id || "Pending"}</td><td>{nurse.licenceStatus}</td><td>{nurse.employment}</td></tr>)}</tbody></table></div> : <p>No nurses are associated with your employer yet.</p>}
      </section><section className="hr-panel hr-licence-panel"><div className="hr-panel-heading"><div><h2>Licence Overview</h2><p>Current employer records.</p></div><FileCheck size={21} className="hr-panel-heading-icon" /></div><div className="hr-licence-total"><strong>{nurses.length}</strong><span>Total nurses</span></div><div className="hr-licence-legend"><div><span>Active</span><strong>{active}</strong></div><div><span>Expiring soon</span><strong>{expiring}</strong></div><div><span>Expired</span><strong>{expired}</strong></div><div><span>Pending confirmation</span><strong>{pending}</strong></div></div></section></div>
    </>}
  </section>;
}

export default HRDashboard;
