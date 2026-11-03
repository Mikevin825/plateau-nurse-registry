import { useEffect, useState } from "react";
import { Bell, Clock, FileCheck, Info, Mail, ShieldCheck } from "lucide-react";
import "./NurseNotifications.css";
import { getNurseActivity } from "../apiService";

function NurseNotifications() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    let active = true;
    getNurseActivity(token).then((activity) => {
      const reminders = activity.notifications.map((item) => ({
        id: `notification-${item.id}`, type: "reminder", title: "Licence expiry reminder",
        message: `Your licence expiry date is ${new Date(item.licence_expiry).toLocaleDateString()}. Reminder status: ${item.status}.`,
        date: item.sent_at ? new Date(item.sent_at).toLocaleDateString() : "Pending dispatch",
      }));
      const docs = activity.documents.map((item) => ({
        id: `document-${item.id}`, type: "licence", title: `${item.document_type === "renewal" ? "Renewal" : "Initial licence"} document ${item.decision}`,
        message: item.reason || "Your document review status is shown above.",
        date: new Date(item.uploaded_at).toLocaleDateString(),
      }));
      if (active) setItems([...reminders, ...docs]);
    }).catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [token]);

  return <div className="nurse-notifications-page"><main className="notifications-container">
    <div className="notifications-heading"><div><span className="notifications-eyebrow">NURSE PORTAL</span><h1>Notifications</h1><p>Registry reminders and document review updates for your account.</p></div><div className="notifications-count"><Bell size={19} /><span>{items.length} updates</span></div></div>
    <section className="notifications-summary"><div className="notifications-summary-icon"><Mail size={22} /></div><div><strong>Registry activity</strong><p>Updates are loaded from your licence documents and recorded expiry reminders.</p></div></section>
    <section className="notifications-panel"><div className="notifications-toolbar"><div><h2>Recent updates</h2><span>{items.length} total</span></div></div>
      <div className="notifications-list">{loading ? <p>Loading updates…</p> : error ? <p role="alert">{error}</p> : items.length ? items.map((item) => <article className="notification-item" key={item.id}><div className={`notification-icon ${item.type}`}>{item.type === "reminder" ? <Clock size={19} /> : item.type === "licence" ? <FileCheck size={19} /> : <ShieldCheck size={19} />}</div><div className="notification-content"><div className="notification-title-row"><h3>{item.title}</h3></div><p>{item.message}</p><div className="notification-meta"><span><Clock size={13} />{item.date}</span></div></div></article>) : <div className="notifications-empty"><div><Info size={27} /></div><h3>No registry updates</h3><p>New reminders and document decisions will appear here when recorded.</p></div>}</div>
    </section>
  </main></div>;
}

export default NurseNotifications;
