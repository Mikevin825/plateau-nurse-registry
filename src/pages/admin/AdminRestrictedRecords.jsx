import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Ban,
  CheckCircle2,
  Eye,
  Search,
  ShieldAlert,
  XCircle,
} from "lucide-react";
import "./AdminRestrictedRecords.css";

const restrictedRecords = [
  {
    id: "PSN-2026-00146",
    name: "Elizabeth James",
    initials: "EJ",
    hospital: "Bingham University Teaching Hospital",
    ward: "Maternity",
    cadre: "Senior Nursing Officer",
    status: "Suspended",
    reason: "Pending investigation into a professional conduct complaint.",
    decisionDate: "2026-10-28",
    reviewingOfficer: "Super Admin",
    reviewability: "Reviewable",
  },
  {
    id: "PSN-2026-00147",
    name: "Samuel Thomas",
    initials: "ST",
    hospital: "General Hospital Barkin Ladi",
    ward: "Outpatient",
    cadre: "Registered Nurse",
    status: "Revoked",
    reason: "Professional registration revoked following a final regulatory decision.",
    decisionDate: "2026-10-19",
    reviewingOfficer: "Super Admin",
    reviewability: "Terminal",
  },
];

function AdminRestrictedRecords() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const filteredRecords = useMemo(() => {
    return restrictedRecords.filter((record) => {
      const matchesSearch =
        record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.hospital.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || record.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const suspendedCount = restrictedRecords.filter(
    (record) => record.status === "Suspended"
  ).length;

  const revokedCount = restrictedRecords.filter(
    (record) => record.status === "Revoked"
  ).length;

  const openCount = filteredRecords.length;

  return (
    <div className="admin-restricted-page">
      <div className="admin-restricted-header">
        <div>
          <span className="admin-restricted-eyebrow">
            REGULATORY CONTROL
          </span>

          <h1>Suspended / Revoked Records</h1>

          <p>
            Monitor nurses whose professional licences have been restricted
            by a regulatory decision.
          </p>
        </div>
      </div>

      <div className="admin-restricted-notice">
        <ShieldAlert size={21} />

        <div>
          <strong>Important regulatory distinction</strong>
          <p>
            Suspended records may be reviewed through an authorised
            regulatory process. Revoked records are terminal and cannot
            be reinstated through this interface.
          </p>
        </div>
      </div>

      <div className="admin-restricted-stats">
        <div className="admin-restricted-stat-card">
          <div className="admin-restricted-stat-icon total">
            <Ban size={22} />
          </div>

          <div>
            <span>Total Restricted</span>
            <strong>{restrictedRecords.length}</strong>
          </div>
        </div>

        <div className="admin-restricted-stat-card">
          <div className="admin-restricted-stat-icon suspended">
            <AlertTriangle size={22} />
          </div>

          <div>
            <span>Suspended</span>
            <strong>{suspendedCount}</strong>
          </div>
        </div>

        <div className="admin-restricted-stat-card">
          <div className="admin-restricted-stat-icon revoked">
            <XCircle size={22} />
          </div>

          <div>
            <span>Revoked</span>
            <strong>{revokedCount}</strong>
          </div>
        </div>

        <div className="admin-restricted-stat-card">
          <div className="admin-restricted-stat-icon displayed">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <span>Records Displayed</span>
            <strong>{openCount}</strong>
          </div>
        </div>
      </div>

      <section className="admin-restricted-panel">
        <div className="admin-restricted-panel-header">
          <div>
            <h2>Restricted Licence Register</h2>
            <p>
              Review restriction details and access the corresponding nurse
              profile.
            </p>
          </div>
        </div>

        <div className="admin-restricted-toolbar">
          <div className="admin-restricted-search">
            <Search size={19} />

            <input
              type="search"
              placeholder="Search by nurse, NANNM ID or hospital..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by restriction status"
          >
            <option value="All">All Restrictions</option>
            <option value="Suspended">Suspended</option>
            <option value="Revoked">Revoked</option>
          </select>
        </div>

        <div className="admin-restricted-table-wrapper">
          <table className="admin-restricted-table">
            <thead>
              <tr>
                <th>NURSE</th>
                <th>NANNM ID</th>
                <th>HOSPITAL</th>
                <th>RESTRICTION</th>
                <th>DECISION DATE</th>
                <th>REVIEW STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>
                    <div className="admin-restricted-nurse">
                      <div className="admin-restricted-avatar">
                        {record.initials}
                      </div>

                      <strong>{record.name}</strong>
                    </div>
                  </td>

                  <td>{record.id}</td>

                  <td>{record.hospital}</td>

                  <td>
                    <span
                      className={`admin-restricted-status ${record.status.toLowerCase()}`}
                    >
                      {record.status}
                    </span>
                  </td>

                  <td>{record.decisionDate}</td>

                  <td>
                    <span
                      className={`admin-restricted-review ${record.reviewability.toLowerCase()}`}
                    >
                      {record.reviewability}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="admin-restricted-view-button"
                      onClick={() => setSelectedRecord(record)}
                    >
                      <Eye size={16} />
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan="7" className="admin-restricted-empty">
                    No restricted records match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-restricted-footer">
          Showing {filteredRecords.length} of {restrictedRecords.length} records
        </div>
      </section>

      {selectedRecord && (
        <div
          className="admin-restricted-modal-overlay"
          onClick={() => setSelectedRecord(null)}
        >
          <section
            className="admin-restricted-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="restricted-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="admin-restricted-modal-header">
              <div>
                <span>RESTRICTION DETAILS</span>
                <h2 id="restricted-modal-title">
                  {selectedRecord.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                aria-label="Close details"
              >
                <XCircle size={23} />
              </button>
            </div>

            <div className="admin-restricted-modal-body">
              <div className="admin-restricted-detail-grid">
                <div>
                  <span>NANNM ID</span>
                  <strong>{selectedRecord.id}</strong>
                </div>

                <div>
                  <span>Restriction</span>
                  <strong>{selectedRecord.status}</strong>
                </div>

                <div>
                  <span>Hospital</span>
                  <strong>{selectedRecord.hospital}</strong>
                </div>

                <div>
                  <span>Ward</span>
                  <strong>{selectedRecord.ward}</strong>
                </div>

                <div>
                  <span>Cadre</span>
                  <strong>{selectedRecord.cadre}</strong>
                </div>

                <div>
                  <span>Decision Date</span>
                  <strong>{selectedRecord.decisionDate}</strong>
                </div>

                <div>
                  <span>Reviewing Authority</span>
                  <strong>{selectedRecord.reviewingOfficer}</strong>
                </div>

                <div>
                  <span>Reviewability</span>
                  <strong>{selectedRecord.reviewability}</strong>
                </div>
              </div>

              <div className="admin-restricted-reason">
                <strong>Restriction Reason</strong>
                <p>{selectedRecord.reason}</p>
              </div>

              {selectedRecord.status === "Revoked" && (
                <div className="admin-restricted-terminal-notice">
                  <Ban size={19} />
                  <p>
                    This revocation is terminal. It cannot be reversed
                    through the registry interface.
                  </p>
                </div>
              )}

              {selectedRecord.status === "Suspended" && (
                <div className="admin-restricted-suspension-notice">
                  <AlertTriangle size={19} />
                  <p>
                    This suspension may be reviewed through an authorised
                    regulatory decision. No reinstatement action is available
                    in this demonstration.
                  </p>
                </div>
              )}
            </div>

            <div className="admin-restricted-modal-actions">
              <button
                type="button"
                className="admin-restricted-profile-button"
                onClick={() =>
                  navigate(
                    `/admin/nurses/${encodeURIComponent(selectedRecord.id)}`
                  )
                }
              >
                Open Nurse Profile
              </button>

              <button
                type="button"
                className="admin-restricted-close-button"
                onClick={() => setSelectedRecord(null)}
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}

      <div className="admin-restricted-demo-note">
        <AlertTriangle size={17} />
        <span>
          Demonstration data only. Restriction records and decisions are
          not connected to the backend.
        </span>
      </div>
    </div>
  );
}

export default AdminRestrictedRecords;