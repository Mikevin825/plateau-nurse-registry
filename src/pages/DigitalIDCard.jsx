import {
  ArrowLeft,
  ShieldCheck,
  LockKeyhole,
  QrCode,
  Download,
  UserRound,
  CalendarDays,
  BriefcaseMedical,
} from 'lucide-react'

import { Link } from 'react-router-dom'
import './DigitalIDCard.css'

function DigitalIDCard() {
  const nurse = {
    name: 'Nurse Full Name',
    registryId: 'Not yet issued',
    licenceNumber: 'Pending verification',
    cadre: 'Registered Nurse',
    employer: 'Hospital not confirmed',
    expiryDate: 'Not confirmed',
  }

  return (
    <div className="digital-id-page">
      <header className="digital-id-header">
        <Link to="/nurse/dashboard" className="digital-id-back">
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </Link>

        <div className="digital-id-header-label">
          <ShieldCheck size={20} />
          <span>Nurse Registry</span>
        </div>
      </header>

      <main className="digital-id-container">
        <div className="digital-id-heading">
          <div>
            <span className="digital-id-eyebrow">NURSE PORTAL</span>
            <h1>Digital ID Card</h1>
            <p>
              View your professional registry identity card and its
              current issuance status.
            </p>
          </div>

          <span className="digital-id-pending">
            <LockKeyhole size={15} />
            Not yet issued
          </span>
        </div>

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
              <UserRound size={48} />
            </div>

            <div className="digital-card-details">
              <span className="digital-card-label">REGISTERED NURSE</span>
              <h2>{nurse.name}</h2>

              <div className="digital-card-field">
                <span>NANNM REGISTRY ID</span>
                <strong>{nurse.registryId}</strong>
              </div>

              <div className="digital-card-field">
                <span>NMCN LICENCE NUMBER</span>
                <strong>{nurse.licenceNumber}</strong>
              </div>
            </div>

            <div className="digital-card-qr">
              <QrCode size={54} />
              <span>QR CODE</span>
              <small>Available after approval</small>
            </div>
          </div>

          <div className="digital-card-footer">
            <span>PLATEAU STATE NURSE REGISTRY</span>
            <span>IDENTITY PREVIEW</span>
          </div>
        </section>

        <div className="digital-id-notice">
          <LockKeyhole size={21} />
          <div>
            <strong>Your ID card is not yet available</strong>
            <p>
              Your registration must be reviewed and approved by an
              authorised registry officer before a NANNM Registry ID
              and verification QR code can be issued.
            </p>
          </div>
        </div>

        <section className="digital-id-information">
          <div className="digital-id-section-heading">
            <h2>Card Information</h2>
            <span>Registration details</span>
          </div>

          <div className="digital-id-info-grid">
            <div className="digital-id-info-item">
              <BriefcaseMedical size={19} />
              <div>
                <span>Professional Cadre</span>
                <strong>{nurse.cadre}</strong>
              </div>
            </div>

            <div className="digital-id-info-item">
              <UserRound size={19} />
              <div>
                <span>Current Employer</span>
                <strong>{nurse.employer}</strong>
              </div>
            </div>

            <div className="digital-id-info-item">
              <CalendarDays size={19} />
              <div>
                <span>Licence Expiry</span>
                <strong>{nurse.expiryDate}</strong>
              </div>
            </div>

            <div className="digital-id-info-item">
              <ShieldCheck size={19} />
              <div>
                <span>Issuance Status</span>
                <strong>Awaiting approval</strong>
              </div>
            </div>
          </div>
        </section>

        <button className="digital-id-download" disabled>
          <Download size={18} />
          Download Digital ID
        </button>

        <p className="digital-id-footer-note">
          Digital identity cards are generated only after successful
          registration review and approval.
        </p>
      </main>
    </div>
  )
}

export default DigitalIDCard