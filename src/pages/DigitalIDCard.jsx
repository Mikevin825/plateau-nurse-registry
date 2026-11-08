import { useEffect, useState } from "react";
import {
  ShieldCheck,
  LockKeyhole,
  Download,
  UserRound,
  CalendarDays,
  BriefcaseMedical,
} from "lucide-react";
import "./DigitalIDCard.css";
import { getNurseCard, resolveMediaUrl } from "../apiService";

function DigitalIDCard() {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    let active = true;
    getNurseCard(token)
      .then((data) => {
        if (active) setCard(data);
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

  if (loading)
    return (
      <div className="digital-id-container">
        <p>Loading card information…</p>
      </div>
    );
  if (error)
    return (
      <div className="digital-id-container">
        <p role="alert">{error}</p>
      </div>
    );
  const nurse = card?.nurse;
  const available = card?.available && nurse;

  return (
    <div className="digital-id-page">
      <main className="digital-id-container">
        <div className="digital-id-heading">
          <div>
            <span className="digital-id-eyebrow">NURSE PORTAL</span>
            <h1>Digital ID Card</h1>
            <p>Your registry card and public verification link.</p>
          </div>
          <span className="digital-id-pending">
            {available ? <ShieldCheck size={15} /> : <LockKeyhole size={15} />}
            {available ? "Approved" : "Not yet issued"}
          </span>
        </div>
        {available ? (
          <>
            <section className="digital-id-card">
              <div className="digital-card-top">
                <div className="digital-card-brand">
                  <div className="digital-card-logo">
                    <ShieldCheck size={25} />
                  </div>
                  <div>
                    <strong>NURSE REGISTRY</strong>
                    <span>PLATEAU STATE</span>
                  </div>
                </div>
                <span className="digital-card-type">PROFESSIONAL ID</span>
              </div>
              <div className="digital-card-body">
                <div className="digital-card-photo">
                  {nurse.photo ? (
                    <img
                      src={resolveMediaUrl(nurse.photo)}
                      alt={`${nurse.full_name} profile`}
                    />
                  ) : (
                    <UserRound size={48} />
                  )}
                </div>
                <div className="digital-card-details">
                  <span className="digital-card-label">REGISTERED NURSE</span>
                  <h2>{nurse.full_name}</h2>
                  <div className="digital-card-field">
                    <span>NANNM REGISTRY ID</span>
                    <strong>{nurse.nanm_id}</strong>
                  </div>
                  <div className="digital-card-field">
                    <span>NMCN LICENCE NUMBER</span>
                    <strong>{nurse.licence_number}</strong>
                  </div>
                </div>
                <div className="digital-card-qr">
                  {card.qr_url ? (
                    <img
                      src={card.qr_url}
                      alt={`Verification QR code for ${nurse.full_name}`}
                    />
                  ) : (
                    <span className="digital-card-qr-placeholder">
                      <ShieldCheck size={30} />
                    </span>
                  )}
                  <span>{card.qr_url ? "SCAN TO VERIFY" : "OFFLINE DEMO"}</span>
                </div>
              </div>
              <div className="digital-card-footer">
                <span>PLATEAU STATE NURSE REGISTRY</span>
                <span>{nurse.licence_status}</span>
              </div>
            </section>
            <section className="digital-id-information">
              <div className="digital-id-section-heading">
                <h2>Card Information</h2>
                <span>Verified registry details</span>
              </div>
              <div className="digital-id-info-grid">
                <div className="digital-id-info-item">
                  <BriefcaseMedical size={19} />
                  <div>
                    <span>Professional Cadre</span>
                    <strong>{nurse.cadre || "Not provided"}</strong>
                  </div>
                </div>
                <div className="digital-id-info-item">
                  <UserRound size={19} />
                  <div>
                    <span>Current Employer</span>
                    <strong>{nurse.employer || "Not provided"}</strong>
                  </div>
                </div>
                <div className="digital-id-info-item">
                  <CalendarDays size={19} />
                  <div>
                    <span>Licence Expiry</span>
                    <strong>
                      {nurse.licence_expiry
                        ? new Date(nurse.licence_expiry).toLocaleDateString()
                        : "Not provided"}
                    </strong>
                  </div>
                </div>
                <div className="digital-id-info-item">
                  <ShieldCheck size={19} />
                  <div>
                    <span>Licence Status</span>
                    <strong>{nurse.licence_status}</strong>
                  </div>
                </div>
              </div>
            </section>
            <div className="digital-id-actions">
              <button
                type="button"
                className="digital-id-download"
                onClick={() => window.print()}
              >
                <Download size={18} />
                Print / Save card
              </button>
            </div>
            <p className="digital-id-footer-note">
              The signed card link expires according to registry security
              settings. The QR code opens public verification.
            </p>
          </>
        ) : (
          <div className="digital-id-notice">
            <LockKeyhole size={21} />
            <div>
              <strong>Your ID card is not yet available</strong>
              <p>
                Your registration must be approved and issued a NANNM Registry
                ID before a signed card and QR code can be generated. Current
                status: {card?.record_status || "unknown"}.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default DigitalIDCard;
