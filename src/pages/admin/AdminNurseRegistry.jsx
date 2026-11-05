import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Users,
  ShieldCheck,
  Clock,
  AlertTriangle,
  Eye,
  X,
  RotateCcw,
} from "lucide-react";
import "./AdminNurseRegistry.css";

const initialNurses = [
  {
    id: "PSN-2026-00142",
    name: "Sarah Johnson",
    hospital: "Plateau Specialist Hospital",
    ward: "Emergency",
    cadre: "Registered Nurse",
    specialty: "Emergency Nursing",
    status: "Approved",
    expiry: "2027-08-14",
    registered: "2026-11-02",
  },
  {
    id: "PSN-2026-00143",
    name: "David Williams",
    hospital: "Jos University Teaching Hospital",
    ward: "Surgical",
    cadre: "Senior Nursing Officer",
    specialty: "Surgical Nursing",
    status: "Pending",
    expiry: "—",
    registered: "2026-11-02",
  },
  {
    id: "PSN-2026-00144",
    name: "Grace Anderson",
    hospital: "Our Lady of Apostles Hospital",
    ward: "Paediatrics",
    cadre: "Registered Nurse",
    specialty: "Paediatric Nursing",
    status: "Flagged",
    expiry: "2027-03-20",
    registered: "2026-11-01",
  },
  {
    id: "PSN-2026-00145",
    name: "Michael Brown",
    hospital: "Plateau Specialist Hospital",
    ward: "Medical",
    cadre: "Nursing Officer",
    specialty: "Medical Nursing",
    status: "Approved",
    expiry: "2026-11-20",
    registered: "2026-10-28",
  },
  {
    id: "PSN-2026-00146",
    name: "Elizabeth James",
    hospital: "Bingham University Teaching Hospital",
    ward: "Maternity",
    cadre: "Senior Nursing Officer",
    specialty: "Midwifery",
    status: "Suspended",
    expiry: "2027-06-11",
    registered: "2026-10-25",
  },
  {
    id: "PSN-2026-00147",
    name: "Samuel Thomas",
    hospital: "General Hospital Barkin Ladi",
    ward: "Outpatient",
    cadre: "Registered Nurse",
    specialty: "Community Health",
    status: "Revoked",
    expiry: "—",
    registered: "2026-10-19",
  },
  {
    id: "PSN-2026-00148",
    name: "Mary Peters",
    hospital: "Jos University Teaching Hospital",
    ward: "Intensive Care",
    cadre: "Nursing Officer",
    specialty: "Critical Care",
    status: "Approved",
    expiry: "2027-12-05",
    registered: "2026-10-15",
  },
];

const statusOptions = [
  "All statuses",
  "Approved",
  "Pending",
  "Flagged",
  "Suspended",
  "Revoked",
];

function AdminNurseRegistry() {
  const navigate = useNavigate();

  const [nurses] = useState(initialNurses);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [hospitalFilter, setHospitalFilter] = useState("All hospitals");
  const [cadreFilter, setCadreFilter] = useState("All cadres");
  const [wardFilter, setWardFilter] = useState("All wards");

  const hospitals = useMemo(
    () => [...new Set(nurses.map((nurse) => nurse.hospital))],
    [nurses],
  );

  const cadres = useMemo(
    () => [...new Set(nurses.map((nurse) => nurse.cadre))],
    [nurses],
  );

  const wards = useMemo(
    () => [...new Set(nurses.map((nurse) => nurse.ward))],
    [nurses],
  );

  const filteredNurses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return nurses.filter((nurse) => {
      const matchesSearch =
        !query ||
        nurse.name.toLowerCase().includes(query) ||
        nurse.id.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All statuses" ||
        nurse.status === statusFilter;

      const matchesHospital =
        hospitalFilter === "All hospitals" ||
        nurse.hospital === hospitalFilter;

      const matchesCadre =
        cadreFilter === "All cadres" || nurse.cadre === cadreFilter;

      const matchesWard =
        wardFilter === "All wards" || nurse.ward === wardFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesHospital &&
        matchesCadre &&
        matchesWard
      );
    });
  }, [
    nurses,
    search,
    statusFilter,
    hospitalFilter,
    cadreFilter,
    wardFilter,
  ]);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All statuses");
    setHospitalFilter("All hospitals");
    setCadreFilter("All cadres");
    setWardFilter("All wards");
  };

  const counts = {
    total: nurses.length,
    approved: nurses.filter((nurse) => nurse.status === "Approved").length,
    pending: nurses.filter((nurse) => nurse.status === "Pending").length,
    restricted: nurses.filter((nurse) =>
      ["Suspended", "Revoked"].includes(nurse.status),
    ).length,
  };

  const summaryCards = [
    {
      label: "Total Registered Nurses",
      value: counts.total,
      detail: "Across all hospitals",
      icon: Users,
      color: "blue",
    },
    {
      label: "Approved Records",
      value: counts.approved,
      detail: "Approved registrations",
      icon: ShieldCheck,
      color: "green",
    },
    {
      label: "Pending Applications",
      value: counts.pending,
      detail: "Awaiting review",
      icon: Clock,
      color: "orange",
    },
    {
      label: "Restricted Records",
      value: counts.restricted,
      detail: "Suspended or revoked",
      icon: AlertTriangle,
      color: "red",
    },
  ];

  return (
    <div className="admin-registry">
      <header className="registry-page-heading">
        <div>
          <span className="registry-eyebrow">REGISTRY MANAGEMENT</span>
          <h1>Nurse Registry</h1>
          <p>
            Search and inspect nursing professional records across all
            registered hospitals.
          </p>
        </div>
      </header>

      <section className="registry-summary-grid">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <article className="registry-summary-card" key={card.label}>
              <div className={`registry-summary-icon ${card.color}`}>
                <Icon size={23} />
              </div>

              <div>
                <span>{card.label}</span>
                <strong>{card.value.toLocaleString()}</strong>
                <small>{card.detail}</small>
              </div>
            </article>
          );
        })}
      </section>

      <section className="registry-panel">
        <div className="registry-panel-heading">
          <div>
            <h2>Professional Register</h2>
            <p>
              Showing {filteredNurses.length} of {nurses.length} demonstration
              records.
            </p>
          </div>
        </div>

        <div className="registry-filters">
          <label className="registry-search">
            <Search size={19} />
            <input
              type="search"
              placeholder="Search nurse name or NANNM ID"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <label className="registry-filter-control">
            <span>Licence status</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>

          <label className="registry-filter-control">
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

          <label className="registry-filter-control">
            <span>Cadre</span>
            <select
              value={cadreFilter}
              onChange={(event) => setCadreFilter(event.target.value)}
            >
              <option>All cadres</option>
              {cadres.map((cadre) => (
                <option key={cadre}>{cadre}</option>
              ))}
            </select>
          </label>

          <label className="registry-filter-control">
            <span>Ward</span>
            <select
              value={wardFilter}
              onChange={(event) => setWardFilter(event.target.value)}
            >
              <option>All wards</option>
              {wards.map((ward) => (
                <option key={ward}>{ward}</option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="registry-reset-button"
            onClick={resetFilters}
          >
            <RotateCcw size={17} />
            Reset filters
          </button>
        </div>

        <div className="registry-table-wrapper">
          <table className="registry-table">
            <thead>
              <tr>
                <th>Nurse</th>
                <th>NANNM ID</th>
                <th>Hospital</th>
                <th>Ward</th>
                <th>Cadre</th>
                <th>Licence Status</th>
                <th>Expiry Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredNurses.map((nurse) => (
                <tr key={nurse.id}>
                  <td>
                    <div className="registry-nurse-name">
                      <span className="registry-avatar">
                        {nurse.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </span>
                      <strong>{nurse.name}</strong>
                    </div>
                  </td>
                  <td className="registry-id">{nurse.id}</td>
                  <td>{nurse.hospital}</td>
                  <td>{nurse.ward}</td>
                  <td>{nurse.cadre}</td>
                  <td>
                    <span
                      className={`registry-status ${nurse.status.toLowerCase()}`}
                    >
                      {nurse.status}
                    </span>
                  </td>
                  <td>{nurse.expiry}</td>
                  <td>
                    <button
                      type="button"
                      className="registry-view-button"
                      onClick={() =>
                        navigate(`/admin/nurses/${encodeURIComponent(nurse.id)}`)
                      }
                    >
                      <Eye size={17} />
                      View profile
                    </button>
                  </td>
                </tr>
              ))}

              {filteredNurses.length === 0 && (
                <tr>
                  <td colSpan="8" className="registry-empty">
                    <Filter size={24} />
                    <strong>No matching records</strong>
                    <span>Try changing your search or filters.</span>
                    <button type="button" onClick={resetFilters}>
                      <X size={16} />
                      Clear filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <p className="registry-demo-notice">
        Demonstration records only. Live nurse records and licence information
        will be supplied by the registry API.
      </p>
    </div>
  );
}

export default AdminNurseRegistry;