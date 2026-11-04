import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { verifyNursePublic } from "../apiService";
import "./PublicVerify.css";

const Icon = ({ children, size = 20 }) => <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{children}</svg>;

export default function PublicVerify() {
  const [registryId, setRegistryId] = useState("");
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef(null);
  const submitRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (result && !dialog.open) dialog.showModal();
  }, [result]);

  function closeResult() {
    if (dialogRef.current?.open) dialogRef.current.close();
    setResult(null);
    requestAnimationFrame(() => submitRef.current?.focus());
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true); setResult(null); setErrorMessage("");
    try { setResult(await verifyNursePublic(registryId.trim().toUpperCase())); }
    catch (error) { setErrorMessage(error.message || "Nurse not found. Check the Registry ID and try again."); }
    finally { setLoading(false); }
  }

  return <main className="verify-page">
    <header className="auth-navbar"><Link to="/" className="brand"><span className="brand-icon"><Icon size={25}><path d="M12 3 19 6v5c0 5-3.2 8-7 10-3.8-2-7-5-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/></Icon></span><span className="brand-text"><strong>Nurse Registry</strong><small>PLATEAU STATE</small></span></Link><Link to="/" className="back-link">←&nbsp; Back to home</Link></header>
    <section className="verify-container">
      <div className="verify-heading"><span className="portal-label">PUBLIC VERIFICATION</span><h1>Verify a nurse’s credentials</h1><p>Confirm registration and current licence status with the Plateau State Nurse Registry.</p></div>
      <div className="verify-card"><div className="verify-card-heading"><h2>Search nurse registry</h2><p>Enter the Registry ID printed on the nurse’s identification card.</p></div>
        <form className="verify-form" onSubmit={handleSubmit}><div className="form-group"><label htmlFor="registry-id">Registry ID</label><input ref={submitRef} type="text" id="registry-id" placeholder="e.g. PLT-NUR-000001" value={registryId} onChange={e => setRegistryId(e.target.value)} required aria-describedby={errorMessage ? "verify-error" : undefined} />{errorMessage && <p className="verify-error" id="verify-error" role="alert">{errorMessage}</p>}</div><button ref={undefined} type="submit" className="verify-submit" disabled={loading}>{loading ? "Checking registry…" : "Verify nurse"}</button></form>
        <div className="verify-privacy"><Icon size={17}><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/></Icon><p>Public verification shows limited professional information. Personal identification numbers and private documents are never displayed.</p></div>
      </div>
    </section>
    <footer className="auth-footer"><p>© {new Date().getFullYear()} Plateau State Nurse Registry. All rights reserved.</p></footer>
    <dialog ref={dialogRef} className="verify-dialog" aria-labelledby="verify-dialog-title" onClose={() => { setResult(null); requestAnimationFrame(() => submitRef.current?.focus()); }} onKeyDown={event => { if (event.key === "Tab") { const nodes = [...dialogRef.current.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]; if (!nodes.length) return; if (event.shiftKey && document.activeElement === nodes[0]) { event.preventDefault(); nodes.at(-1).focus(); } else if (!event.shiftKey && document.activeElement === nodes.at(-1)) { event.preventDefault(); nodes[0].focus(); } } }}>
      {result && <div className="verify-dialog-content"><button ref={closeRef} className="verify-dialog-close" type="button" onClick={closeResult} aria-label="Close verification result">×</button><span className="verify-dialog-kicker">REGISTRY RESULT</span><h2 id="verify-dialog-title">Nurse credentials</h2>{result.photo_url && <img className="verify-photo" src={result.photo_url} alt={`${result.full_name} registry photo`} />}<p className="verify-nurse-name">{result.full_name}</p><p className="verify-registry-id">{result.nanm_id}</p><dl className="verify-result-details"><div><dt>Licence status</dt><dd>{result.licence_status}</dd></div><div><dt>Employer</dt><dd>{result.employer || "Not disclosed"}</dd></div>{result.licence_expiry && <div><dt>Licence expiry</dt><dd>{result.licence_expiry}</dd></div>}</dl><button className="verify-submit" type="button" onClick={closeResult}>Done</button></div>}
    </dialog>
  </main>;
}
