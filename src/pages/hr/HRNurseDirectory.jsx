
import { useMemo, useState } from 'react'
import {
  Search,
  Filter,
  Users,
  ShieldCheck,
  Clock3,
  AlertCircle,
  Eye,
  CheckCircle2,
  X,
  Building2,
  CalendarDays,
  BriefcaseBusiness,
  UserCheck,
} from 'lucide-react'

import './HRNurseDirectory.css'

const initialNurses = [
  {
    id: 'NUR-001',
    name: 'Sarah Johnson',
    initials: 'SJ',
    nannmId: 'NANNM-2026-001',
    ward: 'Emergency',
    cadre: 'Registered Nurse',
    specialty: 'Emergency Nursing',
    licenceStatus: 'Active',
    expiry: '2027-08-14',
    employment: 'Confirmed',
  },
  {
    id: 'NUR-002',
    name: 'David Williams',
    initials: 'DW',
    nannmId: 'NANNM-2026-002',
    ward: 'Surgical',
    cadre: 'Senior Nurse',
    specialty: 'Surgical Nursing',
    licenceStatus: 'Expiring Soon',
    expiry: '2026-11-12',
    employment: 'Confirmed',
  },
  {
    id: 'NUR-003',
    name: 'Grace Anderson',
    initials: 'GA',
    nannmId: 'NANNM-2026-003',
    ward: 'Maternity',
    cadre: 'Registered Midwife',
    specialty: 'Midwifery',
    licenceStatus: 'Expired',
    expiry: '2026-10-15',
    employment: 'Pending',
  },
  {
    id: 'NUR-004',
    name: 'Michael Brown',
    initials: 'MB',
    nannmId: 'NANNM-2026-004',
    ward: 'Paediatrics',
    cadre: 'Registered Nurse',
    specialty: 'Paediatric Nursing',
    licenceStatus: 'Active',
    expiry: '2027-05-20',
    employment: 'Pending',
  },
  {
    id: 'NUR-005',
    name: 'Elizabeth James',
    initials: 'EJ',
    nannmId: 'NANNM-2026-008',
    ward: 'Intensive Care',
    cadre: 'Senior Nurse',
    specialty: 'Critical Care Nursing',
    licenceStatus: 'Expiring Soon',
    expiry: '2026-11-19',
    employment: 'Confirmed',
  },
  {
    id: 'NUR-006',
    name: 'Samuel Thomas',
    initials: 'ST',
    nannmId: 'NANNM-2026-014',
    ward: 'Medical',
    cadre: 'Registered Nurse',
    specialty: 'Medical Nursing',
    licenceStatus: 'Suspended',
    expiry: '2027-03-10',
    employment: 'Confirmed',
  },
]

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function HRNurseDirectory() {
  const [nurses, setNurses] = useState(initialNurses)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [wardFilter, setWardFilter] = useState('All')
  const [cadreFilter, setCadreFilter] = useState('All')
  const [selectedNurse, setSelectedNurse] = useState(null)
  const [confirmationTarget, setConfirmationTarget] = useState(null)

  const filteredNurses = useMemo(() => {
    return nurses.filter((nurse) => {
      const matchesSearch =
        nurse.name.toLowerCase().includes(search.toLowerCase()) ||
        nurse.nannmId.toLowerCase().includes(search.toLowerCase())

      const matchesStatus =
        statusFilter === 'All' || nurse.licenceStatus === statusFilter

      const matchesWard =
        wardFilter === 'All' || nurse.ward === wardFilter

      const matchesCadre =
        cadreFilter === 'All' || nurse.cadre === cadreFilter

      return matchesSearch && matchesStatus && matchesWard && matchesCadre
    })
  }, [nurses, search, statusFilter, wardFilter, cadreFilter])

  const summary = {
    total: nurses.length,
    active: nurses.filter((n) => n.licenceStatus === 'Active').length,
    expiring: nurses.filter((n) => n.licenceStatus === 'Expiring Soon').length,
    expired: nurses.filter((n) => n.licenceStatus === 'Expired').length,
  }

  function confirmEmployment() {
    if (!confirmationTarget) return

    setNurses((current) =>
      current.map((nurse) =>
        nurse.id === confirmationTarget.id
          ? { ...nurse, employment: 'Confirmed' }
          : nurse,
      ),
    )

    if (selectedNurse?.id === confirmationTarget.id) {
      setSelectedNurse((current) => ({
        ...current,
        employment: 'Confirmed',
      }))
    }

    setConfirmationTarget(null)
  }

  function getStatusClass(status) {
    const classes = {
      Active: 'hr-directory-status-active',
      'Expiring Soon': 'hr-directory-status-warning',
      Expired: 'hr-directory-status-expired',
      Suspended: 'hr-directory-status-suspended',
      Revoked: 'hr-directory-status-revoked',
      Flagged: 'hr-directory-status-flagged',
      Pending: 'hr-directory-status-pending',
    }

    return classes[status] || 'hr-directory-status-pending'
  }

  return (
    <section className="hr-directory">
      <div className="hr-directory-heading">
        <div>
          <span className="hr-dashboard-eyebrow">
            HOSPITAL ADMINISTRATION
          </span>
          <h1>Nurse Directory</h1>
          <p>
            View nurses associated with your hospital and monitor their
            professional registration and employment status.
          </p>
        </div>

        <div className="hr-directory-hospital">
          <Building2 size={18} />
          <span>Hospital Workspace</span>
        </div>
      </div>

      <div className="hr-directory-summary">
        <article className="hr-directory-summary-card">
          <div className="hr-directory-summary-icon blue">
            <Users size={21} />
          </div>
          <div>
            <strong>{summary.total}</strong>
            <span>Total Nurses</span>
          </div>
        </article>

        <article className="hr-directory-summary-card">
          <div className="hr-directory-summary-icon green">
            <ShieldCheck size={21} />
          </div>
          <div>
            <strong>{summary.active}</strong>
            <span>Active Licences</span>
          </div>
        </article>

        <article className="hr-directory-summary-card">
          <div className="hr-directory-summary-icon orange">
            <Clock3 size={21} />
          </div>
          <div>
            <strong>{summary.expiring}</strong>
            <span>Expiring Soon</span>
          </div>
        </article>

        <article className="hr-directory-summary-card">
          <div className="hr-directory-summary-icon red">
            <AlertCircle size={21} />
          </div>
          <div>
            <strong>{summary.expired}</strong>
            <span>Expired Licences</span>
          </div>
        </article>
      </div>

      <div className="hr-directory-panel">
        <div className="hr-directory-panel-heading">
          <div>
            <h2>Registered Nurses</h2>
            <p>
              {filteredNurses.length} of {nurses.length} nurses displayed
            </p>
          </div>
        </div>

        <div className="hr-directory-toolbar">
          <div className="hr-directory-search">
            <Search size={18} />
            <input
              type="search"
              placeholder="Search by nurse name or NANNM ID..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="hr-directory-filter-label">
            <Filter size={17} />
            <span>Filters</span>
          </div>

          <select
            aria-label="Filter by licence status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All Licence Statuses</option>
            <option value="Active">Active</option>
            <option value="Expiring Soon">Expiring Soon</option>
            <option value="Expired">Expired</option>
            <option value="Suspended">Suspended</option>
            <option value="Revoked">Revoked</option>
            <option value="Flagged">Flagged</option>
            <option value="Pending">Pending</option>
          </select>

          <select
            aria-label="Filter by ward"
            value={wardFilter}
            onChange={(event) => setWardFilter(event.target.value)}
          >
            <option value="All">All Wards</option>
            {[...new Set(nurses.map((nurse) => nurse.ward))].map((ward) => (
              <option value={ward} key={ward}>{ward}</option>
            ))}
          </select>

          <select
            aria-label="Filter by cadre"
            value={cadreFilter}
            onChange={(event) => setCadreFilter(event.target.value)}
          >
            <option value="All">All Cadres</option>
            {[...new Set(nurses.map((nurse) => nurse.cadre))].map((cadre) => (
              <option value={cadre} key={cadre}>{cadre}</option>
            ))}
          </select>
        </div>

        <div className="hr-directory-table-wrapper">
          <table className="hr-directory-table">
            <thead>
              <tr>
                <th>Nurse</th>
                <th>NANNM ID</th>
                <th>Ward</th>
                <th>Licence Status</th>
                <th>Expiry Date</th>
                <th>Employment</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredNurses.map((nurse) => (
                <tr key={nurse.id}>
                  <td>
                    <div className="hr-directory-nurse-cell">
                      <div className="hr-directory-avatar">
                        {nurse.initials}
                      </div>
                      <div>
                        <strong>{nurse.name}</strong>
                        <span>{nurse.cadre}</span>
                      </div>
                    </div>
                  </td>

                  <td className="hr-directory-id">{nurse.nannmId}</td>
                  <td>{nurse.ward}</td>

                  <td>
                    <span className={`hr-directory-status ${getStatusClass(nurse.licenceStatus)}`}>
                      {nurse.licenceStatus}
                    </span>
                  </td>

                  <td>{formatDate(nurse.expiry)}</td>

                  <td>
                    <span className={`hr-directory-employment ${nurse.employment === 'Confirmed' ? 'confirmed' : 'pending'}`}>
                      {nurse.employment}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="hr-directory-view-button"
                      onClick={() => setSelectedNurse(nurse)}
                      aria-label={`View ${nurse.name}`}
                    >
                      <Eye size={16} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredNurses.length === 0 && (
            <div className="hr-directory-empty">
              <Users size={30} />
              <strong>No nurses found</strong>
              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>
      </div>

      {selectedNurse && (
        <div
          className="hr-directory-modal-overlay"
          onClick={() => setSelectedNurse(null)}
          role="presentation"
        >
          <section
            className="hr-directory-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="hr-nurse-detail-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="hr-directory-modal-heading">
              <div>
                <span className="hr-dashboard-eyebrow">NURSE RECORD</span>
                <h2 id="hr-nurse-detail-title">Nurse Details</h2>
              </div>

              <button
                type="button"
                className="hr-directory-close"
                onClick={() => setSelectedNurse(null)}
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="hr-directory-profile">
              <div className="hr-directory-profile-avatar">
                {selectedNurse.initials}
              </div>
              <div>
                <h3>{selectedNurse.name}</h3>
                <span>{selectedNurse.cadre}</span>
                <p>{selectedNurse.nannmId}</p>
              </div>
            </div>

            <div className="hr-directory-detail-grid">
              <div>
                <span><BriefcaseBusiness size={15} /> Ward</span>
                <strong>{selectedNurse.ward}</strong>
              </div>

              <div>
                <span><UserCheck size={15} /> Specialty</span>
                <strong>{selectedNurse.specialty}</strong>
              </div>

              <div>
                <span><ShieldCheck size={15} /> Licence Status</span>
                <strong>
                  <span className={`hr-directory-status ${getStatusClass(selectedNurse.licenceStatus)}`}>
                    {selectedNurse.licenceStatus}
                  </span>
                </strong>
              </div>

              <div>
                <span><CalendarDays size={15} /> Licence Expiry</span>
                <strong>{formatDate(selectedNurse.expiry)}</strong>
              </div>

              <div>
                <span><Building2 size={15} /> Employment</span>
                <strong>{selectedNurse.employment}</strong>
              </div>
            </div>

            <div className="hr-directory-modal-footer">
              {selectedNurse.employment === 'Pending' ? (
                <button
                  type="button"
                  className="hr-directory-confirm-button"
                  onClick={() => setConfirmationTarget(selectedNurse)}
                >
                  <CheckCircle2 size={17} />
                  Confirm Employment
                </button>
              ) : (
                <span className="hr-directory-confirmed-note">
                  <CheckCircle2 size={17} />
                  Employment confirmed
                </span>
              )}

              <button
                type="button"
                className="hr-directory-cancel-button"
                onClick={() => setSelectedNurse(null)}
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}

      {confirmationTarget && (
        <div className="hr-directory-modal-overlay">
          <section
            className="hr-directory-confirm-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="hr-confirm-title"
          >
            <div className="hr-directory-confirm-icon">
              <CheckCircle2 size={25} />
            </div>

            <h2 id="hr-confirm-title">Confirm Employment?</h2>

            <p>
              Confirm that <strong>{confirmationTarget.name}</strong> is
              currently employed by this hospital.
            </p>

            <p className="hr-directory-confirm-warning">
              This is a demonstration. The confirmation is stored only in
              the current browser session and is not sent to the registry.
            </p>

            <div className="hr-directory-confirm-actions">
              <button
                type="button"
                className="hr-directory-cancel-button"
                onClick={() => setConfirmationTarget(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="hr-directory-confirm-button"
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

export default HRNurseDirectory
