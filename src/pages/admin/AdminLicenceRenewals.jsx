
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  RotateCcw,
  FileClock,
  CheckCircle2,
  XCircle,
  Clock3,
  Eye,
  RefreshCw,
} from "lucide-react";
import "./AdminLicenceRenewals.css";

const initialRenewals = [
  {
    id: "PSN-2026-00142",
    name: "Sarah Johnson",
    initials: "SJ",
    hospital: "Plateau Specialist Hospital",
    cadre: "Registered Nurse",
    currentExpiry: "2026-11-20",
    submitted: "2026-10-28",
    status: "Pending",
  },
  {
    id: "PSN-2026-00146",
    name: "Elizabeth James",
    initials: "EJ",
    hospital: "Bingham University Teaching Hospital",
    cadre: "Senior Nursing Officer",
    currentExpiry: "2026-11-08",
    submitted: "2026-10-25",
    status: "Pending",
  },
  {
    id: "PSN-2026-00148",
    name: "Mary Peters",
    initials: "MP",
    hospital: "Jos University Teaching Hospital",
    cadre: "Nursing Officer",
    currentExpiry: "2026-12-05",
    submitted: "2026-10-20",
    status: "Approved",
  },
  {
    id: "PSN-2026-00155",
    name: "Catherine James",
    initials: "CJ",
    hospital: "Plateau Specialist Hospital",
    cadre: "Registered Nurse",
    currentExpiry: "2026-10-15",
    submitted: "2026-10-12",
    status: "Rejected",
  },
  {
    id: "PSN-2026-00156",
    name: "Daniel Peters",
    initials: "DP",
    hospital: "General Hospital Barkin Ladi",
    cadre: "Nursing Officer",
    currentExpiry: "2026-11-30",
    submitted: "2026-10-30",
    status: "Pending",
  },
  {
    id: "PSN-2026-00157",
    name: "Rebecca Thomas",
    initials: "RT",
    hospital: "Our Lady of Apostles Hospital",
    cadre: "Registered Nurse",
    currentExpiry: "2026-09-18",
    submitted: "2026-09-10",
    status: "Approved",
  },
];

const formatDate = (date) => {
  if (!date || date === "—") return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function AdminLicenceRenewals() {
  const navigate = useNavigate();

  const [renewals] = useState(initialRenewals);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [hospitalFilter, setHospitalFilter] = useState("All");

  const hospitals = useMemo(
    () => [...new Set(renewals.map((record) => record.hospital))],
    [renewals]
  );

  const filteredRenewals = useMemo(() => {
    return renewals.filter((record) => {
      const searchMatch =
        record.name.toLowerCase().includes(search.toLowerCase()) ||
        record.id.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" || record.status === statusFilter;

      const hospitalMatch =
        hospitalFilter === "All" || record.hospital === hospitalFilter;

      return searchMatch && statusMatch && hospitalMatch;
    });
  }, [renewals, search, statusFilter, hospitalFilter]);

  const stats = [
    {
      label: "Total Applications",
      value: renewals.length,
      icon: FileClock,
      color: "blue",
    },
    {
      label: "Pending Review",
      value: renewals.filter((record) => record.status === "Pending").length,
      icon: Clock3,
      color: "orange",
    },
    {
      label: "Approved",
      value: renewals.filter((record) => record.status === "Approved").length,
      icon: CheckCircle2,
      color: "green",
    },
    {
      label: "Rejected",
      value: renewals.filter((record) => record.status === "Rejected").length,
      icon: XCircle,
      color: "red",
    },
  ];

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setHospitalFilter("All");
  };

  return (
    <div className="admin-renewals-page">
      <div className="admin-renewals-heading">
        <div>
          <span className="admin-renewals-eyebrow">
            REGULATORY ADMINISTRATION
          </span>
          <h1>Licence Renewals</h1>
          <p>
            Review and oversee nurse licence renewal applications across the
            state.
          </p>
        </div>

        <div className="admin-renewals-heading-icon">
          <RefreshCw size={25} />
        </div>
      </div>

      <div className="admin-renewals-demo-notice">
        <strong>Demonstration data:</strong> These applications are synthetic.
        Decisions made here are not saved to a backend.
      </div>

      <section className="admin-renewals-stats">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <article className="admin-renewal-stat-card" key={label}>
            <div className={`admin-renewal-stat-icon ${color}`}>
              <Icon size={22} />
            </div>
            <div>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          </article>
        ))}
      </section>

      <section className="admin-renewals-panel">
        <div className="admin-renewals-panel-heading">
          <div>
            <h2>Renewal Register</h2>
            <p>Search and review submitted licence renewal applications.</p>
          </div>

          <span className="admin-renewals-record-count">
            {filteredRenewals.length} applications
          </span>
        </div>

        <div className="admin-renewals-filters">
          <div className="admin-renewals-search">
            <Search size={19} />
            <input
              type="search"
              placeholder="Search nurse name or NANNM ID"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search renewal applications"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by application status"
          >
            <option value="All">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={hospitalFilter}
            onChange={(event) => setHospitalFilter(event.target.value)}
            aria-label="Filter by hospital"
          >
            <option value="All">All hospitals</option>
            {hospitals.map((hospital) => (
              <option value={hospital} key={hospital}>
                {hospital}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="admin-renewals-reset"
            onClick={resetFilters}
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>

        <div className="admin-renewals-table-wrapper">
          <table className="admin-renewals-table">
            <thead>
              <tr>
                <th>Nurse</th>
                <th>NANNM ID</th>
                <th>Hospital</th>
                <th>Current Expiry</th>
                <th>Submitted</th>
                <th>Application Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredRenewals.length > 0 ? (
                filteredRenewals.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <div className="admin-renewals-nurse">
                        <span className="admin-renewals-avatar">
                          {record.initials}
                        </span>
                        <div>
                          <strong>{record.name}</strong>
                          <small>{record.cadre}</small>
                        </div>
                      </div>
                    </td>

                    <td>{record.id}</td>
                    <td>{record.hospital}</td>
                    <td>{formatDate(record.currentExpiry)}</td>
                    <td>{formatDate(record.submitted)}</td>

                    <td>
                      <span
                        className={`admin-renewals-status ${record.status.toLowerCase()}`}
                      >
                        {record.status}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="admin-renewals-review-button"
                        onClick={() =>
                          navigate(
                            `/admin/renewals/${encodeURIComponent(record.id)}`
                          )
                        }
                      >
                        <Eye size={16} />
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="admin-renewals-empty">
                    No renewal applications match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AdminLicenceRenewals;
