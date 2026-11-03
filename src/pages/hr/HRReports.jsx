
import { useMemo, useState } from "react";
import {
  Download,
  FileText,
  Users,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Search,
  RotateCcw,
  CalendarDays,
} from "lucide-react";
import "./HRReports.css";

// Synthetic demonstration data.
// Replace with hospital-scoped API data during backend integration.
const initialRecords = [
  {
    id: 1,
    name: "Sarah Johnson",
    nannmId: "NUR-2024-001",
    ward: "Emergency",
    cadre: "Senior Nurse",
    status: "Active",
    expiry: "2027-08-14",
    registered: "2024-02-12",
  },
  {
    id: 2,
    name: "David Williams",
    nannmId: "NUR-2023-014",
    ward: "Paediatrics",
    cadre: "Staff Nurse",
    status: "Expiring Soon",
    expiry: "2026-12-15",
    registered: "2023-06-20",
  },
  {
    id: 3,
    name: "Grace Anderson",
    nannmId: "NUR-2022-028",
    ward: "Maternity",
    cadre: "Nurse Midwife",
    status: "Expired",
    expiry: "2026-09-30",
    registered: "2022-04-18",
  },
  {
    id: 4,
    name: "Michael Brown",
    nannmId: "NUR-2024-037",
    ward: "Surgery",
    cadre: "Senior Nurse",
    status: "Active",
    expiry: "2027-05-22",
    registered: "2024-09-03",
  },
  {
    id: 5,
    name: "Elizabeth James",
    nannmId: "NUR-2021-042",
    ward: "Outpatient",
    cadre: "Staff Nurse",
    status: "Suspended",
    expiry: "2027-01-10",
    registered: "2021-11-09",
  },
  {
    id: 6,
    name: "Samuel Thomas",
    nannmId: "NUR-2023-056",
    ward: "Emergency",
    cadre: "Nurse Specialist",
    status: "Active",
    expiry: "2027-11-02",
    registered: "2023-03-15",
  },
  {
    id: 7,
    name: "Rebecca Paul",
    nannmId: "NUR-2025-061",
    ward: "Maternity",
    cadre: "Staff Nurse",
    status: "Revoked",
    expiry: "2026-07-19",
    registered: "2025-01-17",
  },
];

const statusOptions = [
  "All statuses",
  "Active",
  "Expiring Soon",
  "Expired",
  "Suspended",
  "Revoked",
];

function formatDate(date) {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function escapeCsv(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

export default function HRReports() {
  const [records] = useState(initialRecords);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        !query ||
        record.name.toLowerCase().includes(query) ||
        record.nannmId.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All statuses" ||
        record.status === statusFilter;

      const matchesStartDate =
        !dateFrom || record.registered >= dateFrom;

      const matchesEndDate =
        !dateTo || record.registered <= dateTo;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesStartDate &&
        matchesEndDate
      );
    });
  }, [records, search, statusFilter, dateFrom, dateTo]);

  const summary = useMemo(() => ({
    total: filteredRecords.length,
    active: filteredRecords.filter(
      (record) => record.status === "Active"
    ).length,
    expiring: filteredRecords.filter(
      (record) => record.status === "Expiring Soon"
    ).length,
    expired: filteredRecords.filter(
      (record) => record.status === "Expired"
    ).length,
    restricted: filteredRecords.filter(
      (record) =>
        record.status === "Suspended" ||
        record.status === "Revoked"
    ).length,
  }), [filteredRecords]);

  function resetFilters() {
    setSearch("");
    setStatusFilter("All statuses");
    setDateFrom("");
    setDateTo("");
  }

  function exportCsv() {
    const headers = [
      "Nurse Name",
      "NANNM ID",
      "Ward",
      "Cadre",
      "Licence Status",
      "Licence Expiry",
      "Registration Date",
    ];

    const rows = filteredRecords.map((record) => [
      record.name,
      record.nannmId,
      record.ward,
      record.cadre,
      record.status,
      record.expiry,
      record.registered,
    ]);

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\r\n");

    const blob = new Blob(
      ["\uFEFF", csv],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "hospital-nurse-registry-report.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  const hasFilters =
    search ||
    statusFilter !== "All statuses" ||
    dateFrom ||
    dateTo;

  return (
    <div className="hr-reports-page">
      <header className="hr-reports-header">
        <div>
          <span className="hr-reports-eyebrow">
            HOSPITAL REPORTING
          </span>
          <h1>Reports & Exports</h1>
          <p>
            Review your hospital's nurse registry and
            generate reports using permitted workforce data.
          </p>
        </div>

        <button
          type="button"
          className="hr-reports-export-button"
          onClick={exportCsv}
          disabled={filteredRecords.length === 0}
        >
          <Download size={19} />
          Export CSV
        </button>
      </header>

      <section className="hr-reports-summary">
        <article className="hr-reports-summary-card">
          <div className="hr-reports-summary-icon blue">
            <Users size={22} />
          </div>
          <div>
            <span>Total Nurses</span>
            <strong>{summary.total}</strong>
          </div>
        </article>

        <article className="hr-reports-summary-card">
          <div className="hr-reports-summary-icon green">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <span>Active Licences</span>
            <strong>{summary.active}</strong>
          </div>
        </article>

        <article className="hr-reports-summary-card">
          <div className="hr-reports-summary-icon amber">
            <Clock3 size={22} />
          </div>
          <div>
            <span>Expiring Soon</span>
            <strong>{summary.expiring}</strong>
          </div>
        </article>

        <article className="hr-reports-summary-card">
          <div className="hr-reports-summary-icon red">
            <AlertTriangle size={22} />
          </div>
          <div>
            <span>Expired Licences</span>
            <strong>{summary.expired}</strong>
          </div>
        </article>

        <article className="hr-reports-summary-card">
          <div className="hr-reports-summary-icon purple">
            <FileText size={22} />
          </div>
          <div>
            <span>Suspended / Revoked</span>
            <strong>{summary.restricted}</strong>
          </div>
        </article>
      </section>

      <section className="hr-reports-panel">
        <div className="hr-reports-panel-heading">
          <div>
            <h2>Registry Report</h2>
            <p>
              Filter your hospital's nurse records before
              exporting.
            </p>
          </div>
        </div>

        <div className="hr-reports-filters">
          <label className="hr-reports-search">
            <span>Search nurses</span>
            <div className="hr-reports-input-wrap">
              <Search size={19} />
              <input
                type="search"
                placeholder="Name or NANNM ID"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </label>

          <label className="hr-reports-filter-field">
            <span>Licence status</span>
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <label className="hr-reports-filter-field">
            <span>Registered from</span>
            <div className="hr-reports-input-wrap">
              <CalendarDays size={18} />
              <input
                type="date"
                value={dateFrom}
                max={dateTo || undefined}
                onChange={(event) => setDateFrom(event.target.value)}
              />
            </div>
          </label>

          <label className="hr-reports-filter-field">
            <span>Registered to</span>
            <div className="hr-reports-input-wrap">
              <CalendarDays size={18} />
              <input
                type="date"
                value={dateTo}
                min={dateFrom || undefined}
                onChange={(event) => setDateTo(event.target.value)}
              />
            </div>
          </label>

          <button
            type="button"
            className="hr-reports-reset-button"
            onClick={resetFilters}
            disabled={!hasFilters}
          >
            <RotateCcw size={17} />
            Reset
          </button>
        </div>

        <div className="hr-reports-results-heading">
          <div>
            <h3>Report Results</h3>
            <span>
              {filteredRecords.length}{" "}
              {filteredRecords.length === 1 ? "record" : "records"} found
            </span>
          </div>

          <button
            type="button"
            className="hr-reports-export-text-button"
            onClick={exportCsv}
            disabled={filteredRecords.length === 0}
          >
            <Download size={17} />
            Download report
          </button>
        </div>

        <div className="hr-reports-table-scroll">
          <table className="hr-reports-table">
            <thead>
              <tr>
                <th>Nurse</th>
                <th>NANNM ID</th>
                <th>Ward</th>
                <th>Cadre</th>
                <th>Licence Status</th>
                <th>Licence Expiry</th>
                <th>Registration Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <strong>{record.name}</strong>
                    </td>
                    <td>{record.nannmId}</td>
                    <td>{record.ward}</td>
                    <td>{record.cadre}</td>
                    <td>
                      <span
                        className={`hr-reports-status hr-reports-status-${record.status
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td>{formatDate(record.expiry)}</td>
                    <td>{formatDate(record.registered)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="hr-reports-empty">
                    No records match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="hr-reports-footer">
          <span>
            Showing {filteredRecords.length} of {records.length} records
          </span>
          <span>
            Report data is restricted to this hospital.
          </span>
        </div>
      </section>

      <aside className="hr-reports-notice">
        <FileText size={20} />
        <p>
          <strong>Data access notice:</strong> Reports contain
          permitted workforce and licence information only.
          Private contact details, NIN, licence numbers and
          administrative audit logs are not included.
        </p>
      </aside>
    </div>
  );
}
