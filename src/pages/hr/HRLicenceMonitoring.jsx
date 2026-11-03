
import { useMemo, useState } from 'react'
import {
  Search,
  Filter,
  ShieldCheck,
  Clock3,
  AlertCircle,
  Ban,
  X,
  Eye,
  CalendarDays,
  Building2,
  Info,
} from 'lucide-react'

import './HRLicenceMonitoring.css'

// Synthetic demonstration records.
// Replace these with API data when the backend is ready.
const initialLicences = [
  {
    id: 'NUR-001',
    name: 'Sarah Johnson',
    initials: 'SJ',
    nannmId: 'NANNM-2026-001',
    ward: 'Emergency',
    cadre: 'Registered Nurse',
    specialty: 'Emergency Nursing',
    status: 'Active',
    expiry: '2027-08-14',
    employer: 'Plateau General Hospital',
  },
  {
    id: 'NUR-002',
    name: 'David Williams',
    initials: 'DW',
    nannmId: 'NANNM-2026-002',
    ward: 'Surgical',
    cadre: 'Senior Nurse',
    specialty: 'Surgical Nursing',
    status: 'Expiring Soon',
    expiry: '2026-11-12',
    employer: 'Plateau General Hospital',
  },
  {
    id: 'NUR-003',
    name: 'Grace Anderson',
    initials: 'GA',
    nannmId: 'NANNM-2026-003',
    ward: 'Maternity',
    cadre: 'Registered Midwife',
    specialty: 'Midwifery',
    status: 'Expired',
    expiry: '2026-10-15',
    employer: 'Plateau General Hospital',
  },
  {
    id: 'NUR-004',
    name: 'Michael Brown',
    initials: 'MB',
    nannmId: 'NANNM-2026-004',
    ward: 'Paediatrics',
    cadre: 'Registered Nurse',
    specialty: 'Paediatric Nursing',
    status: 'Active',
    expiry: '2027-05-20',
    employer: 'Plateau General Hospital',
  },
  {
    id: 'NUR-005',
    name: 'Elizabeth James',
    initials: 'EJ',
    nannmId: 'NANNM-2026-008',
    ward: 'Intensive Care',
    cadre: 'Senior Nurse',
    specialty: 'Critical Care Nursing',
    status: 'Expiring Soon',
    expiry: '2026-11-19',
    employer: 'Plateau General Hospital',
  },
  {
    id: 'NUR-006',
    name: 'Samuel Thomas',
    initials: 'ST',
    nannmId: 'NANNM-2026-014',
    ward: 'Medical',
    cadre: 'Registered Nurse',
    specialty: 'Medical Nursing',
    status: 'Suspended',
    expiry: '2027-03-10',
    employer: 'Plateau General Hospital',
  },
]

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function getStatusClass(status) {
  const classes = {
    Active: 'hr-licence-status-active',
    'Expiring Soon': 'hr-licence-status-warning',
    Expired: 'hr-licence-status-expired',
    Suspended: 'hr-licence-status-suspended',
    Revoked: 'hr-licence-status-revoked',
    Flagged: 'hr-licence-status-flagged',
  }

  return classes[status] || ''
}

function HRLicenceMonitoring() {
  const [licences] = useState(initialLicences)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [wardFilter, setWardFilter] = useState('All')
  const [selectedLicence, setSelectedLicence] = useState(null)

  const summary = {
    active: licences.filter((item) => item.status === 'Active').length,
    expiring: licences.filter((item) => item.status === 'Expiring Soon').length,
    expired: licences.filter((item) => item.status === 'Expired').length,
    suspended: licences.filter((item) => item.status === 'Suspended').length,
    revoked: licences.filter((item) => item.status === 'Revoked').length,
  }

  const filteredLicences = useMemo(() => {
    return licences.filter((licence) => {
      const query = search.toLowerCase()

      const matchesSearch =
        licence.name.toLowerCase().includes(query) ||
        licence.nannmId.toLowerCase().includes(query)

      const matchesStatus =
        statusFilter === 'All' || licence.status === statusFilter

      const matchesWard =
        wardFilter === 'All' || licence.ward === wardFilter

      return matchesSearch && matchesStatus && matchesWard
    })
  }, [licences, search, statusFilter, wardFilter])

  const wards = [...new Set(licences.map((item) => item.ward))]

  return (
    <section className="hr-licence-page">
      <header className="hr-licence-heading">
        <div>
          <span className="hr-dashboard-eyebrow">
            HOSPITAL ADMINISTRATION
          </span>
          <h1>Licence Monitoring</h1>
          <p>
            Monitor the validity of professional licences held by nurses
            associated with your hospital.
          </p>
        </div>

        <div className="hr-licence-workspace">
          <Building2 size={19} />
          <span>Hospital Workspace</span>
        </div>
      </header>

      <div className="hr-licence-notice">
        <Info size={21} />
        <p>
          This page is for monitoring and follow-up only. Licence approvals,
          suspensions, revocations and other regulatory decisions are
          controlled by the NANNM Super Admin.
        </p>
      </div>

      <div className="hr-licence-summary">
        <article className="hr-licence-summary-card">
          <div className="hr-licence-summary-icon green">
            <ShieldCheck size={23} />
          </div>
          <div>
            <strong>{summary.active}</strong>
            <span>Active Licences</span>
          </div>
        </article>

        <article className="hr-licence-summary-card">
          <div className="hr-licence-summary-icon orange">
            <Clock3 size={23} />
          </div>
          <div>
            <strong>{summary.expiring}</strong>
            <span>Expiring Soon</span>
          </div>
        </article>

        <article className="hr-licence-summary-card">
          <div className="hr-licence-summary-icon red">
            <AlertCircle size={23} />
          </div>
          <div>
            <strong>{summary.expired}</strong>
            <span>Expired Licences</span>
          </div>
        </article>

        <article className="hr-licence-summary-card">
          <div className="hr-licence-summary-icon purple">
            <Ban size={23} />
          </div>
          <div>
            <strong>{summary.suspended}</strong>
            <span>Suspended</span>
          </div>
        </article>

        <article className="hr-licence-summary-card">
          <div className="hr-licence-summary-icon grey">
            <X size={23} />
          </div>
          <div>
            <strong>{summary.revoked}</strong>
            <span>Revoked</span>
          </div>
        </article>
      </div>

      <section className="hr-licence-panel">
        <div className="hr-licence-panel-heading">
          <div>
            <h2>Hospital Licence Register</h2>
            <p>
              Showing {filteredLicences.length} of {licences.length} records
            </p>
          </div>
        </div>

        <div className="hr-licence-toolbar">
          <label className="hr-licence-search">
            <Search size={20} />
            <input
              type="search"
              placeholder="Search nurse name or NANNM ID..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <div className="hr-licence-filter-label">
            <Filter size={19} />
            <span>Filter records</span>
          </div>

          <select
            aria-label="Filter by licence status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All licence statuses</option>
            <option value="Active">Active</option>
            <option value="Expiring Soon">Expiring Soon</option>
            <option value="Expired">Expired</option>
            <option value="Suspended">Suspended</option>
            <option value="Revoked">Revoked</option>
            <option value="Flagged">Flagged</option>
          </select>

          <select
            aria-label="Filter by ward"
            value={wardFilter}
            onChange={(event) => setWardFilter(event.target.value)}
          >
            <option value="All">All wards</option>
            {wards.map((ward) => (
              <option key={ward} value={ward}>
                {ward}
              </option>
            ))}
          </select>
        </div>

        <div className="hr-licence-table-wrapper">
          <table className="hr-licence-table">
            <thead>
              <tr>
                <th>Nurse</th>
                <th>NANNM ID</th>
                <th>Ward</th>
                <th>Cadre</th>
                <th>Licence Status</th>
                <th>Expiry Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredLicences.map((licence) => (
                <tr key={licence.id}>
                  <td>
                    <div className="hr-licence-nurse">
                      <div className="hr-licence-avatar">
                        {licence.initials}
                      </div>
                      <strong>{licence.name}</strong>
                    </div>
                  </td>

                  <td>{licence.nannmId}</td>
                  <td>{licence.ward}</td>
                  <td>{licence.cadre}</td>

                  <td>
                    <span
                      className={`hr-licence-status ${getStatusClass(licence.status)}`}
                    >
                      {licence.status}
                    </span>
                  </td>

                  <td>
                    <span className="hr-licence-expiry">
                      <CalendarDays size={17} />
                      {formatDate(licence.expiry)}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="hr-licence-view-button"
                      onClick={() => setSelectedLicence(licence)}
                    >
                      <Eye size={18} />
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredLicences.length === 0 && (
                <tr>
                  <td colSpan="7" className="hr-licence-empty">
                    No licence records match your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedLicence && (
        <div
          className="hr-licence-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedLicence(null)
            }
          }}
        >
          <section
            className="hr-licence-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="hr-licence-modal-title"
          >
            <header className="hr-licence-modal-header">
              <div>
                <span className="hr-dashboard-eyebrow">
                  LICENCE RECORD
                </span>
                <h2 id="hr-licence-modal-title">Nurse Licence Details</h2>
              </div>

              <button
                type="button"
                aria-label="Close details"
                onClick={() => setSelectedLicence(null)}
              >
                <X size={22} />
              </button>
            </header>

            <div className="hr-licence-modal-profile">
              <div className="hr-licence-avatar large">
                {selectedLicence.initials}
              </div>
              <div>
                <h3>{selectedLicence.name}</h3>
                <p>{selectedLicence.nannmId}</p>
              </div>
            </div>

            <div className="hr-licence-detail-grid">
              <div>
                <span>Licence status</span>
                <strong>
                  <span
                    className={`hr-licence-status ${getStatusClass(selectedLicence.status)}`}
                  >
                    {selectedLicence.status}
                  </span>
                </strong>
              </div>

              <div>
                <span>Expiry date</span>
                <strong>{formatDate(selectedLicence.expiry)}</strong>
              </div>

              <div>
                <span>Ward</span>
                <strong>{selectedLicence.ward}</strong>
              </div>

              <div>
                <span>Professional cadre</span>
                <strong>{selectedLicence.cadre}</strong>
              </div>

              <div>
                <span>Specialty</span>
                <strong>{selectedLicence.specialty}</strong>
              </div>

              <div>
                <span>Employer</span>
                <strong>{selectedLicence.employer}</strong>
              </div>
            </div>

            <div className="hr-licence-modal-notice">
              <Info size={19} />
              <p>
                Your hospital can monitor this record but cannot change its
                regulatory licence status. Contact the appropriate NANNM
                administrator for licence-related enquiries.
              </p>
            </div>

            <footer className="hr-licence-modal-footer">
              <button
                type="button"
                onClick={() => setSelectedLicence(null)}
              >
                Close
              </button>
            </footer>
          </section>
        </div>
      )}
    </section>
  )
}

export default HRLicenceMonitoring
