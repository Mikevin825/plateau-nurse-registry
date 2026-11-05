import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Clock,
  Users,
  FileCheck,
  Eye,
  Filter,
  RotateCcw,
} from "lucide-react";
import "./AdminPendingApprovals.css";

const initialApplications = [
  {
    id: "PSN-2026-00143",
    name: "David Williams",
    initials: "DW",
    hospital: "Jos University Teaching Hospital",
    cadre: "Senior Nursing Officer",
    specialty: "Surgical Nursing",
    ward: "Surgical",
    submitted: "02 November 2026",
    officer: "Registry Officer",
    status: "Pending",
  },
  {
    id: "PSN-2026-00149",
    name: "Catherine James",
    initials: "CJ",
    hospital: "Plateau Specialist Hospital",
    cadre: "Registered Nurse",
    specialty: "Medical Nursing",
    ward: "Medical",
    submitted: "03 November 2026",
    officer: "Registry Officer",
    status: "Pending",
  },
  {
    id: "PSN-2026-00150",
    name: "Daniel Peters",
    initials: "DP",
    hospital: "Bingham University Teaching Hospital",
    cadre: "Nursing Officer",
    specialty: "Critical Care",
    ward: "Intensive Care",
    submitted: "03 November 2026",
    officer: "Registry Officer",
    status: "Pending",
  },
  {
    id: "PSN-2026-00151",
    name: "Rebecca Thomas",
    initials: "RT",
    hospital: "Our Lady of Apostles Hospital",
    cadre: "Registered Nurse",
    specialty: "Paediatric Nursing",
    ward: "Paediatrics",
    submitted: "03 November 2026",
    officer: "Registry Officer",
    status: "Pending",
  },
];

function AdminPendingApprovals() {
  const navigate = useNavigate();

  const [applications] = useState(initialApplications);
  const [search, setSearch] = useState("");
  const [hospitalFilter, setHospitalFilter] = useState("All hospitals");

  const hospitals = useMemo(
    () => [...new Set(applications.map((application) => application.hospital))],
    [applications],
  );

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesSearch =
        !query ||
        application.name.toLowerCase().includes(query) ||
        application.id.toLowerCase().includes(query);

      const matchesHospital =
        hospitalFilter === "All hospitals" ||
        application.hospital === hospitalFilter;

      return matchesSearch && matchesHospital;
    });
  }, [applications, search, hospitalFilter]);

  const resetFilters = () => {
    setSearch("");
    setHospitalFilter("All hospitals");
  };

  const openApplication = (id) => {
    navigate(`/admin/nurses/${encodeURIComponent(id)}`);
  };

  return (
    <main className="admin-pending-page">
      <header className="pending-page-heading">
        <div>
          <span className="pending-eyebrow">
            REGULATORY ADMINISTRATION
          </span>
          <h1>Pending Approvals</h1>
          <p>
            Review submitted nurse registrations and make final
            regulatory decisions.
          </p>
        </div>
      </header>

      <section className="pending-summary-grid">
        <article className="pending-summary-card">
          <div className="pending-summary-icon orange">
            <Clock size={23} />
          </div>
          <div>
            <span>Pending Applications</span>
            <strong>{applications.length}</strong>
            <small>Awaiting final review</small>
          </div>
        </article>

        <article className="pending-summary-card">
          <div className="pending-summary-icon blue">
            <Users size={23} />
          </div>
          <div>
            <span>Hospitals Represented</span>
            <strong>{hospitals.length}</strong>
            <small>Across registered facilities</small>
          </div>
        </article>

        <article className="pending-summary-card">
          <div className="pending-summary-icon green">
            <FileCheck size={23} />
          </div>
          <div>
            <span>Currently Displayed</span>
            <strong>{filteredApplications.length}</strong>
            <small>Matching your filters</small>
          </div>
        </article>
      </section>

      <section className="pending-panel">
        <div className="pending-panel-heading">
          <div>
            <h2>Registration Review Queue</h2>
            <p>
              Showing {filteredApplications.length} of{" "}
              {applications.length} demonstration applications.
            </p>
          </div>
        </div>

        <div className="pending-filters">
          <label className="pending-search">
            <Search size={19} />
            <input
              type="search"
              placeholder="Search nurse name or NANNM ID"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <label className="pending-filter-control">
            <span>
              <Filter size={15} />
              Hospital
            </span>
            <select
              value={hospitalFilter}
              onChange={(event) => setHospitalFilter(event.target.value)}
            >
              <option>All hospitals</option>
              {hospitals.map((hospital) => (
                <option key={hospital}>{hospital}</option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="pending-reset-button"
            onClick={resetFilters}
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>

        <div className="pending-table-wrapper">
          <table className="pending-table">
            <thead>
              <tr>
                <th>Nurse</th>
                <th>Hospital</th>
                <th>Cadre / Specialty</th>
                <th>Submitted</th>
                <th>Reviewing Officer</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.id}>
                  <td>
                    <div className="pending-nurse-cell">
                      <div className="pending-avatar">
                        {application.initials}
                      </div>
                      <div>
                        <strong>{application.name}</strong>
                        <small>{application.id}</small>
                      </div>
                    </div>
                  </td>

                  <td>{application.hospital}</td>

                  <td>
                    <div className="pending-cadre-cell">
                      <strong>{application.cadre}</strong>
                      <small>{application.specialty}</small>
                    </div>
                  </td>

                  <td>{application.submitted}</td>
                  <td>{application.officer}</td>

                  <td>
                    <span className="pending-status">
                      <span />
                      Pending
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="pending-review-button"
                      onClick={() => openApplication(application.id)}
                    >
                      <Eye size={16} />
                      Review
                    </button>
                  </td>
                </tr>
              ))}

              {filteredApplications.length === 0 && (
                <tr>
                  <td colSpan="7" className="pending-empty-state">
                    No applications match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pending-demo-notice">
          Demonstration data only. Application records and review actions
          are not connected to the registry backend.
        </div>
      </section>
    </main>
  );
}

export default AdminPendingApprovals;
