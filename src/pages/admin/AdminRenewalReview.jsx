
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  FileText,
  UserRound,
  CalendarDays,
  ShieldCheck,
  Clock3,
  AlertCircle,
  Eye,
} from "lucide-react";
import "./AdminRenewalReview.css";

const renewalRecords = {
  "PSN-2026-00142": {
    id: "PSN-2026-00142",
    name: "Sarah Johnson",
    initials: "SJ",
    hospital: "Plateau Specialist Hospital",
    ward: "Emergency",
    cadre: "Registered Nurse",
    specialty: "Emergency Nursing",
    currentExpiry: "20 November 2026",
    submitted: "28 October 2026",
    status: "Pending",
    documents: [
      {
        name: "Renewal Application Form",
        filename: "renewal-application-sample.pdf",
        description: "Submitted renewal application",
      },
      {
        name: "Continuing Professional Development",
        filename: "cpd-certificate-sample.pdf",
        description: "Synthetic CPD certificate",
      },
      {
        name: "Payment Evidence",
        filename: "payment-evidence-sample.pdf",
        description: "Synthetic payment evidence",
      },
    ],
    history: [
      {
        date: "14 August 2026",
        action: "Licence issued",
        actor: "Registry Administration",
      },
      {
        date: "28 October 2026",
        action: "Renewal application submitted",
        actor: "Registry Officer",
      },
    ],
  },

  "PSN-2026-00146": {
    id: "PSN-2026-00146",
    name: "Elizabeth James",
    initials: "EJ",
    hospital: "Bingham University Teaching Hospital",
    ward: "Maternity",
    cadre: "Senior Nursing Officer",
    specialty: "Midwifery",
    currentExpiry: "8 November 2026",
    submitted: "25 October 2026",
    status: "Pending",
    documents: [
      {
        name: "Renewal Application Form",
        filename: "renewal-application-sample.pdf",
        description: "Submitted renewal application",
      },
      {
        name: "Continuing Professional Development",
        filename: "cpd-certificate-sample.pdf",
        description: "Synthetic CPD certificate",
      },
      {
        name: "Payment Evidence",
        filename: "payment-evidence-sample.pdf",
        description: "Synthetic payment evidence",
      },
    ],
    history: [
      {
        date: "11 June 2026",
        action: "Licence issued",
        actor: "Registry Administration",
      },
      {
        date: "25 October 2026",
        action: "Renewal application submitted",
        actor: "Registry Officer",
      },
    ],
  },

  "PSN-2026-00148": {
    id: "PSN-2026-00148",
    name: "Mary Peters",
    initials: "MP",
    hospital: "Jos University Teaching Hospital",
    ward: "Intensive Care",
    cadre: "Nursing Officer",
    specialty: "Critical Care",
    currentExpiry: "5 December 2026",
    submitted: "20 October 2026",
    status: "Approved",
    documents: [
      {
        name: "Renewal Application Form",
        filename: "renewal-application-sample.pdf",
        description: "Submitted renewal application",
      },
      {
        name: "Continuing Professional Development",
        filename: "cpd-certificate-sample.pdf",
        description: "Synthetic CPD certificate",
      },
      {
        name: "Payment Evidence",
        filename: "payment-evidence-sample.pdf",
        description: "Synthetic payment evidence",
      },
    ],
    history: [
      {
        date: "5 December 2025",
        action: "Previous licence issued",
        actor: "Registry Administration",
      },
      {
        date: "20 October 2026",
        action: "Renewal application submitted",
        actor: "Registry Officer",
      },
      {
        date: "22 October 2026",
        action: "Renewal approved",
        actor: "Super Administrator",
      },
    ],
  },

  "PSN-2026-00155": {
    id: "PSN-2026-00155",
    name: "Catherine James",
    initials: "CJ",
    hospital: "Plateau Specialist Hospital",
    ward: "Medical",
    cadre: "Registered Nurse",
    specialty: "Medical Nursing",
    currentExpiry: "15 October 2026",
    submitted: "12 October 2026",
    status: "Rejected",
    documents: [
      {
        name: "Renewal Application Form",
        filename: "renewal-application-sample.pdf",
        description: "Submitted renewal application",
      },
      {
        name: "Continuing Professional Development",
        filename: "cpd-certificate-sample.pdf",
        description: "Synthetic CPD certificate",
      },
      {
        name: "Payment Evidence",
        filename: "payment-evidence-sample.pdf",
        description: "Synthetic payment evidence",
      },
    ],
    history: [
      {
        date: "15 October 2025",
        action: "Licence issued",
        actor: "Registry Administration",
      },
      {
        date: "12 October 2026",
        action: "Renewal application submitted",
        actor: "Registry Officer",
      },
      {
        date: "14 October 2026",
        action: "Renewal rejected",
        actor: "Super Administrator",
      },
    ],
  },

  "PSN-2026-00156": {
    id: "PSN-2026-00156",
    name: "Daniel Peters",
    initials: "DP",
    hospital: "General Hospital Barkin Ladi",
    ward: "Outpatient",
    cadre: "Nursing Officer",
    specialty: "Community Health",
    currentExpiry: "30 November 2026",
    submitted: "30 October 2026",
    status: "Pending",
    documents: [
      {
        name: "Renewal Application Form",
        filename: "renewal-application-sample.pdf",
        description: "Submitted renewal application",
      },
      {
        name: "Continuing Professional Development",
        filename: "cpd-certificate-sample.pdf",
        description: "Synthetic CPD certificate",
      },
      {
        name: "Payment Evidence",
        filename: "payment-evidence-sample.pdf",
        description: "Synthetic payment evidence",
      },
    ],
    history: [
      {
        date: "30 November 2025",
        action: "Licence issued",
        actor: "Registry Administration",
      },
      {
        date: "30 October 2026",
        action: "Renewal application submitted",
        actor: "Registry Officer",
      },
    ],
  },

  "PSN-2026-00157": {
    id: "PSN-2026-00157",
    name: "Rebecca Thomas",
    initials: "RT",
    hospital: "Our Lady of Apostles Hospital",
    ward: "Paediatrics",
    cadre: "Registered Nurse",
    specialty: "Paediatric Nursing",
    currentExpiry: "18 September 2026",
    submitted: "10 September 2026",
    status: "Approved",
    documents: [
      {
        name: "Renewal Application Form",
        filename: "renewal-application-sample.pdf",
        description: "Submitted renewal application",
      },
      {
        name: "Continuing Professional Development",
        filename: "cpd-certificate-sample.pdf",
        description: "Synthetic CPD certificate",
      },
      {
        name: "Payment Evidence",
        filename: "payment-evidence-sample.pdf",
        description: "Synthetic payment evidence",
      },
    ],
    history: [
      {
        date: "18 September 2025",
        action: "Licence issued",
        actor: "Registry Administration",
      },
      {
        date: "10 September 2026",
        action: "Renewal application submitted",
        actor: "Registry Officer",
      },
      {
        date: "12 September 2026",
        action: "Renewal approved",
        actor: "Super Administrator",
      },
    ],
  },
};

function AdminRenewalReview() {
  const { renewalId } = useParams();
  const renewal = renewalRecords[renewalId];

  const [decision, setDecision] = useState("");
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");

  if (!renewal) {
    return (
      <div className="admin-renewal-review-page">
        <div className="admin-renewal-not-found">
          <AlertCircle size={36} />
          <h1>Renewal application not found</h1>
          <p>
            The requested renewal application could not be found in the
            demonstration records.
          </p>
          <Link to="/admin/renewals">Return to Licence Renewals</Link>
        </div>
      </div>
    );
  }

  const isPending = renewal.status === "Pending";

  const handleDecision = (nextDecision) => {
    if (!isPending) return;

    if (nextDecision === "Rejected" && !reason.trim()) {
      setFeedback("A reason is required when rejecting a renewal.");
      return;
    }

    setDecision(nextDecision);
    setFeedback(
      `${nextDecision} decision recorded in this demonstration only. No backend record has been changed.`
    );
  };

  return (
    <div className="admin-renewal-review-page">
      <Link to="/admin/renewals" className="admin-renewal-back-link">
        <ArrowLeft size={18} />
        Back to Licence Renewals
      </Link>

      <div className="admin-renewal-review-heading">
        <div>
          <span className="admin-renewal-review-eyebrow">
            REGULATORY ADMINISTRATION / LICENCE RENEWALS
          </span>
          <h1>Renewal Application Review</h1>
          <p>
            Examine the submitted information and make a final renewal
            decision.
          </p>
        </div>

        <span
          className={`admin-renewal-review-status ${renewal.status.toLowerCase()}`}
        >
          {renewal.status}
        </span>
      </div>

      <div className="admin-renewal-review-demo-notice">
        <AlertCircle size={19} />
        <p>
          <strong>Demonstration workspace:</strong> Nurse information and
          documents are synthetic. Decisions are temporary frontend state and
          are not saved to a backend.
        </p>
      </div>

      <section className="admin-renewal-review-card">
        <div className="admin-renewal-review-card-heading">
          <UserRound size={20} />
          <h2>Nurse Information</h2>
        </div>

        <div className="admin-renewal-review-nurse">
          <div className="admin-renewal-review-avatar">
            {renewal.initials}
          </div>
          <div>
            <h3>{renewal.name}</h3>
            <span>{renewal.id}</span>
          </div>
        </div>

        <div className="admin-renewal-review-details-grid">
          <div>
            <span>Hospital</span>
            <strong>{renewal.hospital}</strong>
          </div>
          <div>
            <span>Ward / Department</span>
            <strong>{renewal.ward}</strong>
          </div>
          <div>
            <span>Cadre</span>
            <strong>{renewal.cadre}</strong>
          </div>
          <div>
            <span>Specialty</span>
            <strong>{renewal.specialty}</strong>
          </div>
        </div>
      </section>

      <section className="admin-renewal-review-card">
        <div className="admin-renewal-review-card-heading">
          <ShieldCheck size={20} />
          <h2>Current Licence Information</h2>
        </div>

        <div className="admin-renewal-review-details-grid">
          <div>
            <span>Current Licence Expiry</span>
            <strong>{renewal.currentExpiry}</strong>
          </div>
          <div>
            <span>Renewal Submitted</span>
            <strong>{renewal.submitted}</strong>
          </div>
          <div>
            <span>Application Status</span>
            <strong>{renewal.status}</strong>
          </div>
          <div>
            <span>Application Reference</span>
            <strong>{renewal.id}</strong>
          </div>
        </div>
      </section>

      <section className="admin-renewal-review-card">
        <div className="admin-renewal-review-card-heading">
          <FileText size={20} />
          <h2>Submitted Documents</h2>
        </div>

        <p className="admin-renewal-section-description">
          These entries represent synthetic document records. Actual secure
          document previews will be connected to permission-checked backend
          endpoints.
        </p>

        <div className="admin-renewal-document-list">
          {renewal.documents.map((document) => (
            <div className="admin-renewal-document" key={document.name}>
              <div className="admin-renewal-document-icon">
                <FileText size={21} />
              </div>
              <div className="admin-renewal-document-info">
                <strong>{document.name}</strong>
                <span>{document.description}</span>
                <small>{document.filename}</small>
              </div>
              <span className="admin-renewal-document-placeholder">
                Preview unavailable
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-renewal-review-card">
        <div className="admin-renewal-review-card-heading">
          <Clock3 size={20} />
          <h2>Review History</h2>
        </div>

        <div className="admin-renewal-history">
          {renewal.history.map((entry, index) => (
            <div className="admin-renewal-history-item" key={`${entry.date}-${index}`}>
              <div className="admin-renewal-history-marker" />
              <div>
                <strong>{entry.action}</strong>
                <span>
                  <CalendarDays size={14} />
                  {entry.date}
                </span>
                <small>{entry.actor}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-renewal-review-card admin-renewal-decision-card">
        <div className="admin-renewal-review-card-heading">
          <Eye size={20} />
          <h2>Final Decision</h2>
        </div>

        {isPending && !decision ? (
          <>
            <p className="admin-renewal-section-description">
              Review all submitted information before making a final decision.
              Rejection requires a documented reason.
            </p>

            <label
              className="admin-renewal-reason-label"
              htmlFor="renewal-decision-reason"
            >
              Decision reason
              <span>(Required for rejection)</span>
            </label>

            <textarea
              id="renewal-decision-reason"
              value={reason}
              onChange={(event) => {
                setReason(event.target.value);
                setFeedback("");
              }}
              placeholder="Enter the reason for rejection, if applicable..."
              rows={4}
            />

            {feedback && (
              <p className="admin-renewal-feedback" role="alert">
                {feedback}
              </p>
            )}

            <div className="admin-renewal-decision-actions">
              <button
                type="button"
                className="admin-renewal-approve-button"
                onClick={() => handleDecision("Approved")}
              >
                <CheckCircle2 size={18} />
                Approve Renewal
              </button>

              <button
                type="button"
                className="admin-renewal-reject-button"
                onClick={() => handleDecision("Rejected")}
              >
                <XCircle size={18} />
                Reject Renewal
              </button>
            </div>
          </>
        ) : (
          <div className="admin-renewal-decision-result">
            <CheckCircle2 size={22} />
            <div>
              <strong>
                {decision
                  ? `Demonstration decision: ${decision}`
                  : `Application already ${renewal.status.toLowerCase()}`}
              </strong>
              <p>
                {decision
                  ? feedback
                  : "This application is not awaiting a decision in the current demonstration data."}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminRenewalReview;
