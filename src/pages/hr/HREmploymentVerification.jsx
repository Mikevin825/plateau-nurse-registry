
import { useMemo, useState } from 'react'
import {
  Search,
  Filter,
  Users,
  UserCheck,
  Clock3,
  AlertCircle,
  Eye,
  CheckCircle2,
  X,
  Building2,
  Info,
} from 'lucide-react'

import './HREmploymentVerification.css'

// Synthetic demonstration records.
// Replace with backend API data during integration.
const initialRecords = [
  {
    id: 'NUR-001',
    name: 'Sarah Johnson',
    initials: 'SJ',
    nannmId: 'NANNM-2026-001',
    ward: 'Emergency',
    cadre: 'Registered Nurse',
    specialty: 'Emergency Nursing',
    employment: 'Confirmed',
    employmentDate: '2024-03-12',
  },
  {
    id: 'NUR-002',
    name: 'David Williams',
    initials: 'DW',
    nannmId: 'NANNM-2026-002',
    ward: 'Surgical',
    cadre: 'Senior Nurse',
    specialty: 'Surgical Nursing',
    employment: 'Confirmed',
    employmentDate: '2022-06-20',
  },
  {
    id: 'NUR-003',
    name: 'Grace Anderson',
    initials: 'GA',
    nannmId: 'NANNM-2026-003',
    ward: 'Maternity',
    cadre: 'Registered Midwife',
    specialty: 'Midwifery',
    employment: 'Pending',
    employmentDate: '2025-01-08',
  },
  {
    id: 'NUR-004',
    name: 'Michael Brown',
    initials: 'MB',
    nannmId: 'NANNM-2026-004',
    ward: 'Paediatrics',
    cadre: 'Registered Nurse',
    specialty: 'Paediatric Nursing',
    employment: 'Pending',
    employmentDate: '2025-08-15',
  },
  {
    id: 'NUR-005',
    name: 'Elizabeth James',
    initials: 'EJ',
    nannmId: 'NANNM-2026-008',
    ward: 'Intensive Care',
    cadre: 'Senior Nurse',
    specialty: 'Critical Care Nursing',
    employment: 'Confirmed',
    employmentDate: '2023-11-04',
  },
  {
    id: 'NUR-006',
    name: 'Samuel Thomas',
    initials: 'ST',
    nannmId: 'NANNM-2026-014',
    ward: 'Medical',
    cadre: 'Registered Nurse',
    specialty: 'Medical Nursing',
    employment: 'Pending',
    employmentDate: '2026-02-10',
  },
]

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function HREmploymentVerification() {
  const [records, setRecords] = useState(initialRecords)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [confirmationTarget, setConfirmationTarget] = useState(null)

  const summary = {
    total: records.length,
    confirmed: records.filter(
      (record) => record.employment === 'Confirmed',
    ).length,
    pending: records.filter(
      (record) => record.employment === 'Pending',
    ).length,
  }

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const query = search.toLowerCase()

      const matchesSearch =
        record.name.toLowerCase().includes(query) ||
        record.nannmId.toLowerCase().includes(query)

      const matchesStatus =
        statusFilter === 'All' ||
        record.employment === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [records, search, statusFilter])

  function confirmEmployment() {
    if (!confirmationTarget) return

    setRecords((current) =>
      current.map((record) =>
        record.id === confirmationTarget.id
          ? { ...record, employment: 'Confirmed' }
          : record,
      ),
    )

    if (selectedRecord?.id === confirmationTarget.id) {
      setSelectedRecord((current) => ({
        ...current,
        employment: 'Confirmed',
      }))
    }

    setConfirmationTarget(null)
  }

  return (
    <section className="hr-employment-page">
      <header className="hr-employment-heading">
        <div>
          <span className="hr-dashboard-eyebrow">
            HOSPITAL ADMINISTRATION
          </span>
          <h1>Employment Verification</h1>
          <p>
            Review and confirm the employment status of nurses
            registered under your hospital.
          </p>
        </div>

        <div className="hr-employment-workspace">
          <Building2 size={19} />
          <span>Hospital Workspace</span>
        </div>
      </header>

      <div className="hr-employment-notice">
        <Info size={21} />
        <p>
          Employment confirmation verifies a nurse's association with
          your hospital. It does not approve or change their professional
          licence status.
        </p>
      </div>

      <div className="hr-employment-summary">
        <article className="hr-employment-summary-card">
          <div className="hr-employment-summary-icon blue">
            <Users size={23} />
          </div>
          <div>
            <strong>{summary.total}</strong>
            <span>Total Employment Records</span>
          </div>
        </article>

        <article className="hr-employment-summary-card">
          <div className="hr-employment-summary-icon green">
            <UserCheck size={23} />
          </div>
          <div>
            <strong>{summary.confirmed}</strong>
            <span>Confirmed Employment</span>
          </div>
        </article>

        <article className="hr-employment-summary-card">
          <div className="hr-employment-summary-icon orange">
            <Clock3 size={23} />
          </div>
          <div>
            <strong>{summary.pending}</strong>
            <span>Pending Confirmation</span>
          </div>
        </article>
      </div>

      <section className="hr-employment-panel">
        <div className="hr-employment-panel-heading">
          <div>
            <h2>Hospital Employment Register</h2>
            <p>
              Showing {filteredRecords.length} of {records.length} records
            </p>
          </div>
        </div>

        <div className="hr-employment-toolbar">
          <label className="hr-employment-search">
            <Search size={20} />
            <input
              type="search"
              placeholder="Search nurse name or NANNM ID..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <div className="hr-employment-filter-label">
            <Filter size={19} />
            <span>Filter records</span>
          </div>

          <select
            aria-label="Filter by employment status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All employment statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="hr-employment-table-wrapper">
          <table className="hr-employment-table">
            <thead>
              <tr>
                <th>Nurse</th>
                <th>NANNM ID</th>
                <th>Ward</th>
                <th>Cadre</th>
                <th>Employment Date</th>
                <th>Confirmation</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>
                    <div className="hr-employment-nurse">
                      <div className="hr-employment-avatar">
                        {record.initials}
                      </div>
                      <strong>{record.name}</strong>
                    </div>
                  </td>

                  <td>{record.nannmId}</td>
                  <td>{record.ward}</td>
                  <td>{record.cadre}</td>
                  <td>{formatDate(record.employmentDate)}</td>

                  <td>
                    <span
                      className={`hr-employment-status ${
                        record.employment === 'Confirmed'
                          ? 'confirmed'
                          : 'pending'
                      }`}
                    >
                      {record.employment}
                    </span>
                  </td>

                  <td>
                    <div className="hr-employment-actions">
                      <button
                        type="button"
                        className="hr-employment-view-button"
                        onClick={() => setSelectedRecord(record)}
                      >
                        <Eye size={18} />
                        View
                      </button>

                      {record.employment === 'Pending' && (
                        <button
                          type="button"
                          className="hr-employment-confirm-button"
                          onClick={() => setConfirmationTarget(record)}
                        >
                          <CheckCircle2 size={18} />
                          Confirm
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan="7" className="hr-employment-empty">
                    No employment records match your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedRecord && (
        <div
          className="hr-employment-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedRecord(null)
            }
          }}
        >
          <section
            className="hr-employment-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="hr-employment-modal-title"
          >
            <header className="hr-employment-modal-header">
              <div>
                <span className="hr-dashboard-eyebrow">
                  EMPLOYMENT RECORD
                </span>
                <h2 id="hr-employment-modal-title">
                  Employment Details
                </h2>
              </div>

              <button
                type="button"
                aria-label="Close details"
                onClick={() => setSelectedRecord(null)}
              >
                <X size={22} />
              </button>
            </header>

            <div className="hr-employment-profile">
              <div className="hr-employment-avatar large">
                {selectedRecord.initials}
              </div>

              <div>
                <h3>{selectedRecord.name}</h3>
                <p>{selectedRecord.nannmId}</p>
              </div>
            </div>

            <div className="hr-employment-details">
              <div>
                <span>Employment status</span>
                <strong>{selectedRecord.employment}</strong>
              </div>

              <div>
                <span>Employment date</span>
                <strong>
                  {formatDate(selectedRecord.employmentDate)}
                </strong>
              </div>

              <div>
                <span>Ward</span>
                <strong>{selectedRecord.ward}</strong>
              </div>

              <div>
                <span>Professional cadre</span>
                <strong>{selectedRecord.cadre}</strong>
              </div>

              <div>
                <span>Specialty</span>
                <strong>{selectedRecord.specialty}</strong>
              </div>

              <div>
                <span>Hospital</span>
                <strong>Hospital Workspace</strong>
              </div>
            </div>

            {selectedRecord.employment === 'Pending' && (
              <div className="hr-employment-modal-notice">
                <AlertCircle size={20} />
                <p>
                  This employment record is awaiting confirmation
                  from your hospital.
                </p>
              </div>
            )}

            <footer className="hr-employment-modal-footer">
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
              >
                Close
              </button>

              {selectedRecord.employment === 'Pending' && (
                <button
                  type="button"
                  className="primary"
                  onClick={() => setConfirmationTarget(selectedRecord)}
                >
                  Confirm Employment
                </button>
              )}
            </footer>
          </section>
        </div>
      )}

      {confirmationTarget && (
        <div className="hr-employment-overlay">
          <section
            className="hr-employment-confirm-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="hr-employment-confirm-title"
            aria-describedby="hr-employment-confirm-description"
          >
            <div className="hr-employment-confirm-icon">
              <CheckCircle2 size={28} />
            </div>

            <h2 id="hr-employment-confirm-title">
              Confirm Employment?
            </h2>

            <p id="hr-employment-confirm-description">
              You are confirming that {confirmationTarget.name} is
              employed by your hospital. Only proceed after verifying
              this information.
            </p>

            <p className="hr-employment-demo-warning">
              Demonstration only: this change currently affects local
              page state and is not saved to a backend.
            </p>

            <div className="hr-employment-confirm-actions">
              <button
                type="button"
                onClick={() => setConfirmationTarget(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="primary"
                onClick={confirmEmployment}
              >
                Confirm Employment
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  )
}

export default HREmploymentVerification
