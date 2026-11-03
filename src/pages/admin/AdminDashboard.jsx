import {
  Users,
  ClipboardCheck,
  ShieldCheck,
  Clock,
  AlertTriangle,
  Ban,
  Building2,
  ArrowUpRight,
  Eye,
} from "lucide-react";
import "./AdminDashboard.css";

const summaryCards = [
  {
    label: "Registered Nurses",
    value: "1,284",
    detail: "Total registry records",
    icon: Users,
    color: "blue",
  },
  {
    label: "Pending Approvals",
    value: "46",
    detail: "Awaiting final decision",
    icon: ClipboardCheck,
    color: "orange",
  },
  {
    label: "Active Licences",
    value: "1,042",
    detail: "Currently valid",
    icon: ShieldCheck,
    color: "green",
  },
  {
    label: "Expiring Licences",
    value: "87",
    detail: "Within the next 30 days",
    icon: Clock,
    color: "purple",
  },
  {
    label: "Flagged Records",
    value: "12",
    detail: "Require administrative review",
    icon: AlertTriangle,
    color: "red",
  },
  {
    label: "Suspended / Revoked",
    value: "9",
    detail: "Restricted records",
    icon: Ban,
    color: "grey",
  },
];

const pendingApprovals = [
  {
    name: "Sarah Johnson",
    id: "PSN-2026-00142",
    hospital: "Plateau Specialist Hospital",
    submitted: "02 Nov 2026",
    status: "Pending",
  },
  {
    name: "David Williams",
    id: "PSN-2026-00143",
    hospital: "Jos University Teaching Hospital",
    submitted: "02 Nov 2026",
    status: "Pending",
  },
  {
    name: "Grace Anderson",
    id: "PSN-2026-00144",
    hospital: "Our Lady of Apostles Hospital",
    submitted: "01 Nov 2026",
    status: "Pending",
  },
  {
    name: "Michael Brown",
    id: "PSN-2026-00145",
    hospital: "Plateau Specialist Hospital",
    submitted: "01 Nov 2026",
    status: "Pending",
  },
];

const recentActivity = [
  {
    action: "Licence approval",
    description: "A nurse registration was approved.",
    administrator: "Registry Administrator",
    time: "Today, 10:42 AM",
  },
  {
    action: "Record flagged",
    description: "A registration record was flagged for review.",
    administrator: "Registry Administrator",
    time: "Today, 9:18 AM",
  },
  {
    action: "Hospital registered",
    description: "A new hospital account was added.",
    administrator: "Registry Administrator",
    time: "Yesterday, 3:30 PM",
  },
];

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">REGISTRY ADMINISTRATION</span>
          <h1>Overview</h1>
          <p>
            Monitor registry activity, review applications and oversee
            professional licensing across Plateau State.
          </p>
        </div>
      </section>

      <section className="admin-summary-grid">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <article className="admin-summary-card" key={card.label}>
              <div className={`admin-summary-icon ${card.color}`}>
                <Icon size={23} />
              </div>

              <div className="admin-summary-content">
                <span>{card.label}</span>
                <strong>{card.value}</strong>
                <small>{card.detail}</small>
              </div>
            </article>
          );
        })}
      </section>

      <section className="admin-dashboard-grid">
        <article className="admin-panel admin-approvals-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Pending Approvals</h2>
              <p>Registration applications awaiting your decision.</p>
            </div>

            <a href="/admin/approvals" className="admin-panel-link">
              View all <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nurse</th>
                  <th>Hospital</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {pendingApprovals.map((nurse) => (
                  <tr key={nurse.id}>
                    <td>
                      <div className="admin-nurse-cell">
                        <strong>{nurse.name}</strong>
                        <span>{nurse.id}</span>
                      </div>
                    </td>
                    <td>{nurse.hospital}</td>
                    <td>{nurse.submitted}</td>
                    <td>
                      <span className="admin-status pending">
                        {nurse.status}
                      </span>
                    </td>
                    <td>
                      <a
                        href="/admin/approvals"
                        className="admin-view-button"
                        aria-label={`Review ${nurse.name}`}
                      >
                        <Eye size={18} />
                        Review
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="admin-panel admin-activity-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest administrative actions.</p>
            </div>
          </div>

          <div className="admin-activity-list">
            {recentActivity.map((activity, index) => (
              <div className="admin-activity-item" key={index}>
                <div className="admin-activity-icon">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <strong>{activity.action}</strong>
                  <p>{activity.description}</p>
                  <span>
                    {activity.administrator} · {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="admin-dashboard-bottom">
        <article className="admin-panel admin-expiry-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Licence Expiry Overview</h2>
              <p>Current licence validity distribution.</p>
            </div>
          </div>

          <div className="admin-expiry-stats">
            <div>
              <span className="expiry-dot active-dot"></span>
              <span>Active licences</span>
              <strong>1,042</strong>
            </div>

            <div>
              <span className="expiry-dot soon-dot"></span>
              <span>Expiring soon</span>
              <strong>87</strong>
            </div>

            <div>
              <span className="expiry-dot expired-dot"></span>
              <span>Expired licences</span>
              <strong>146</strong>
            </div>
          </div>
        </article>

        <article className="admin-panel admin-hospitals-panel">
          <div className="admin-hospital-icon">
            <Building2 size={25} />
          </div>

          <div>
            <h2>Registered Hospitals</h2>
            <strong>38</strong>
            <p>Institutions connected to the registry.</p>
          </div>

          <a href="/admin/hospitals" aria-label="View registered hospitals">
            <ArrowUpRight size={20} />
          </a>
        </article>
      </section>

      <p className="admin-demo-notice">
        Demonstration data only. Live registry figures will be supplied by the
        backend API.
      </p>
    </div>
  );
}

export default AdminDashboard;
