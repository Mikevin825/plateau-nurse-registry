import { UserRound, BriefcaseBusiness, FileCheck, ShieldCheck } from "lucide-react";

import "./NurseProfile.css"
import useNurseProfile from "../hooks/useNurseProfile";
import { resolveMediaUrl } from "../apiService";

function NurseProfile() {
  const { nurse, loading, error } = useNurseProfile();

  if (loading) {
    return (
      <div className="profile-page">
        <main className="profile-content">
          <div className="profile-page-heading">
            <div>
              <span className="profile-eyebrow">NURSE PORTAL</span>
              <h1>My Professional Profile</h1>
              <p>Loading your profile...</p>
            </div>

            <span className="profile-review-status">
              <span></span>
              Loading...
            </span>
          </div>
        </main>
      </div>
    )
  }
  if (error || !nurse) return <div className="profile-page"><main className="profile-content"><p role="alert">{error || "We could not load your nurse record."}</p></main></div>;

  const photoElement = nurse.photo
    ? <img src={resolveMediaUrl(nurse.photo)} alt={`${nurse.full_name} profile`} />
    : <div className="profile-photo-placeholder"><UserRound size={42} /></div>;

  return (
    <div className="profile-page">
      <main className="profile-content">
        <div className="profile-page-heading">
          <div>
            <span className="profile-eyebrow">NURSE PORTAL</span>
            <h1>My Professional Profile</h1>
            <p>View your personal and professional registry information.</p>
          </div>

          <span className="profile-review-status">
            <span></span>
            {nurse && nurse.record_status === "approved" ? "Verified" : "Pending Verification"}
          </span>
        </div>

        {/* Profile summary */}
        <section className="profile-summary-card">
          <div className="profile-photo-wrapper">
            {photoElement}


          </div>

          <div className="profile-summary-info">
            <span className="profile-summary-label">NURSE PROFILE</span>
            <h2>{nurse && nurse.full_name || "Profile awaiting approval"}</h2>
            <p>
              {nurse && nurse.record_status === "approved"
                ? "Your details have been verified and approved."
                : "Your registered name and photograph will appear here after your details have been reviewed."}
            </p>
          </div>

          <div className="profile-id-block">
            <span>NANNM REGISTRY ID</span>
            <strong>{nurse && nurse.nanm_id || "Not yet issued"}</strong>
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

            <span className="profile-section-status">
              {nurse && nurse.record_status === "approved" ? "Verified" : "Awaiting review"}
            </span>
          </div>

          <div className="profile-fields-grid">
            <div className="profile-field">
              <span>Full legal name</span>
              <strong>{nurse && nurse.full_name || "Pending verification"}</strong>
            </div>

            <div className="profile-field">
              <span>Email address</span>
              <strong>{nurse.email || "Not provided"}</strong>
            </div>

            <div className="profile-field">
              <span>Phone number</span>
              <strong>{nurse.phone || "Not provided"}</strong>
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

            <span className="profile-section-status">
              {nurse && nurse.record_status === "approved" ? "Verified" : "Awaiting review"}
            </span>
          </div>

          <div className="profile-fields-grid">
            <div className="profile-field">
              <span>NMCN Licence Number</span>
              <strong>{nurse && nurse.licence_number || "Pending verification"}</strong>
            </div>

            <div className="profile-field">
              <span>Licence expiry date</span>
              <strong>
                {nurse && nurse.licence_expiry
                  ? new Date(nurse.licence_expiry).toLocaleDateString()
                  : "Pending verification"}
              </strong>
            </div>

            <div className="profile-field">
              <span>Professional cadre</span>
              <strong>{nurse && nurse.cadre || "Pending verification"}</strong>
            </div>

            <div className="profile-field">
              <span>Specialty</span>
              <strong>{nurse && nurse.specialty || "Pending verification"}</strong>
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

            <span className="profile-section-status">
              {nurse && nurse.record_status === "approved" ? "Verified" : "Awaiting review"}
            </span>
          </div>

          <div className="profile-fields-grid">
            <div className="profile-field">
              <span>Hospital / Institution</span>
              <strong>{nurse && nurse.employer || "Pending verification"}</strong>
            </div>

            <div className="profile-field">
              <span>Department</span>
              <strong>Not provided</strong>
            </div>

            <div className="profile-field">
              <span>Ward / Unit</span>
              <strong>{nurse && nurse.ward || "Pending verification"}</strong>
            </div>
          </div>
        </section>

        {/* Review notice */}
        <section className="profile-review-notice">
          <ShieldCheck size={21} />

          <div>
            <h3>Why can't I edit my information?</h3>
            <p>
              {nurse && nurse.record_status === "approved"
                ? "Your details have been verified and approved. Update options will be available."
                : "Your submitted details are currently awaiting review. Once an authorised officer completes verification, available profile update options will be displayed."}
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default NurseProfile
