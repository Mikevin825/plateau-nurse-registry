import {
  ArrowLeft,
  UserRound,
  ShieldCheck,
  BriefcaseBusiness,
  FileCheck,
  Camera,
} from 'lucide-react'

import { Link } from 'react-router-dom'
import './NurseProfile.css'

function NurseProfile() {
  return (
    <div className="profile-page">
      <header className="profile-topbar">
        <Link to="/nurse/dashboard" className="profile-back">
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </Link>

        <div className="profile-topbar-brand">
          <ShieldCheck size={21} />
          <span>Nurse Registry</span>
        </div>
      </header>

      <main className="profile-content">
        <div className="profile-page-heading">
          <div>
            <span className="profile-eyebrow">NURSE PORTAL</span>
            <h1>My Professional Profile</h1>
            <p>View your personal and professional registry information.</p>
          </div>

          <span className="profile-review-status">
            <span></span>
            Pending Verification
          </span>
        </div>

        {/* Profile summary */}
        <section className="profile-summary-card">
          <div className="profile-photo-wrapper">
            <div className="profile-photo-placeholder">
              <UserRound size={42} />
            </div>

            <button
              type="button"
              className="profile-camera-button"
              aria-label="Change profile photo"
            >
              <Camera size={15} />
            </button>
          </div>

          <div className="profile-summary-info">
            <span className="profile-summary-label">NURSE PROFILE</span>
            <h2>Profile awaiting approval</h2>
            <p>
              Your registered name and photograph will appear here
              after your details have been reviewed.
            </p>
          </div>

          <div className="profile-id-block">
            <span>NANNM REGISTRY ID</span>
            <strong>Not yet issued</strong>
          </div>
        </section>

        {/* Personal information */}
        <section className="profile-information-card">
          <div className="profile-section-heading">
            <div className="profile-section-icon">
              <UserRound size={20} />
            </div>

            <div>
              <h3>Personal Information</h3>
              <p>Your basic identity and contact details</p>
            </div>

            <span className="profile-section-status">Awaiting review</span>
          </div>

          <div className="profile-fields-grid">
            <div className="profile-field">
              <span>Full legal name</span>
              <strong>Pending verification</strong>
            </div>

            <div className="profile-field">
              <span>Email address</span>
              <strong>Submitted during registration</strong>
            </div>

            <div className="profile-field">
              <span>Phone number</span>
              <strong>Submitted during registration</strong>
            </div>

            <div className="profile-field">
              <span>National Identification Number</span>
              <strong>Protected information</strong>
            </div>
          </div>

          <p className="profile-privacy-note">
            <ShieldCheck size={16} />
            Your NIN is protected and is not displayed in your
            public registry profile.
          </p>
        </section>

        {/* Professional information */}
        <section className="profile-information-card">
          <div className="profile-section-heading">
            <div className="profile-section-icon">
              <FileCheck size={20} />
            </div>

            <div>
              <h3>Professional Credentials</h3>
              <p>Your nursing qualification and licence information</p>
            </div>

            <span className="profile-section-status">Awaiting review</span>
          </div>

          <div className="profile-fields-grid">
            <div className="profile-field">
              <span>NMCN Licence Number</span>
              <strong>Pending verification</strong>
            </div>

            <div className="profile-field">
              <span>Licence expiry date</span>
              <strong>Pending verification</strong>
            </div>

            <div className="profile-field">
              <span>Professional cadre</span>
              <strong>Pending verification</strong>
            </div>

            <div className="profile-field">
              <span>Specialty</span>
              <strong>Pending verification</strong>
            </div>
          </div>
        </section>

        {/* Employment information */}
        <section className="profile-information-card">
          <div className="profile-section-heading">
            <div className="profile-section-icon">
              <BriefcaseBusiness size={20} />
            </div>

            <div>
              <h3>Employment Information</h3>
              <p>Your declared workplace and current assignment</p>
            </div>

            <span className="profile-section-status">Awaiting review</span>
          </div>

          <div className="profile-fields-grid">
            <div className="profile-field">
              <span>Hospital / Institution</span>
              <strong>Pending verification</strong>
            </div>

            <div className="profile-field">
              <span>Department</span>
              <strong>Pending verification</strong>
            </div>

            <div className="profile-field">
              <span>Ward / Unit</span>
              <strong>Pending verification</strong>
            </div>
          </div>
        </section>

        {/* Review notice */}
        <section className="profile-review-notice">
          <ShieldCheck size={21} />

          <div>
            <h3>Why can't I edit my information?</h3>
            <p>
              Your submitted details are currently awaiting review.
              Once an authorised officer completes verification,
              available profile update options will be displayed.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default NurseProfile