import { useEffect, useState } from "react";
import {
  Search,
  Pencil,
  Eye,
  Check,
  X,
  FileText,
  RefreshCw,
} from "lucide-react";
import {
  createAdminNurse,
  deleteAdminNurse,
  getAdminDocument,
  getAdminNurses,
  getCurrentUser,
  getEmployerOptions,
  reviewAdminNurse,
  updateAdminNurse,
} from "../../apiService";
import "./AdminRecords.css";

const token = () => localStorage.getItem("token");

export default function AdminNurses() {
  const [rows, setRows] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [reasonRequest, setReasonRequest] = useState(null);
  const [reason, setReason] = useState("");

  async function refresh() {
    try {
      setRows(await getAdminNurses(token(), { search, status }));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }
  useEffect(() => {
    let active = true;
    getAdminNurses(token(), { search, status })
      .then((data) => {
        if (active) {
          setRows(data);
          setError("");
        }
      })
      .catch((err) => {
        if (active) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, [search, status]);
  useEffect(() => {
    getEmployerOptions()
      .then(setEmployers)
      .catch(() => setEmployers([]));
  }, []);
  useEffect(() => {
    getCurrentUser(token())
      .then((user) => setIsAdmin(user.role === "super_admin"))
      .catch(() => {});
  }, []);

  async function openDocument(doc) {
    const tab = window.open("about:blank", "_blank", "noopener,noreferrer");
    try {
      const blob = await getAdminDocument(doc.id, token());
      const url = URL.createObjectURL(blob);
      if (tab) tab.location = url;
      else {
        const link = document.createElement("a");
        link.href = url;
        link.download = "registry-document";
        link.click();
      }
      window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (err) {
      if (tab) tab.close();
      setError(err.message);
    }
  }

  async function decide(row, action, reasonText = "") {
    const needsReason = !(
      row.record_status === "pending" && action === "approve"
    );
    if (needsReason && !reasonText.trim()) {
      setReasonRequest({ row, action });
      setReason("");
      return;
    }
    reasonText = reasonText.trim();
    setBusy(true);
    setError("");
    try {
      await reviewAdminNurse(row.id, action, reasonText, token());
      await refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function save(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      if (isCreating) await createAdminNurse(data, token());
      else await updateAdminNurse(selected.id, data, token());
      setSelected(null);
      setIsCreating(false);
      await refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(row) {
    if (
      !window.confirm(
        `Permanently delete ${row.full_name}'s nurse profile and login account? This cannot be undone.`,
      )
    )
      return;
    setBusy(true);
    setError("");
    try {
      await deleteAdminNurse(row.id, token());
      await refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="admin-records">
      <header className="admin-records-heading">
        <div>
          <span className="admin-eyebrow">REGISTRY RECORDS</span>
          <h1>Nurse registry</h1>
          <p>
            Search records, review applications and correct nurse details or
            documents.
          </p>
        </div>
        {isAdmin && (
          <button
            className="admin-records-button primary"
            type="button"
            onClick={() => {
              setSelected({
                documents: [],
                employer_id: employers[0]?.id || "",
              });
              setIsCreating(true);
            }}
          >
            <Pencil size={15} /> Add nurse
          </button>
        )}
      </header>
      {error && (
        <p className="admin-records-error" role="alert">
          {error}
        </p>
      )}
      <form
        className="admin-records-toolbar"
        onSubmit={(event) => {
          event.preventDefault();
          setSearch(query.trim());
        }}
      >
        <label className="admin-records-search">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, email, ID, licence or hospital"
            aria-label="Search nurse records"
          />
        </label>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="flagged">Flagged</option>
          <option value="suspended">Suspended</option>
          <option value="revoked">Revoked</option>
        </select>
        <button className="admin-records-button secondary" type="submit">
          <Search size={16} /> Search
        </button>
      </form>
      <div className="admin-records-panel">
        <div className="admin-records-count">
          {rows.length} records shown{" "}
          <button
            type="button"
            className="admin-records-icon-button"
            onClick={refresh}
            aria-label="Refresh list"
          >
            <RefreshCw size={16} />
          </button>
        </div>
        {rows.length === 0 ? (
          <p className="admin-records-empty">No matching nurse records.</p>
        ) : (
          <div className="admin-records-table-wrap">
            <table className="admin-records-table">
              <thead>
                <tr>
                  <th>Nurse</th>
                  <th>Employer</th>
                  <th>Licence</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <strong>{row.full_name}</strong>
                      <small>
                        {row.nanm_id || `Request ${row.id}`} · {row.email}
                      </small>
                    </td>
                    <td>
                      {row.employer}
                      <small>{row.ward || "Ward not set"}</small>
                    </td>
                    <td>
                      {row.licence_number}
                      <small>Expires {row.licence_expiry}</small>
                    </td>
                    <td>
                      <span
                        className={`admin-status-chip ${row.record_status}`}
                      >
                        {row.record_status}
                      </span>
                    </td>
                    <td className="admin-record-actions">
                      <button
                        type="button"
                        className="admin-records-button secondary"
                        onClick={() => {
                          setSelected(row);
                          setIsCreating(false);
                        }}
                      >
                        <Pencil size={15} />{" "}
                        {isAdmin ? "Details / edit" : "View"}
                      </button>
                      {row.record_status === "pending" && (
                        <>
                          <button
                            type="button"
                            disabled={busy}
                            className="admin-records-button success"
                            onClick={() => decide(row, "approve")}
                          >
                            <Check size={15} /> Approve
                          </button>
                          <button
                            type="button"
                            disabled={busy}
                            className="admin-records-button danger"
                            onClick={() => decide(row, "reject")}
                          >
                            <X size={15} /> Reject
                          </button>
                          <button
                            type="button"
                            disabled={busy}
                            className="admin-records-button secondary"
                            onClick={() => decide(row, "flag")}
                          >
                            Flag
                          </button>
                        </>
                      )}
                      {row.record_status === "approved" && (
                        <>
                          <button
                            type="button"
                            disabled={busy}
                            className="admin-records-button danger"
                            onClick={() => decide(row, "suspend")}
                          >
                            Suspend
                          </button>
                          <button
                            type="button"
                            disabled={busy}
                            className="admin-records-button danger"
                            onClick={() => decide(row, "revoke")}
                          >
                            Revoke
                          </button>
                        </>
                      )}
                      {row.record_status === "suspended" && (
                        <>
                          <button
                            type="button"
                            disabled={busy}
                            className="admin-records-button success"
                            onClick={() => decide(row, "reinstate")}
                          >
                            Reinstate
                          </button>
                          <button
                            type="button"
                            disabled={busy}
                            className="admin-records-button danger"
                            onClick={() => decide(row, "revoke")}
                          >
                            Revoke
                          </button>
                        </>
                      )}
                      {row.record_status === "flagged" && (
                        <>
                          <button
                            type="button"
                            disabled={busy}
                            className="admin-records-button success"
                            onClick={() => decide(row, "approve")}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            disabled={busy}
                            className="admin-records-button danger"
                            onClick={() => decide(row, "reject")}
                          >
                            Reject
                          </button>
                          <button
                            type="button"
                            disabled={busy}
                            className="admin-records-button danger"
                            onClick={() => decide(row, "revoke")}
                          >
                            Revoke
                          </button>
                        </>
                      )}
                      {row.record_status === "rejected" && (
                        <button
                          type="button"
                          disabled={busy}
                          className="admin-records-button secondary"
                          onClick={() => decide(row, "reopen")}
                        >
                          Reopen
                        </button>
                      )}
                      {row.record_status === "revoked" && (
                        <small>Terminal status</small>
                      )}
                      {isAdmin && (
                        <button
                          type="button"
                          disabled={busy}
                          className="admin-records-button danger"
                          onClick={() => remove(row)}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selected && (
        <div
          className="admin-record-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelected(null);
              setIsCreating(false);
            }
          }}
        >
          <section
            className="admin-record-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="nurse-edit-title"
          >
            <header>
              <div>
                <span className="admin-eyebrow">NURSE RECORD</span>
                <h2 id="nurse-edit-title">
                  {isCreating ? "Add a nurse account" : selected.full_name}
                </h2>
                <p>{selected.nanm_id || "Application pending"}</p>
              </div>
              <button
                type="button"
                className="admin-records-icon-button"
                onClick={() => {
                  setSelected(null);
                  setIsCreating(false);
                }}
                aria-label="Close editor"
              >
                <X />
              </button>
            </header>
            <div className="admin-record-documents">
              <strong>Uploaded documents</strong>
              {selected.documents?.length ? (
                selected.documents.map((doc) => (
                  <button
                    type="button"
                    key={doc.id}
                    onClick={() => openDocument(doc)}
                  >
                    <FileText size={16} /> {doc.document_type} · {doc.decision}{" "}
                    <span>Open</span>
                  </button>
                ))
              ) : (
                <p>No licence documents uploaded.</p>
              )}
            </div>
            <form className="admin-record-edit-form" onSubmit={save}>
              <fieldset disabled={!isAdmin}>
                <label>
                  Full name
                  <input
                    name="full_name"
                    defaultValue={selected.full_name || ""}
                    required
                  />
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    defaultValue={selected.email || ""}
                    required
                  />
                </label>
                <label>
                  Phone
                  <input
                    name="phone"
                    defaultValue={selected.phone || ""}
                    required
                  />
                </label>
                {!isCreating && (
                  <label>
                    NIN correction
                    <input
                      name="nin"
                      inputMode="numeric"
                      minLength="11"
                      maxLength="11"
                      placeholder={
                        selected.nin_last4
                          ? `Current ends in ${selected.nin_last4}`
                          : "Enter 11 digits to set"
                      }
                    />
                  </label>
                )}
                <label>
                  Licence number
                  <input
                    name="licence_number"
                    defaultValue={selected.licence_number || ""}
                    required
                  />
                </label>
                <label>
                  Licence expiry
                  <input
                    name="licence_expiry"
                    type="date"
                    defaultValue={selected.licence_expiry || ""}
                    required
                  />
                </label>
                <label>
                  Specialty
                  <input
                    name="specialty"
                    defaultValue={selected.specialty || ""}
                  />
                </label>
                <label>
                  Cadre
                  <input name="cadre" defaultValue={selected.cadre || ""} />
                </label>
                <label>
                  Employer
                  <select
                    name="employer"
                    defaultValue={
                      selected.employer_id || employers[0]?.id || ""
                    }
                    required
                  >
                    {employers.map((employer) => (
                      <option value={employer.id} key={employer.id}>
                        {employer.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Ward
                  <input name="ward" defaultValue={selected.ward || ""} />
                </label>
                {!isCreating && (
                  <label>
                    Account access
                    <select
                      name="is_active"
                      defaultValue={String(selected.user_is_active)}
                    >
                      <option value="true">Enabled</option>
                      <option value="false">Disabled</option>
                    </select>
                  </label>
                )}
                {isCreating && (
                  <label>
                    Temporary password
                    <input
                      name="password"
                      type="password"
                      minLength="12"
                      autoComplete="new-password"
                      required
                    />
                  </label>
                )}
                {!isCreating && (
                  <label>
                    Reset/set password (optional)
                    <input
                      name="password"
                      type="password"
                      minLength="12"
                      autoComplete="new-password"
                    />
                  </label>
                )}
                <label>
                  Replace photo
                  <input name="photo" type="file" accept="image/*" />
                </label>
                <label>
                  Replace/add licence document
                  <input
                    name="licence_scan"
                    type="file"
                    accept="image/*,.pdf"
                  />
                </label>
                {!isCreating && (
                  <label>
                    Replace existing document
                    <select name="document_id" defaultValue="">
                      <option value="">Add as a new document</option>
                      {selected.documents?.map((doc) => (
                        <option value={doc.id} key={doc.id}>
                          {doc.document_type} ({doc.decision})
                        </option>
                      ))}
                    </select>
                  </label>
                )}
              </fieldset>
              <footer>
                <button
                  type="button"
                  className="admin-records-button secondary"
                  onClick={() => {
                    setSelected(null);
                    setIsCreating(false);
                  }}
                >
                  Close
                </button>
                {isAdmin && (
                  <button
                    className="admin-records-button primary"
                    disabled={busy}
                  >
                    {busy
                      ? "Saving…"
                      : isCreating
                        ? "Create nurse account"
                        : "Save corrections"}
                  </button>
                )}
              </footer>
            </form>
          </section>
        </div>
      )}

      {reasonRequest && (
        <div className="admin-record-modal-backdrop" role="presentation">
          <section
            className="admin-record-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reason-title"
          >
            <header>
              <div>
                <span className="admin-eyebrow">REVIEW REASON</span>
                <h2 id="reason-title">
                  {reasonRequest.action[0].toUpperCase() +
                    reasonRequest.action.slice(1)}{" "}
                  {reasonRequest.row.full_name}
                </h2>
                <p>
                  This reason will be recorded in the registry audit history.
                </p>
              </div>
            </header>
            <label>
              Reason
              <textarea
                autoFocus
                rows="4"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
              />
            </label>
            <footer>
              <button
                type="button"
                className="admin-records-button secondary"
                onClick={() => setReasonRequest(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-records-button primary"
                disabled={!reason.trim() || busy}
                onClick={async () => {
                  const request = reasonRequest;
                  setReasonRequest(null);
                  await decide(request.row, request.action, reason);
                }}
              >
                Continue
              </button>
            </footer>
          </section>
        </div>
      )}
    </section>
  );
}
