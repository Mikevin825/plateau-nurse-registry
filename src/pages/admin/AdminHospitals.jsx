import { useMemo, useState } from "react";
import {
  Building2,
  CheckCircle2,
  Clock3,
  Eye,
  MapPin,
  Search,
  ShieldAlert,
  Users,
  XCircle,
} from "lucide-react";
import "./AdminHospitals.css";

const hospitalRecords = [
  {
    id: "HSP-001",
    name: "Plateau Specialist Hospital",
    type: "Specialist Hospital",
    location: "Jos, Plateau State",
    administrator: "Grace Williams",
    email: "admin@plateauspecialist.example",
    phone: "+234 800 000 0101",
    nurses: 186,
    active: 152,
    expiring: 18,
    expired: 9,
    restricted: 7,
    status: "Active",
    registered: "2025-08-12",
  },
  {
    id: "HSP-002",
    name: "Jos University Teaching Hospital",
    type: "Teaching Hospital",
    location: "Lamingo, Jos",
    administrator: "Daniel James",
    email: "admin@juth.example",
    phone: "+234 800 000 0102",
    nurses: 342,
    active: 290,
    expiring: 24,
    expired: 16,
    restricted: 12,
    status: "Active",
    registered: "2025-07-21",
  },
  {
    id: "HSP-003",
    name: "Bingham University Teaching Hospital",
    type: "Teaching Hospital",
    location: "Jos, Plateau State",
    administrator: "Esther Peters",
    email: "admin@buth.example",
    phone: "+234 800 000 0103",
    nurses: 214,
    active: 178,
    expiring: 20,
    expired: 10,
    restricted: 6,
    status: "Active",
    registered: "2025-09-05",
  },
  {
    id: "HSP-004",
    name: "Our Lady of Apostles Hospital",
    type: "Private Hospital",
    location: "Jos, Plateau State",
    administrator: "Michael Thomas",
    email: "admin@olah.example",
    phone: "+234 800 000 0104",
    nurses: 96,
    active: 75,
    expiring: 12,
    expired: 6,
    restricted: 3,
    status: "Active",
    registered: "2025-10-14",
  },
  {
    id: "HSP-005",
    name: "General Hospital Barkin Ladi",
    type: "General Hospital",
    location: "Barkin Ladi, Plateau State",
    administrator: "Sarah Anderson",
    email: "admin@ghbl.example",
    phone: "+234 800 000 0105",
    nurses: 74,
    active: 58,
    expiring: 8,
    expired: 5,
    restricted: 3,
    status: "Pending",
    registered: "2026-10-25",
  },
  {
    id: "HSP-006",
    name: "Pankshin General Hospital",
    type: "General Hospital",
    location: "Pankshin, Plateau State",
    administrator: "Samuel Brown",
    email: "admin@pankshin.example",
    phone: "+234 800 000 0106",
    nurses: 0,
    active: 0,
    expiring: 0,
    expired: 0,
    restricted: 0,
    status: "Pending",
    registered: "2026-10-29",
  },
  {
    id: "HSP-007",
    name: "Community Health Centre Riyom",
    type: "Community Health Centre",
    location: "Riyom, Plateau State",
    administrator: "Elizabeth Johnson",
    email: "admin@riyom.example",
    phone: "+234 800 000 0107",
    nurses: 0,
    active: 0,
    expiring: 0,
    expired: 0,
    restricted: 0,
    status: "Suspended",
    registered: "2025-11-03",
  },
];

function AdminHospitals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedHospital, setSelectedHospital] = useState(null);

  const filteredHospitals = useMemo(() => {
    return hospitalRecords.filter((hospital) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        hospital.name.toLowerCase().includes(search) ||
        hospital.id.toLowerCase().includes(search) ||
        hospital.location.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || hospital.status === statusFilter;

      const matchesType =
        typeFilter === "All" || hospital.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchTerm, statusFilter, typeFilter]);

  const totalNurses = hospitalRecords.reduce(
    (total, hospital) => total + hospital.nurses,
    0
  );

  const activeHospitals = hospitalRecords.filter(
    (hospital) => hospital.status === "Active"
  ).length;

  const pendingHospitals = hospitalRecords.filter(
    (hospital) => hospital.status === "Pending"
  ).length;

  const suspendedHospitals = hospitalRecords.filter(
    (hospital) => hospital.status === "Suspended"
  ).length;

  return (
    <div className="admin-hospitals-page">
      <div className="admin-hospitals-header">
        <div>
          <span className="admin-hospitals-eyebrow">
            REGISTRY MANAGEMENT
          </span>

          <h1>Hospitals</h1>

          <p>
            Manage registered healthcare institutions and monitor their
            participation in the state nursing registry.
          </p>
        </div>
      </div>

      <div className="admin-hospitals-notice">
        <ShieldAlert size={21} />

        <div>
          <strong>Hospital access control</strong>
          <p>
            Each hospital administrator must be associated with one
            approved hospital. Hospital accounts must not access another
            institution&apos;s nurse records.
          </p>
        </div>
      </div>

      <div className="admin-hospitals-stats">
        <div className="admin-hospitals-stat-card">
          <div className="admin-hospitals-stat-icon total">
            <Building2 size={22} />
          </div>

          <div>
            <span>Registered Hospitals</span>
            <strong>{hospitalRecords.length}</strong>
          </div>
        </div>

        <div className="admin-hospitals-stat-card">
          <div className="admin-hospitals-stat-icon active">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <span>Active Hospitals</span>
            <strong>{activeHospitals}</strong>
          </div>
        </div>

        <div className="admin-hospitals-stat-card">
          <div className="admin-hospitals-stat-icon pending">
            <Clock3 size={22} />
          </div>

          <div>
            <span>Pending Approval</span>
            <strong>{pendingHospitals}</strong>
          </div>
        </div>

        <div className="admin-hospitals-stat-card">
          <div className="admin-hospitals-stat-icon suspended">
            <XCircle size={22} />
          </div>

          <div>
            <span>Suspended Hospitals</span>
            <strong>{suspendedHospitals}</strong>
          </div>
        </div>

        <div className="admin-hospitals-stat-card">
          <div className="admin-hospitals-stat-icon nurses">
            <Users size={22} />
          </div>

          <div>
            <span>Registered Nurses</span>
            <strong>{totalNurses.toLocaleString()}</strong>
          </div>
        </div>
      </div>

      <section className="admin-hospitals-panel">
        <div className="admin-hospitals-panel-header">
          <div>
            <h2>Hospital Directory</h2>
            <p>
              View hospital information, administrator details and
              workforce licence statistics.
            </p>
          </div>
        </div>

        <div className="admin-hospitals-toolbar">
          <div className="admin-hospitals-search">
            <Search size={19} />

            <input
              type="search"
              placeholder="Search hospital, ID or location..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by hospital status"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </select>

          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            aria-label="Filter by hospital type"
          >
            <option value="All">All Hospital Types</option>
            <option value="Teaching Hospital">Teaching Hospital</option>
            <option value="Specialist Hospital">Specialist Hospital</option>
            <option value="General Hospital">General Hospital</option>
            <option value="Private Hospital">Private Hospital</option>
            <option value="Community Health Centre">
              Community Health Centre
            </option>
          </select>
        </div>

        <div className="admin-hospitals-table-wrapper">
          <table className="admin-hospitals-table">
            <thead>
              <tr>
                <th>HOSPITAL</th>
                <th>REFERENCE ID</th>
                <th>LOCATION</th>
                <th>NURSES</th>
                <th>ACTIVE LICENCES</th>
                <th>EXPIRING</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredHospitals.map((hospital) => (
                <tr key={hospital.id}>
                  <td>
                    <div className="admin-hospitals-name">
                      <div className="admin-hospitals-avatar">
                        <Building2 size={19} />
                      </div>

                      <div>
                        <strong>{hospital.name}</strong>
                        <span>{hospital.type}</span>
                      </div>
                    </div>
                  </td>

                  <td>{hospital.id}</td>

                  <td>
                    <span className="admin-hospitals-location">
                      <MapPin size={15} />
                      {hospital.location}
                    </span>
                  </td>

                  <td>{hospital.nurses}</td>
                  <td>{hospital.active}</td>
                  <td>{hospital.expiring}</td>

                  <td>
                    <span
                      className={`admin-hospitals-status ${hospital.status.toLowerCase()}`}
                    >
                      {hospital.status}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="admin-hospitals-view-button"
                      onClick={() => setSelectedHospital(hospital)}
                    >
                      <Eye size={16} />
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredHospitals.length === 0 && (
                <tr>
                  <td colSpan="8" className="admin-hospitals-empty">
                    No hospitals match your search or selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-hospitals-footer">
          Showing {filteredHospitals.length} of {hospitalRecords.length} hospitals
        </div>
      </section>

      {selectedHospital && (
        <div
          className="admin-hospitals-modal-overlay"
          onClick={() => setSelectedHospital(null)}
        >
          <section
            className="admin-hospitals-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="hospital-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="admin-hospitals-modal-header">
              <div>
                <span>HOSPITAL PROFILE</span>
                <h2 id="hospital-modal-title">
                  {selectedHospital.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedHospital(null)}
                aria-label="Close hospital details"
              >
                <XCircle size={23} />
              </button>
            </div>

            <div className="admin-hospitals-modal-body">
              <div className="admin-hospitals-profile-status">
                <span>Account Status</span>

                <strong
                  className={`admin-hospitals-status ${selectedHospital.status.toLowerCase()}`}
                >
                  {selectedHospital.status}
                </strong>
              </div>

              <div className="admin-hospitals-detail-grid">
                <div>
                  <span>Reference ID</span>
                  <strong>{selectedHospital.id}</strong>
                </div>

                <div>
                  <span>Hospital Type</span>
                  <strong>{selectedHospital.type}</strong>
                </div>

                <div>
                  <span>Location</span>
                  <strong>{selectedHospital.location}</strong>
                </div>

                <div>
                  <span>Registration Date</span>
                  <strong>{selectedHospital.registered}</strong>
                </div>

                <div>
                  <span>Administrator</span>
                  <strong>{selectedHospital.administrator}</strong>
                </div>

                <div>
                  <span>Administrator Email</span>
                  <strong>{selectedHospital.email}</strong>
                </div>

                <div>
                  <span>Contact Number</span>
                  <strong>{selectedHospital.phone}</strong>
                </div>
              </div>

              <div className="admin-hospitals-workforce">
                <h3>Workforce Overview</h3>

                <div className="admin-hospitals-workforce-grid">
                  <div>
                    <strong>{selectedHospital.nurses}</strong>
                    <span>Total Nurses</span>
                  </div>

                  <div>
                    <strong>{selectedHospital.active}</strong>
                    <span>Active Licences</span>
                  </div>

                  <div>
                    <strong>{selectedHospital.expiring}</strong>
                    <span>Expiring Licences</span>
                  </div>

                  <div>
                    <strong>{selectedHospital.expired}</strong>
                    <span>Expired Licences</span>
                  </div>

                  <div>
                    <strong>{selectedHospital.restricted}</strong>
                    <span>Restricted Records</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-hospitals-modal-actions">
              <button
                type="button"
                className="admin-hospitals-close-button"
                onClick={() => setSelectedHospital(null)}
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}

      <div className="admin-hospitals-demo-note">
        <ShieldAlert size={17} />
        <span>
          Demonstration data only. Hospital records and account statuses
          are not connected to the backend.
        </span>
      </div>
    </div>
  );
}

export default AdminHospitals;