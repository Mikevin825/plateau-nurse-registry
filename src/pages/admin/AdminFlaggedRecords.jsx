import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Flag,
  AlertTriangle,
  Building2,
  Eye,
  RotateCcw,
} from "lucide-react";
import "./AdminFlaggedRecords.css";

const initialRecords = [
  {
    id: "PSN-2026-00144",
    name: "Grace Anderson",
    initials: "GA",
    hospital: "Our Lady of Apostles Hospital",
    cadre: "Registered Nurse",
    specialty: "Paediatric Nursing",
    reason: "Registration information requires further investigation.",
    category: "Information discrepancy",
    flaggedBy: "Super Admin",
    date: "01 November 2026",
    status: "Under Review",
  },
  {
    id: "PSN-2026-00152",
    name: "Jonathan Williams",
    initials: "JW",
    hospital: "Plateau Specialist Hospital",
    cadre: "Nursing Officer",
    specialty: "Medical Nursing",
    reason: "Submitted documentation requires verification.",
    category: "Document verification",
    flaggedBy: "Registry Officer",
    date: "02 November 2026",
    status: "Under Review",
  },
  {
    id: "PSN-2026-00153",
    name: "Esther James",
    initials: "EJ",
    hospital: "Jos University Teaching Hospital",
    cadre: "Senior Nursing Officer",
    specialty: "Surgical Nursing",
    reason: "Conflicting information was identified during review.",
    category: "Information discrepancy",
    flaggedBy: "Super Admin",
    date: "03 November 2026",
    status: "Under Review",
  },
  {
    id: "PSN-2026-00154",
    name: "Peter Thomas",
    initials: "PT",
    hospital: "Bingham University Teaching Hospital",
    cadre: "Registered Nurse",
    specialty: "Critical Care",
    reason: "Additional confirmation is required before approval.",
    category: "Additional verification",
    flaggedBy: "Registry Officer",
    date: "03 November 2026",
    status: "Under Review",
  },
];

function AdminFlaggedRecords() {
  const navigate = useNavigate();

  const [records] = useState(initialRecords);
  const [search, setSearch] = useState("");
  const [hospitalFilter, setHospitalFilter] = useState("All hospitals");
  const [categoryFilter, setCategoryFilter] = useState("All categories");

  const hospitals = useMemo(
    () => [...new Set(records.map((record) => record.hospital))],
    [records],
  );

  const categories = useMemo(
    () => [...new Set(records.map((record) => record.category))],
    [records],
  );

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        !query ||
        record.name.toLowerCase().includes(query) ||
        record.id.toLowerCase().includes(query);

      const matchesHospital =
        hospitalFilter === "All hospitals" ||
        record.hospital === hospitalFilter;

      const matchesCategory =
        categoryFilter === "All categories" ||
        record.category === categoryFilter;

      return matchesSearch && matchesHospital && matchesCategory;
    });
  }, [records, search, hospitalFilter, categoryFilter]);

  const resetFilters = () => {
    setSearch("");
    setHospitalFilter("All hospitals");
    setCategoryFilter("All categories");
  };

  const openProfile = (id) => {
    navigate(`/admin/nurses/${encodeURIComponent(id)}`);
  };

  return (
    <main className="admin-flagged-page">
      <header className="flagged-page-heading">
        <div>
          <span className="flagged-eyebrow">
            REGULATORY INVESTIGATION
          </span>
          <h1>Flagged Records</h1>
          <p>
            Inspect records escalated for further investigation
            and regulatory review.
          </p>
        </div>
      </header>

      <section className="flagged-summary-grid">
        <article className="flagged-summary-card">
          <div className="flagged-summary-icon red">
            <Flag size={23} />
          </div>
          <div>
            <span>Total Flagged Records</span>
            <strong>{records.length}</strong>
            <small>Demonstration records</small>
          </div>
        </article>

        <article className="flagged-summary-card">
          <div className="flagged-summary-icon orange">
            <AlertTriangle size={23} />
          </div>
          <div>
            <span>Under Investigation</span>
            <strong>
              {records.filter(
                (record) => record.status === "Under Review",
              ).length}
            </strong>
            <small>Awaiting resolution</small>
          </div>
        </article>

        <article className="flagged-summary-card">
          <div className="flagged-summary-icon blue">
            <Building2 size={23} />
          </div>
          <div>
            <span>Hospitals Represented</span>
            <strong>{hospitals.length}</strong>
            <small>Across registered facilities</small>
          </div>
        </article>
      </section>

      <section className="flagged-panel">
        <div className="flagged-panel-heading">
          <div>
            <h2>Investigation Queue</h2>
            <p>
              Showing {filteredRecords.length} of {records.length}
              {" "}demonstration records.
            </p>
          </div>
        </div>

        <div className="flagged-filters">
          <label className="flagged-search">
            <Search size={19} />
            <input
              type="search"
              placeholder="Search nurse name or NANNM ID"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <label className="flagged-filter-control">
            <span>Hospital</span>
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

          <label className="flagged-filter-control">
            <span>Flag category</span>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              <option>All categories</option>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="flagged-reset-button"
            onClick={resetFilters}
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>

        <div className="flagged-table-wrapper">
          <table className="flagged-table">
            <thead>
              <tr>
                <th>Nurse</th>
                <th>Hospital</th>
                <th>Flag Category</th>
                <th>Reason</th>
                <th>Flagged By</th>
                <th>Date Flagged</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>
                    <div className="flagged-nurse-cell">
                      <div className="flagged-avatar">
                        {record.initials}
                      </div>
                      <div>
                        <strong>{record.name}</strong>
                        <small>{record.id}</small>
                      </div>
                    </div>
                  </td>

                  <td>{record.hospital}</td>
                  <td>{record.category}</td>
                  <td className="flagged-reason-cell">
                    {record.reason}
                  </td>
                  <td>{record.flaggedBy}</td>
                  <td>{record.date}</td>

                  <td>
                    <span className="flagged-status">
                      <span />
                      {record.status}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="flagged-review-button"
                      onClick={() => openProfile(record.id)}
                    >
                      <Eye size={16} />
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan="8" className="flagged-empty-state">
                    No flagged records match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flagged-demo-notice">
          Demonstration data only. Flag records and investigation
          outcomes are not connected to the registry backend.
        </div>
      </section>
    </main>
  );
}

export default AdminFlaggedRecords;