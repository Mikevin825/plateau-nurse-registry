import { useCallback, useEffect, useState } from "react";
import { getRenewalQueue, reviewRenewal } from "../../apiService";

export default function RenewalReview() {
  const token = localStorage.getItem("token");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(null);
  const refresh = useCallback(async () => setRows(await getRenewalQueue(token)), [token]);
  useEffect(() => {
    let active = true;
    getRenewalQueue(token).then((data) => { if (active) setRows(data); })
      .catch((err) => { if (active) setError(err.message); });
    return () => { active = false; };
  }, [token]);

  async function decide(row, action) {
    const reason = action === "reject" ? window.prompt("Reason for rejecting this renewal:") : "";
    if (action === "reject" && !reason?.trim()) return;
    setBusy(row.id); setError("");
    try { await reviewRenewal(row.id, action, token, reason); await refresh(); }
    catch (err) { setError(err.message); }
    finally { setBusy(null); }
  }
  return <section className="admin-dashboard"><section className="admin-page-heading"><div><span className="admin-eyebrow">REGISTRY ADMINISTRATION</span><h1>Licence renewal review</h1><p>Review uploaded licence documents and proposed expiry dates.</p></div></section>
    {error && <p role="alert">{error}</p>}{rows.length === 0 && !error && <p>No renewal documents are waiting for review.</p>}
    {rows.map((row) => <article className="admin-panel" key={row.id}><h2>{row.name}</h2><p>{row.nanm_id || "NANNM ID pending"} · {row.employer}</p><p>Licence {row.licence_number} · proposed expiry {row.proposed_expiry || "not supplied"}</p><p>Submitted {new Date(row.uploaded_at).toLocaleDateString()}</p><button type="button" disabled={busy === row.id} onClick={() => decide(row, "approve")}>Approve renewal</button>{" "}<button type="button" disabled={busy === row.id} onClick={() => decide(row, "reject")}>Reject</button></article>)}
  </section>;
}
