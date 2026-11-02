import {
  ArrowLeft,
  ShieldCheck,
  FileCheck,
  CalendarDays,
  Upload,
  Clock3,
  AlertCircle,
  History,
  FileText,
  LockKeyhole,
} from 'lucide-react'

import { Link } from 'react-router-dom'
import './LicenceManagement.css'

function LicenceManagement() {
  return (
    <div className="licence-page">
      <header className="licence-topbar">
        <Link to="/nurse/dashboard" className="licence-back">
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </Link>

        <div className="licence-brand">
          <ShieldCheck size={21} />
          <span>Nurse Registry</span>
        </div>
      </header>

      <main className="licence-content">
        <div className="licence-heading">
          <div>
            <span className="licence-eyebrow">NURSE PORTAL</span>
            <h1>Licence & Renewal</h1>
            <p>
              Monitor your professional licence and submit
              renewed credentials for registry review.
            </p>
          </div>
        </div>

        {/* Current licence status */}
        <section className="licence-status-card">
          <div className="licence-status-heading">
            <div className="licence-status-icon">
              <FileCheck size={23} />
            </div>

            <div>
              <span>CURRENT LICENCE</span>
              <h2>Verification Pending</h2>
            </div>
          </div>

          <div className="licence-status-message">
            <AlertCircle size={19} />
            <p>
              Your licence details are awaiting verification
              by an authorised registry officer. Expiry status
              will be displayed after verification.
            </p>
          </div>

          <div className="licence-details-grid">
            <div>
              <span>NMCN Licence Number</span>
              <strong>Pending verification</strong>
            </div>

            <div>
              <span>Licence Expiry Date</span>
              <strong>Not yet confirmed</strong>
            </div>

            <div>
              <span>Licence Validity</span>
              <strong>Undetermined</strong>
            </div>
          </div>
        </section>

        {/* Renewal submission */}
        <section className="licence-panel">
          <div className="licence-panel-heading">
            <div className="licence-panel-icon">
              <Upload size={20} />
            </div>

            <div>
              <h3>Submit Renewed Licence</h3>
              <p>
                Upload your newly issued NMCN licence
                after completing renewal with the council.
              </p>
            </div>
          </div>

          <div className="licence-upload-notice">
            <AlertCircle size={19} />

            <p>
              You must first complete your licence renewal
              through the Nursing and Midwifery Council
              of Nigeria. This platform only records and
              reviews your renewed licence.
            </p>
          </div>

          <div className="licence-upload-area">
            <div className="licence-upload-icon">
              <Upload size={26} />
            </div>

            <h4>Upload your renewed licence</h4>

            <p>
              Select a clear scan or photograph of your
              newly issued licence document.
            </p>

            <label className="licence-upload-button">
              <Upload size={17} />
              Select Licence Document

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                disabled
              />
            </label>

            <span className="licence-upload-hint">
              Accepted formats: PDF, JPG and PNG
            </span>

            <span className="licence-upload-disabled">
              Document upload will be enabled when registry
              services are connected.
            </span>
          </div>

          <div className="licence-security-note">
            <LockKeyhole size={17} />
            <span>
              Submitted licence documents are private and
              accessible only to authorised registry personnel.
            </span>
          </div>
        </section>

        {/* Renewal status */}
        <section className="licence-panel">
          <div className="licence-panel-heading">
            <div className="licence-panel-icon">
              <Clock3 size={20} />
            </div>

            <div>
              <h3>Renewal Review Status</h3>
              <p>Track the review of your renewed credentials.</p>
            </div>
          </div>

          <div className="licence-empty-state">
            <div>
              <FileText size={28} />
            </div>

            <h4>No renewal submission</h4>

            <p>
              You haven't submitted a renewed licence
              for registry review.
            </p>
          </div>
        </section>

        {/* Renewal history */}
        <section className="licence-panel">
          <div className="licence-panel-heading">
            <div className="licence-panel-icon">
              <History size={20} />
            </div>

            <div>
              <h3>Licence History</h3>
              <p>Previously verified licence records.</p>
            </div>
          </div>

          <div className="licence-history-empty">
            <CalendarDays size={22} />
            <span>No verified licence history available yet.</span>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LicenceManagement