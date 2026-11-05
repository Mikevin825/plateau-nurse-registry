import {
  UserRound,
  FileCheck,
  CreditCard,
  ShieldCheck,
  Clock3,
  AlertCircle,
  ArrowUpRight,
  Calendar,
  RefreshCw,
} from "lucide-react";
import "./NurseDashboard.css";
import useNurseProfile from "../hooks/useNurseProfile";
import { resolveMediaUrl } from "../apiService";

function NurseDashboard() {
  const { nurse, loading, error } = useNurseProfile();

  if (loading) {
    return (
      <section className="dashboard-content">
        <div className="dashboard-welcome">
          <div>
            <span className="dashboard-eyebrow">NURSE PORTAL</span>
            <h1>Welcome back, Nurse</h1>
            <p>Loading your account...</p>
          </div>

          <div className="dashboard-date">
            <Clock3 size={17} />
            <span>Account overview</span>
          </div>
        </div>
      </section>
    );
  }
  if (error || !nurse)
    return (
      <section className="dashboard-content">
        <p role="alert">{error || "We could not load your nurse record."}</p>
      </section>
    );

  const expiryDisplay = nurse?.licence_expiry
    ? new Date(nurse.licence_expiry).toLocaleDateString()
    : "Not yet confirmed";

  return (
    <section className="dashboard-content">
      <div className="dashboard-welcome">
        <div>
          <span className="dashboard-eyebrow">NURSE PORTAL</span>
          <h1>Welcome back, {nurse?.full_name || "Nurse"}</h1>
          <p>Here's an overview of your professional registry account.</p>
        </div>

        <div className="dashboard-date">
          <Clock3 size={17} />
          <span>Account overview</span>
        </div>
      </div>

      {/* Status cards */}
      <div className="dashboard-stats">
        <article className="stat-card">
          <div className="stat-card-top">
            <span>Registration status</span>
            <div className="stat-icon green">
              <ShieldCheck size={21} />
            </div>
          </div>

          <h2>{nurse?.record_status || "Pending Review"}</h2>
          <span className="stat-description">
            Awaiting officer verification
          </span>
        </article>

        <article className="stat-card">
          <div className="stat-card-top">
            <span>Licence status</span>
            <div className="stat-icon blue">
              <FileCheck size={21} />
            </div>
          </div>

          <h2>{nurse?.licence_status || "Not Verified"}</h2>
          <span className="stat-description">Licence review is pending</span>
        </article>

        <article className="stat-card">
          <div className="stat-card-top">
            <span>Registry ID</span>
            <div className="stat-icon purple">
              <CreditCard size={21} />
            </div>
          </div>

          <h2>{(nurse && nurse.nanm_id) || "Not Issued"}</h2>
          <span className="stat-description">
            Issued after registration approval
          </span>
        </article>
      </div>

      {/* Registration notice */}
      <section className="dashboard-notice">
        <div className="notice-icon">
          <AlertCircle size={22} />
        </div>

        <div className="notice-content">
          <h3>
            {nurse && nurse.record_status === "approved"
              ? "Registration approved"
              : "Your registration is under review"}
          </h3>
          <p>
            {nurse && nurse.record_status === "approved"
              ? "Your NANNM Registry ID is: " + (nurse.nanm_id || "pending")
              : "Your submitted information and documents are awaiting verification by an authorised registry officer. Your NANNM Registry ID will be issued after approval."}
          </p>
        </div>

        <ArrowUpRight size={20} className="notice-arrow" />
      </section>

      {/* Lower dashboard sections */}
      <div className="dashboard-lower-grid">
        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <h3>Professional Information</h3>
              <p>Your registered professional details</p>
            </div>

            <UserRound size={20} />
          </div>

          <div className="profile-placeholder">
            <div className="profile-avatar">
              {nurse?.photo ? (
                <img
                  src={resolveMediaUrl(nurse.photo)}
                  alt={`${nurse.full_name} profile`}
                />
              ) : (
                <UserRound size={30} />
              )}
            </div>

            <div>
              <h4>
                {(nurse && nurse.full_name) || "Profile not yet verified"}
              </h4>
              <p>
                {(nurse && nurse.employer) ||
                  "Your approved details will appear here."}
              </p>
            </div>
          </div>

          <div className="panel-divider"></div>

          <div className="profile-detail">
            <span>Licence number</span>
            <strong>
              {(nurse && nurse.licence_number) || "Pending verification"}
            </strong>
          </div>

          <div className="profile-detail">
            <span>Current employer</span>
            <strong>
              {(nurse && nurse.employer) || "Pending verification"}
            </strong>
          </div>

          <div className="profile-detail">
            <span>Professional cadre</span>
            <strong>{(nurse && nurse.cadre) || "Pending verification"}</strong>
          </div>
        </section>

        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <h3>Licence & Renewal</h3>
              <p>Manage your professional licence</p>
            </div>
            <RefreshCw size={20} />
          </div>

          <div className="licence-info">
            <div className="licence-status-row">
              <span>Current licence status</span>
              <span
                className={`licence-status-badge ${nurse.licence_status?.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {nurse.licence_status || "Not verified"}
              </span>
            </div>

            <div className="licence-expiry-box">
              <div className="licence-expiry-icon">
                <Calendar size={20} />
              </div>
              <div>
                <span>Licence expiry date</span>
                <strong>{expiryDisplay}</strong>
              </div>
            </div>

            <div className="licence-renewal-message">
              {nurse.licence_status === "Licensed" && (
                <p>
                  Your licence is valid. Keep track of your expiry date to renew
                  on time.
                </p>
              )}

              {nurse.licence_status === "Expiring soon" && (
                <p>
                  Your licence is approaching its expiry date. Please prepare
                  your renewal documents.
                </p>
              )}

              {nurse.licence_status === "Expired" && (
                <p>
                  Your licence has expired. Contact the registry for guidance on
                  renewal.
                </p>
              )}

              {[
                "Pending",
                "Rejected",
                "Flagged",
                "Suspended",
                "Revoked",
              ].includes(nurse.licence_status) && (
                <p>
                  Renewal is currently unavailable. Please contact the registry
                  for further guidance.
                </p>
              )}

              {!nurse.licence_status && (
                <p>Your licence information is not yet available.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default NurseDashboard;
