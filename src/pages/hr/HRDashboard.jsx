import {
  Users,
  ShieldCheck,
  Clock3,
  AlertCircle,
  ClipboardCheck,
  ArrowUpRight,
  ArrowRight,
  CalendarDays,
  Building2,
  FileCheck,
} from 'lucide-react'

import './HRDashboard.css'

const summaryCards = [
  {
    label: 'Total Registered Nurses',
    value: '248',
    description: 'Registered with your hospital',
    icon: Users,
    color: 'blue',
  },
  {
    label: 'Active Licences',
    value: '196',
    description: 'Currently valid',
    icon: ShieldCheck,
    color: 'green',
  },
  {
    label: 'Expiring Soon',
    value: '18',
    description: 'Within the next 30 days',
    icon: Clock3,
    color: 'orange',
  },
  {
    label: 'Expired Licences',
    value: '12',
    description: 'Require attention',
    icon: AlertCircle,
    color: 'red',
  },
  {
    label: 'Pending Confirmations',
    value: '7',
    description: 'Awaiting HR confirmation',
    icon: ClipboardCheck,
    color: 'purple',
  },
]

const recentNurses = [
  {
    id: 'NUR-001',
    name: 'Sarah Johnson',
    initials: 'SJ',
    nannmId: 'NANNM-2026-001',
    cadre: 'Registered Nurse',
    status: 'Active',
    employment: 'Confirmed',
  },
  {
    id: 'NUR-002',
    name: 'David Williams',
    initials: 'DW',
    nannmId: 'NANNM-2026-002',
    cadre: 'Senior Nurse',
    status: 'Expiring Soon',
    employment: 'Confirmed',
  },
  {
    id: 'NUR-003',
    name: 'Grace Anderson',
    initials: 'GA',
    nannmId: 'NANNM-2026-003',
    cadre: 'Registered Midwife',
    status: 'Expired',
    employment: 'Pending',
  },
  {
    id: 'NUR-004',
    name: 'Michael Brown',
    initials: 'MB',
    nannmId: 'NANNM-2026-004',
    cadre: 'Registered Nurse',
    status: 'Active',
    employment: 'Pending',
  },
]

const expiringNurses = [
  {
    name: 'David Williams',
    nannmId: 'NANNM-2026-002',
    expiry: '12 November 2026',
    days: '9 days left',
  },
  {
    name: 'Elizabeth James',
    nannmId: 'NANNM-2026-008',
    expiry: '19 November 2026',
    days: '16 days left',
  },
  {
    name: 'Samuel Thomas',
    nannmId: 'NANNM-2026-014',
    expiry: '25 November 2026',
    days: '22 days left',
  },
]

function HRDashboard() {
  return (
    <section className="hr-dashboard">
      {/* Page heading */}
      <div className="hr-dashboard-heading">
        <div>
          <span className="hr-dashboard-eyebrow">
            HOSPITAL ADMINISTRATION
          </span>

          <h1>Overview</h1>

          <p>
            Monitor your hospital's nursing workforce and professional
            licence compliance.
          </p>
        </div>

        <div className="hr-hospital-badge">
          <Building2 size={18} />
          <span>Hospital Workspace</span>
        </div>
      </div>

      {/* Summary cards */}
      <div className="hr-summary-grid">
        {summaryCards.map((card) => {
          const Icon = card.icon

          return (
            <article className="hr-summary-card" key={card.label}>
              <div className="hr-summary-card-top">
                <div className={`hr-summary-icon ${card.color}`}>
                  <Icon size={21} />
                </div>

                <ArrowUpRight size={17} className="hr-summary-arrow" />
              </div>

              <div className="hr-summary-value">{card.value}</div>

              <h3>{card.label}</h3>

              <p>{card.description}</p>
            </article>
          )
        })}
      </div>

      {/* Main dashboard grid */}
      <div className="hr-dashboard-grid">
        {/* Recent nurses */}
        <section className="hr-panel hr-recent-panel">
          <div className="hr-panel-heading">
            <div>
              <h2>Nurse Workforce</h2>
              <p>Recently registered nurses in your hospital.</p>
            </div>

            <a href="/hr/nurses" className="hr-panel-link">
              View directory
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="hr-table-wrapper">
            <table className="hr-nurse-table">
              <thead>
                <tr>
                  <th>Nurse</th>
                  <th>NANNM ID</th>
                  <th>Licence</th>
                  <th>Employment</th>
                </tr>
              </thead>

              <tbody>
                {recentNurses.map((nurse) => (
                  <tr key={nurse.id}>
                    <td>
                      <div className="hr-nurse-cell">
                        <div className="hr-nurse-avatar">
                          {nurse.initials}
                        </div>

                        <div>
                          <strong>{nurse.name}</strong>
                          <span>{nurse.cadre}</span>
                        </div>
                      </div>
                    </td>

                    <td className="hr-nannm-id">{nurse.nannmId}</td>

                    <td>
                      <span
                        className={`hr-status ${
                          nurse.status === 'Active'
                            ? 'status-active'
                            : nurse.status === 'Expired'
                              ? 'status-expired'
                              : 'status-warning'
                        }`}
                      >
                        {nurse.status}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`hr-employment-status ${
                          nurse.employment === 'Confirmed'
                            ? 'employment-confirmed'
                            : 'employment-pending'
                        }`}
                      >
                        {nurse.employment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Licence distribution */}
        <section className="hr-panel hr-licence-panel">
          <div className="hr-panel-heading">
            <div>
              <h2>Licence Overview</h2>
              <p>Workforce licence distribution.</p>
            </div>

            <FileCheck size={21} className="hr-panel-heading-icon" />
          </div>

          <div className="hr-licence-total">
            <strong>248</strong>
            <span>Total nurses</span>
          </div>

          <div className="hr-licence-bar">
            <span className="bar-active"></span>
            <span className="bar-expiring"></span>
            <span className="bar-expired"></span>
            <span className="bar-pending"></span>
          </div>

          <div className="hr-licence-legend">
            <div>
              <span className="legend-dot dot-active"></span>
              <span>Active</span>
              <strong>196</strong>
            </div>

            <div>
              <span className="legend-dot dot-expiring"></span>
              <span>Expiring soon</span>
              <strong>18</strong>
            </div>

            <div>
              <span className="legend-dot dot-expired"></span>
              <span>Expired</span>
              <strong>12</strong>
            </div>

            <div>
              <span className="legend-dot dot-pending"></span>
              <span>Other / Pending</span>
              <strong>22</strong>
            </div>
          </div>
        </section>

        {/* Expiring licences */}
        <section className="hr-panel hr-expiring-panel">
          <div className="hr-panel-heading">
            <div>
              <h2>Upcoming Licence Expiries</h2>
              <p>Professionals whose licences need attention.</p>
            </div>

            <Clock3 size={21} className="hr-panel-heading-icon" />
          </div>

          <div className="hr-expiring-list">
            {expiringNurses.map((nurse) => (
              <div className="hr-expiring-item" key={nurse.nannmId}>
                <div className="hr-expiring-icon">
                  <CalendarDays size={19} />
                </div>

                <div className="hr-expiring-info">
                  <strong>{nurse.name}</strong>
                  <span>{nurse.nannmId}</span>
                  <small>Expires {nurse.expiry}</small>
                </div>

                <span className="hr-expiring-days">{nurse.days}</span>
              </div>
            ))}
          </div>

          <a href="/hr/licences" className="hr-panel-footer-link">
            View all licence records
            <ArrowRight size={16} />
          </a>
        </section>

        {/* Employment confirmations */}
        <section className="hr-panel hr-employment-panel">
          <div className="hr-panel-heading">
            <div>
              <h2>Employment Verification</h2>
              <p>Employment records requiring confirmation.</p>
            </div>

            <ClipboardCheck
              size={21}
              className="hr-panel-heading-icon"
            />
          </div>

          <div className="hr-employment-callout">
            <div className="hr-employment-callout-icon">
              <ClipboardCheck size={23} />
            </div>

            <div>
              <strong>7 confirmations pending</strong>
              <p>
                Review and confirm employment records for nurses
                associated with your hospital.
              </p>
            </div>
          </div>

          <a
            href="/hr/employment"
            className="hr-panel-footer-link"
          >
            Review pending confirmations
            <ArrowRight size={16} />
          </a>
        </section>
      </div>

      <div className="hr-dashboard-disclaimer">
        <ShieldCheck size={16} />
        <span>
          This dashboard provides read-only registry information.
          Employment confirmation is the only administrative action
          available to your hospital account.
        </span>
      </div>
    </section>
  )
}

export default HRDashboard