import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  UserRound,
  ShieldCheck,
  Building2,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Ban,
  Flag,
  CalendarDays,
  LockKeyhole,
  Info,
} from "lucide-react";
import "./AdminNurseProfile.css";

// Synthetic demonstration record.
// Replace with the Django API response during integration.
const demoNurses = {
  "PSN-2026-00142": {
    name: "Sarah Johnson",
    initials: "SJ",
    id: "PSN-2026-00142",
    dateOfBirth: "14 March 1995",
    phone: "+234 800 000 0001",
    email: "sarah.demo@example.test",
    nin: "00000000000",
    licenceNumber: "NMCN/RN/DEMO/001",
    licenceExpiry: "14 August 2027",
    hospital: "Plateau Specialist Hospital",
    ward: "Emergency",
    cadre: "Registered Nurse",
    specialty: "Emergency Nursing",
    registrationDate: "02 November 2026",
    status: "Approved",
    reviewingOfficer: "Registry Officer",
    consentDate: "02 November 2026, 10:15 AM",
    flags: [],
    history: [
      {
        action: "Registration submitted",
        detail: "Initial registration record created.",
        actor: "Registry Officer",
        date: "02 November 2026, 10:15 AM",
      },
      {
        action: "Licence approved",
        detail: "Registration approved and NANNM ID issued.",
        actor: "Super Admin",
        date: "02 November 2026, 11:30 AM",
      },
    ],
  },

  "PSN-2026-00143": {
    name: "David Williams",
    initials: "DW",
    id: "PSN-2026-00143",
    dateOfBirth: "08 June 1989",
    phone: "+234 800 000 0002",
    email: "david.demo@example.test",
    nin: "00000000000",
    licenceNumber: "NMCN/RN/DEMO/002",
    licenceExpiry: "Not supplied",
    hospital: "Jos University Teaching Hospital",
    ward: "Surgical",
    cadre: "Senior Nursing Officer",
    specialty: "Surgical Nursing",
    registrationDate: "02 November 2026",
    status: "Pending",
    reviewingOfficer: "Registry Officer",
    consentDate: "02 November 2026, 09:40 AM",
    flags: [],
    history: [
      {
        action: "Registration submitted",
        detail: "Application is awaiting administrative review.",
        actor: "Registry Officer",
        date: "02 November 2026, 09:40 AM",
      },
    ],
  },

  "PSN-2026-00144": {
    name: "Grace Anderson",
    initials: "GA",
    id: "PSN-2026-00144",
    dateOfBirth: "Not supplied",
    phone: "Not supplied",
    email: "Not supplied",
    nin: "DEMO ONLY — NOT A REAL NIN",
    licenceNumber: "NMCN/RN/DEMO/003",
    licenceExpiry: "20 March 2027",
    hospital: "Our Lady of Apostles Hospital",
    ward: "Paediatrics",
    cadre: "Registered Nurse",
    specialty: "Paediatric Nursing",
    registrationDate: "01 November 2026",
    status: "Flagged",
    reviewingOfficer: "Registry Officer",
    consentDate: "01 November 2026",
    flags: ["Record requires further investigation."],
    history: [
      {
        action: "Registration submitted",
        detail: "Initial registration record created.",
        actor: "Registry Officer",
        date: "01 November 2026",
      },
      {
        action: "Record flagged",
        detail: "Record referred for further investigation.",
        actor: "Super Admin",
        date: "01 November 2026",
      },
    ],
  },

  "PSN-2026-00145": {
    name: "Michael Brown",
    initials: "MB",
    id: "PSN-2026-00145",
    dateOfBirth: "Not supplied",
    phone: "Not supplied",
    email: "Not supplied",
    nin: "DEMO ONLY — NOT A REAL NIN",
    licenceNumber: "NMCN/RN/DEMO/004",
    licenceExpiry: "20 November 2026",
    hospital: "Plateau Specialist Hospital",
    ward: "Medical",
    cadre: "Nursing Officer",
    specialty: "Medical Nursing",
    registrationDate: "28 October 2026",
    status: "Approved",
    reviewingOfficer: "Registry Officer",
    consentDate: "28 October 2026",
    flags: [],
    history: [
      {
        action: "Registration submitted",
        detail: "Initial registration record created.",
        actor: "Registry Officer",
        date: "28 October 2026",
      },
      {
        action: "Licence approved",
        detail: "Registration approved and NANNM ID issued.",
        actor: "Super Admin",
        date: "28 October 2026",
      },
    ],
  },

  "PSN-2026-00146": {
    name: "Elizabeth James",
    initials: "EJ",
    id: "PSN-2026-00146",
    dateOfBirth: "Not supplied",
    phone: "Not supplied",
    email: "Not supplied",
    nin: "DEMO ONLY — NOT A REAL NIN",
    licenceNumber: "NMCN/RN/DEMO/005",
    licenceExpiry: "11 June 2027",
    hospital: "Bingham University Teaching Hospital",
    ward: "Maternity",
    cadre: "Senior Nursing Officer",
    specialty: "Midwifery",
    registrationDate: "25 October 2026",
    status: "Suspended",
    reviewingOfficer: "Registry Officer",
    consentDate: "25 October 2026",
    flags: [],
    history: [
      {
        action: "Registration submitted",
        detail: "Initial registration record created.",
        actor: "Registry Officer",
        date: "25 October 2026",
      },
      {
        action: "Record suspended",
        detail: "Record restricted pending further review.",
        actor: "Super Admin",
        date: "25 October 2026",
      },
    ],
  },

  "PSN-2026-00147": {
    name: "Samuel Thomas",
    initials: "ST",
    id: "PSN-2026-00147",
    dateOfBirth: "Not supplied",
    phone: "Not supplied",
    email: "Not supplied",
    nin: "DEMO ONLY — NOT A REAL NIN",
    licenceNumber: "NMCN/RN/DEMO/006",
    licenceExpiry: "Not supplied",
    hospital: "General Hospital Barkin Ladi",
    ward: "Outpatient",
    cadre: "Registered Nurse",
    specialty: "Community Health",
    registrationDate: "19 October 2026",
    status: "Revoked",
    reviewingOfficer: "Registry Officer",
    consentDate: "19 October 2026",
    flags: [],
    history: [
      {
        action: "Registration submitted",
        detail: "Initial registration record created.",
        actor: "Registry Officer",
        date: "19 October 2026",
      },
      {
        action: "Licence revoked",
        detail: "Record permanently revoked in this demonstration.",
        actor: "Super Admin",
        date: "19 October 2026",
      },
    ],
  },

  "PSN-2026-00148": {
    name: "Mary Peters",
    initials: "MP",
    id: "PSN-2026-00148",
    dateOfBirth: "Not supplied",
    phone: "Not supplied",
    email: "Not supplied",
    nin: "DEMO ONLY — NOT A REAL NIN",
    licenceNumber: "NMCN/RN/DEMO/007",
    licenceExpiry: "05 December 2027",
    hospital: "Jos University Teaching Hospital",
    ward: "Intensive Care",
    cadre: "Nursing Officer",
    specialty: "Critical Care",
    registrationDate: "15 October 2026",
    status: "Approved",
    reviewingOfficer: "Registry Officer",
    consentDate: "15 October 2026",
    flags: [],
    history: [
      {
        action: "Registration submitted",
        detail: "Initial registration record created.",
        actor: "Registry Officer",
        date: "15 October 2026",
      },
      {
        action: "Licence approved",
        detail: "Registration approved and NANNM ID issued.",
        actor: "Super Admin",
        date: "15 October 2026",
      },
    ],
  },

    "PSN-2026-00149": {
    name: "Catherine James",
    initials: "CJ",
    id: "PSN-2026-00149",
    dateOfBirth: "Not supplied",
    phone: "Not supplied",
    email: "Not supplied",
    nin: "DEMO ONLY — NOT A REAL NIN",
    licenceNumber: "NMCN/RN/DEMO/008",
    licenceExpiry: "Not supplied",
    hospital: "Plateau Specialist Hospital",
    ward: "Medical",
    cadre: "Registered Nurse",
    specialty: "Medical Nursing",
    registrationDate: "03 November 2026",
    status: "Pending",
    reviewingOfficer: "Registry Officer",
    consentDate: "03 November 2026",
    flags: [],
    history: [
      {
        action: "Registration submitted",
        detail: "Application is awaiting administrative review.",
        actor: "Registry Officer",
        date: "03 November 2026",
      },
    ],
  },

  "PSN-2026-00150": {
    name: "Daniel Peters",
    initials: "DP",
    id: "PSN-2026-00150",
    dateOfBirth: "Not supplied",
    phone: "Not supplied",
    email: "Not supplied",
    nin: "DEMO ONLY — NOT A REAL NIN",
    licenceNumber: "NMCN/RN/DEMO/009",
    licenceExpiry: "Not supplied",
    hospital: "Bingham University Teaching Hospital",
    ward: "Intensive Care",
    cadre: "Nursing Officer",
    specialty: "Critical Care",
    registrationDate: "03 November 2026",
    status: "Pending",
    reviewingOfficer: "Registry Officer",
    consentDate: "03 November 2026",
    flags: [],
    history: [
      {
        action: "Registration submitted",
        detail: "Application is awaiting administrative review.",
        actor: "Registry Officer",
        date: "03 November 2026",
      },
    ],
  },

  "PSN-2026-00151": {
    name: "Rebecca Thomas",
    initials: "RT",
    id: "PSN-2026-00151",
    dateOfBirth: "Not supplied",
    phone: "Not supplied",
    email: "Not supplied",
    nin: "DEMO ONLY — NOT A REAL NIN",
    licenceNumber: "NMCN/RN/DEMO/010",
    licenceExpiry: "Not supplied",
    hospital: "Our Lady of Apostles Hospital",
    ward: "Paediatrics",
    cadre: "Registered Nurse",
    specialty: "Paediatric Nursing",
    registrationDate: "03 November 2026",
    status: "Pending",
    reviewingOfficer: "Registry Officer",
    consentDate: "03 November 2026",
    flags: [],
    history: [
      {
        action: "Registration submitted",
        detail: "Application is awaiting administrative review.",
        actor: "Registry Officer",
        date: "03 November 2026",
      },
    ],
  },
};

const decisionOptions = [
  {
    value: "Approved",
    label: "Approve registration",
    description: "Approve the record and issue a NANNM ID.",
    icon: CheckCircle2,
  },
  {
    value: "Rejected",
    label: "Reject registration",
    description: "Reject the application with a recorded reason.",
    icon: XCircle,
  },
  {
    value: "Flagged",
    label: "Flag record",
    description: "Escalate the record for further investigation.",
    icon: Flag,
  },
  {
    value: "Suspended",
    label: "Suspend record",
    description: "Restrict the record pending further review.",
    icon: Ban,
  },
  {
    value: "Revoked",
    label: "Revoke record",
    description: "Permanently revoke the NANNM ID.",
    icon: AlertTriangle,
  },
];

function AdminNurseProfile() {
  const { nurseId } = useParams();

  const nurse = demoNurses[nurseId];

  const [decision, setDecision] = useState("");
  const [reason, setReason] = useState("");
  const [showDecisionForm, setShowDecisionForm] = useState(false);
  const [notice, setNotice] = useState("");

  if (!nurse) {
    return (
      <main className="admin-profile-not-found">
        <div>
          <AlertTriangle size={36} />
          <h1>Record not found</h1>
          <p>
            This demonstration profile does not exist. The live version will
            retrieve records using the nurse's NANNM ID.
          </p>
          <Link to="/admin/nurses">
            <ArrowLeft size={18} />
            Return to Nurse Registry
          </Link>
        </div>
      </main>
    );
  }

  const isTerminal = nurse.status === "Revoked";

  const openDecisionForm = (value) => {
    setDecision(value);
    setReason("");
    setNotice("");
    setShowDecisionForm(true);
  };

  const submitDecision = (event) => {
    event.preventDefault();

    const requiresReason = decision !== "Approved";

    if (requiresReason && !reason.trim()) {
      setNotice("A reason is required for this decision.");
      return;
    }

    setNotice(
      `Demonstration only: ${decision} has not been saved. Django API integration is required.`,
    );
    setShowDecisionForm(false);
    setDecision("");
    setReason("");
  };

  return (
    <main className="admin-nurse-profile">
      <Link to="/admin/nurses" className="profile-back-link">
        <ArrowLeft size={18} />
        Back to Nurse Registry
      </Link>

      <header className="profile-heading">
        <div>
          <span className="profile-eyebrow">REGISTRY MANAGEMENT</span>
          <h1>Nurse Profile</h1>
          <p>Review professional identity and licensing information.</p>
        </div>

        <span className={`profile-status ${nurse.status.toLowerCase()}`}>
          {nurse.status}
        </span>
      </header>

      {notice && (
        <div className="profile-notice" role="status">
          <Info size={19} />
          {notice}
        </div>
      )}

      <section className="profile-identity-card">
        <div className="profile-avatar">
          <UserRound size={42} />
        </div>

        <div className="profile-identity-details">
          <h2>{nurse.name}</h2>
          <span className="profile-nannm-id">{nurse.id}</span>

          <div className="profile-identity-meta">
            <span>
              <Building2 size={16} />
              {nurse.hospital}
            </span>
            <span>
              <ShieldCheck size={16} />
              {nurse.cadre}
            </span>
          </div>
        </div>
      </section>

      <div className="profile-content-grid">
        <section className="profile-section">
          <div className="profile-section-heading">
            <UserRound size={21} />
            <div>
              <h2>Personal Information</h2>
              <p>Identity details captured during registration.</p>
            </div>
          </div>

          <div className="profile-information-grid">
            <div>
              <span>Full name</span>
              <strong>{nurse.name}</strong>
            </div>
            <div>
              <span>Date of birth</span>
              <strong>{nurse.dateOfBirth}</strong>
            </div>
            <div>
              <span>Phone number</span>
              <strong>{nurse.phone}</strong>
            </div>
            <div>
              <span>Email address</span>
              <strong>{nurse.email}</strong>
            </div>
            <div>
              <span>National Identification Number</span>
              <strong>{nurse.nin}</strong>
              <small className="profile-private-label">
                <LockKeyhole size={13} />
                Super Admin only
              </small>
            </div>
            <div>
              <span>Consent recorded</span>
              <strong>{nurse.consentDate}</strong>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <div className="profile-section-heading">
            <Building2 size={21} />
            <div>
              <h2>Employment Information</h2>
              <p>Current professional placement.</p>
            </div>
          </div>

          <div className="profile-information-grid">
            <div>
              <span>Current employer</span>
              <strong>{nurse.hospital}</strong>
            </div>
            <div>
              <span>Ward / Department</span>
              <strong>{nurse.ward}</strong>
            </div>
            <div>
              <span>Professional cadre</span>
              <strong>{nurse.cadre}</strong>
            </div>
            <div>
              <span>Specialty</span>
              <strong>{nurse.specialty}</strong>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <div className="profile-section-heading">
            <ShieldCheck size={21} />
            <div>
              <h2>Licence Information</h2>
              <p>Submitted professional licensing details.</p>
            </div>
          </div>

          <div className="profile-information-grid">
            <div>
              <span>Licence number</span>
              <strong>{nurse.licenceNumber}</strong>
            </div>
            <div>
              <span>Licence expiry date</span>
              <strong>{nurse.licenceExpiry}</strong>
            </div>
            <div>
              <span>Registration date</span>
              <strong>{nurse.registrationDate}</strong>
            </div>
            <div>
              <span>Registration status</span>
              <strong>{nurse.status}</strong>
            </div>
            <div>
              <span>Reviewing officer</span>
              <strong>{nurse.reviewingOfficer}</strong>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <div className="profile-section-heading">
            <FileText size={21} />
            <div>
              <h2>Submitted Documents</h2>
              <p>Registration evidence and supporting documents.</p>
            </div>
          </div>

          <div className="profile-document-list">
            <div className="profile-document-item">
              <div className="profile-document-icon">
                <FileText size={22} />
              </div>
              <div>
                <strong>Professional licence scan</strong>
                <span>Document preview will be supplied by the API.</span>
              </div>
              <span className="profile-document-placeholder">Demo</span>
            </div>

            <div className="profile-document-item">
              <div className="profile-document-icon">
                <UserRound size={22} />
              </div>
              <div>
                <strong>Registration selfie</strong>
                <span>Secure image preview will be supplied by the API.</span>
              </div>
              <span className="profile-document-placeholder">Demo</span>
            </div>
          </div>

          <div className="profile-security-note">
            <LockKeyhole size={17} />
            Documents must be served through permission-checked backend
            endpoints, not public file URLs.
          </div>
        </section>

        <section className="profile-section profile-history-section">
          <div className="profile-section-heading">
            <Clock size={21} />
            <div>
              <h2>Review History</h2>
              <p>Recorded registration and administrative events.</p>
            </div>
          </div>

          <div className="profile-history-list">
            {nurse.history.map((item, index) => (
              <article className="profile-history-item" key={index}>
                <div className="profile-history-marker">
                  <CalendarDays size={17} />
                </div>
                <div>
                  <strong>{item.action}</strong>
                  <p>{item.detail}</p>
                  <span>
                    {item.actor} · {item.date}
                  </span>
                </div>
              </article>
            ))}

            {nurse.flags.length === 0 && (
              <p className="profile-no-flags">
                No previous flags in this demonstration record.
              </p>
            )}
          </div>
        </section>
      </div>

      <section className="profile-decision-section">
        <div className="profile-section-heading">
          <ShieldCheck size={22} />
          <div>
            <h2>Administrative Decision</h2>
            <p>
              Final licensing decisions are reserved for the Super Admin in this
              frontend workflow.
            </p>
          </div>
        </div>

        {isTerminal ? (
          <div className="profile-terminal-notice">
            <Ban size={20} />
            This record is revoked. Revocation is terminal.
          </div>
        ) : (
          <>
            <div className="profile-decision-options">
              {decisionOptions
                .filter((option) => {
                  if (nurse.status === "Approved") {
                    return ["Flagged", "Suspended", "Revoked"].includes(
                      option.value,
                    );
                  }

                  if (nurse.status === "Rejected") {
                    return false;
                  }

                  return true;
                })
                .map((option) => {
                  const Icon = option.icon;

                  return (
                    <button
                      type="button"
                      className={`profile-decision-button ${option.value.toLowerCase()}`}
                      key={option.value}
                      onClick={() => openDecisionForm(option.value)}
                    >
                      <Icon size={19} />
                      <span>
                        <strong>{option.label}</strong>
                        <small>{option.description}</small>
                      </span>
                    </button>
                  );
                })}
            </div>

            {showDecisionForm && (
              <form className="profile-decision-form" onSubmit={submitDecision}>
                <h3>{decision} Registration</h3>

                <p>
                  {decision === "Approved"
                    ? "Approval will issue a NANNM ID when connected to the backend."
                    : "Provide the reason for this administrative decision."}
                </p>

                {decision !== "Approved" && (
                  <label>
                    Decision reason
                    <textarea
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      placeholder="Enter the reason for this decision..."
                      rows={4}
                      required
                    />
                  </label>
                )}

                <div className="profile-decision-form-actions">
                  <button
                    type="button"
                    className="profile-cancel-button"
                    onClick={() => setShowDecisionForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="profile-submit-button">
                    Confirm decision
                  </button>
                </div>
              </form>
            )}
          </>
        )}

        <div className="profile-decision-warning">
          <AlertTriangle size={18} />
          Demonstration controls only. Decisions are not saved or transmitted.
          Live implementation requires Django authorization, server-side
          validation and an append-only audit record.
        </div>
      </section>
    </main>
  );
}

export default AdminNurseProfile;
