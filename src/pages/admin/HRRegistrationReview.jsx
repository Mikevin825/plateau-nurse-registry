import { useEffect, useState } from "react";
import { getHRReviewQueue, reviewHRRegistration } from "../../apiService";

export default function HRRegistrationReview({ embedded = false }) {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(null);
  const token = localStorage.getItem("token");

  async function refresh() {
    try { setRows(await getHRReviewQueue(token)); setError(""); }
    catch (err) { setError(err.message); }
  }
  useEffect(() => {
    let active = true;
    getHRReviewQueue(token).then((data) => { if (active) { setRows(data); setError(""); } })
      .catch((err) => { if (active) setError(err.message); });
    return () => { active = false; };
  }, [token]);

  async function decide(id, action) {
    setBusy(id);
    try { await reviewHRRegistration(id, action, token); await refresh(); }
    catch (err) { setError(err.message); }
    finally { setBusy(null); }
  }

  return <section className={embedded ? "admin-embedded-review" : "hr-dashboard"}>{!embedded && <header className="hr-dashboard-heading"><div><span className="hr-dashboard-eyebrow">SUPER ADMINISTRATION</span><h1>Hospital registration review</h1><p>Approve or reject requests for institutional access.</p></div></header>}
    {error && <p role="alert">{error}</p>}
    {!error && rows.length === 0 && <p>No pending hospital registrations.</p>}
    {rows.map((row) => <article className="hr-directory-panel" key={row.id}>
      <h2>{row.hospital_name}</h2><p>{row.email} · {row.employer_type} · {row.lga}</p>
      {row.contact_email && <p>Contact: {row.contact_email}</p>}
      <button disabled={busy === row.id} onClick={() => decide(row.id, "approve")}>Approve</button>{" "}
      <button disabled={busy === row.id} onClick={() => decide(row.id, "reject")}>Reject</button>
    </article>)}
  </section>;
}
