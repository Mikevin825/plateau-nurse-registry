
import { useEffect, useState } from "react";
import {
  Bell,
  Clock,
  FileCheck,
  Info,
  Mail,
  ShieldCheck,
  CheckCheck,
  X,
} from "lucide-react";
import "./NurseNotifications.css";
import { getNurseActivity } from "../apiService";

const READ_STORAGE_KEY = "nurse-notification-read-state";

function getSavedReadIds() {
  try {
    return new Set(JSON.parse(localStorage.getItem(READ_STORAGE_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

function NurseNotifications() {
  const [items, setItems] = useState([]);
  const [readIds, setReadIds] = useState(getSavedReadIds);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const unreadCount = items.filter((item) => !readIds.has(item.id)).length;

  useEffect(() => {
    let active = true;

    getNurseActivity(token)
      .then((activity) => {
        const reminders = activity.notifications.map((item) => ({
          id: `notification-${item.id}`,
          type: "reminder",
          title: "Licence expiry reminder",
          message: `Your licence expiry date is ${new Date(item.licence_expiry).toLocaleDateString()}. Reminder status: ${item.status}.`,
          date: item.sent_at
            ? new Date(item.sent_at).toLocaleDateString()
            : "Pending dispatch",
        }));

        const docs = activity.documents.map((item) => ({
          id: `document-${item.id}`,
          type: "licence",
          title: `${item.document_type === "renewal" ? "Renewal" : "Initial licence"} document ${item.decision}`,
          message: item.reason || "Your document review status is shown above.",
          date: new Date(item.uploaded_at).toLocaleDateString(),
        }));

        if (active) setItems([...reminders, ...docs]);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [token]);

  useEffect(() => {
    localStorage.setItem(READ_STORAGE_KEY, JSON.stringify([...readIds]));
  }, [readIds]);

  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedItem(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem]);

  function openNotification(item) {
    setReadIds((previous) => new Set([...previous, item.id]));
    setSelectedItem(item);
  }

  function markAllAsRead() {
    setReadIds((previous) => {
      const updated = new Set(previous);
      items.forEach((item) => updated.add(item.id));
      return updated;
    });
  }

  return (
    <div className="nurse-notifications-page">
      <main className="notifications-container">
        <div className="notifications-heading">
          <div>
            <span className="notifications-eyebrow">NURSE PORTAL</span>
            <h1>Notifications</h1>
            <p>Registry reminders and document review updates for your account.</p>
          </div>
          <div className="notifications-count">
            <Bell size={19} />
            <span>{items.length} updates</span>
          </div>
        </div>

        <section className="notifications-summary">
          <div className="notifications-summary-icon">
            <Mail size={22} />
          </div>
          <div>
            <strong>Registry activity</strong>
            <p>
              Updates are loaded from your licence documents and recorded
              expiry reminders.
            </p>
          </div>
        </section>

        <section className="notifications-panel">
          <div className="notifications-toolbar">
            <div>
              <h2>Recent updates</h2>
              <span>
                {items.length} total · {unreadCount} unread
              </span>
            </div>

            <button
              type="button"
              className="mark-all-read"
              onClick={markAllAsRead}
              disabled={loading || unreadCount === 0}
            >
              <CheckCheck size={17} />
              Mark all as read
            </button>
          </div>

          <div className="notifications-list">
            {loading ? (
              <p>Loading updates…</p>
            ) : error ? (
              <p role="alert">{error}</p>
            ) : items.length ? (
              items.map((item) => {
                const isRead = readIds.has(item.id);

                return (
                  <article
                    className={`notification-item ${isRead ? "read" : "unread"}`}
                    key={item.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`${item.title}. ${isRead ? "Read" : "Unread"}. Open notification details.`}
                    onClick={() => openNotification(item)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openNotification(item);
                      }
                    }}
                  >
                    <div className={`notification-icon ${item.type}`}>
                      {item.type === "reminder" ? (
                        <Clock size={19} />
                      ) : item.type === "licence" ? (
                        <FileCheck size={19} />
                      ) : (
                        <ShieldCheck size={19} />
                      )}
                    </div>

                    <div className="notification-content">
                      <div className="notification-title-row">
                        <h3>{item.title}</h3>
                        {!isRead && (
                          <span
                            className="notification-unread-dot"
                            aria-label="Unread"
                          />
                        )}
                      </div>

                      <p>{item.message}</p>

                      <div className="notification-meta">
                        <span>
                          <Clock size={13} />
                          {item.date}
                        </span>
                        <span className="notification-open-hint">
                          Click to view
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="notifications-empty">
                <div>
                  <Info size={27} />
                </div>
                <h3>No registry updates</h3>
                <p>
                  New reminders and document decisions will appear here when
                  recorded.
                </p>
              </div>
            )}
          </div>
        </section>

        {selectedItem && (
          <div
            className="notification-modal-overlay"
            onClick={() => setSelectedItem(null)}
          >
            <section
              className="notification-details-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="notification-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="notification-modal-header">
                <div>
                  <span className="notifications-eyebrow">
                    NURSE PORTAL UPDATE
                  </span>
                  <h2 id="notification-modal-title">
                    Notification details
                  </h2>
                </div>

                <button
                  type="button"
                  className="notification-modal-close"
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close notification"
                >
                  <X size={21} />
                </button>
              </header>

              <div className="notification-modal-body">
                <div
                  className={`notification-icon ${selectedItem.type}`}
                >
                  {selectedItem.type === "reminder" ? (
                    <Clock size={22} />
                  ) : (
                    <FileCheck size={22} />
                  )}
                </div>

                <div>
                  <span className="notification-modal-label">TITLE</span>
                  <h3>{selectedItem.title}</h3>
                </div>

                <div>
                  <span className="notification-modal-label">MESSAGE</span>
                  <p>{selectedItem.message}</p>
                </div>

                <div>
                  <span className="notification-modal-label">DATE</span>
                  <p>{selectedItem.date}</p>
                </div>
              </div>

              <footer className="notification-modal-footer">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                >
                  Close
                </button>
              </footer>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default NurseNotifications;
