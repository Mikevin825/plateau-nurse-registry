import { useEffect, useState } from "react";
import { AlertCircle, CalendarDays, FileCheck, History, Upload } from "lucide-react";
import "./LicenceManagement.css";
import { getNurseActivity, uploadRenewal } from "../apiService";
import useNurseProfile from "../hooks/useNurseProfile";

function LicenceManagement() {
  const { nurse, loading: profileLoading, error: profileError, token } = useNurseProfile();
  const [documents, setDocuments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function refresh() {
    const activity = await getNurseActivity(token);
    setDocuments(activity.documents);
    setNotifications(activity.notifications);
  }
  useEffect(() => {
    let active = true;
    if (!token) return () => { active = false; };
    getNurseActivity(token).then((activity) => {
      if (active) { setDocuments(activity.documents); setNotifications(activity.notifications); }
    }).catch((error) => { if (active) setMessage(error.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [token]);

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get("file");
    if (!file || file.size > 10 * 1024 * 1024) {
      setMessage("Choose a licence scan no larger than 10 MB.");
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      await uploadRenewal(file, data.get("licence_expiry"), token);
      await refresh();
      form.reset();
      setMessage("Renewal document submitted for review.");
    } catch (error) { setMessage(error.message); }
    finally { setBusy(false); }
  }

  if (profileLoading || loading) return <div className="licence-page"><main className="licence-content"><p>Loading licence information…</p></main></div>;
  if (profileError || !nurse) return <div className="licence-page"><main className="licence-content"><p role="alert">{profileError || "Nurse record unavailable."}</p></main></div>;

  return <div className="licence-page"><main className="licence-content">
    <div className="licence-heading"><div><span className="licence-eyebrow">NURSE PORTAL</span><h1>Licence &amp; Renewal</h1><p>Track your licence and submit a renewed document for registry review.</p></div></div>
    <section className="licence-panel">
      <div className="licence-panel-heading"><div className="licence-panel-icon"><FileCheck size={20} /></div><div><span>CURRENT LICENCE</span><h2>{nurse.licence_status || nurse.record_status}</h2></div></div>
      <div className="licence-details-grid"><div><span>NMCN licence number</span><strong>{nurse.licence_number}</strong></div><div><span>Expiry date</span><strong>{nurse.licence_expiry ? new Date(nurse.licence_expiry).toLocaleDateString() : "Not confirmed"}</strong></div><div><span>Registration status</span><strong>{nurse.record_status}</strong></div></div>
    </section>
    <section className="licence-panel"><div className="licence-panel-heading"><div><h3>Submit a renewal</h3><p>Upload the new licence document. Registry staff will review it before updating your record.</p></div></div>
      {nurse.record_status === "approved" ? <form onSubmit={submit}><label htmlFor="renewal-expiry">New licence expiry date</label><input id="renewal-expiry" name="licence_expiry" type="date" min={new Date().toISOString().slice(0, 10)} required /><label htmlFor="renewal-file">Licence document (PDF, JPG or PNG)</label><input id="renewal-file" name="file" type="file" accept=".pdf,.jpg,.jpeg,.png" required /><button type="submit" disabled={busy}><Upload size={17} />{busy ? "Submitting…" : "Submit renewal"}</button></form> : <p>Renewals are available after your registration is approved.</p>}
      {message && <p role="status">{message}</p>}
    </section>
    <section className="licence-panel"><div className="licence-panel-heading"><div className="licence-panel-icon"><History size={20} /></div><div><h3>Document review history</h3><p>Review decisions and any notes from registry staff.</p></div></div>
      {documents.length ? documents.map((doc) => <article key={doc.id}><strong>{doc.document_type === "renewal" ? "Renewal" : "Initial licence"}</strong> · {doc.decision} · {new Date(doc.uploaded_at).toLocaleDateString()}{doc.reason && <p>Reason: {doc.reason}</p>}</article>) : <p>No licence documents have been submitted.</p>}
    </section>
    <section className="licence-panel"><div className="licence-panel-heading"><div className="licence-panel-icon"><AlertCircle size={20} /></div><div><h3>Expiry reminders</h3><p>Registry notifications associated with your licence.</p></div></div>
      {notifications.length ? notifications.map((note) => <p key={note.id}><CalendarDays size={16} /> Expiry {new Date(note.licence_expiry).toLocaleDateString()} · {note.status}</p>) : <p>No expiry reminders are recorded.</p>}
    </section>
  </main></div>;
}

export default LicenceManagement;
