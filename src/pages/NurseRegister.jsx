import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ArrowLeft,
  UserRound,
  BriefcaseMedical,
  Building2,
  FileCheck,
  Camera,
  LockKeyhole,
} from "lucide-react";
import "./NurseRegister.css";
import { useState } from "react";

function NurseRegister() {
  const [registrationMessage, setRegistrationMessage] = useState("");
  const today = new Date();
  const [fileError, setFileError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const maxFileSize = 5 * 1024 * 1024;

    if (file.size > maxFileSize) {
      event.target.value = "";
      setFileError("Each uploaded file must be 5 MB or smaller.");
      return;
    }

    setFileError("");
  };

  const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .split("T")[0];
  const handleSubmit = (event) => {
    event.preventDefault();

    setRegistrationMessage(
      "Your application has passed the browser validation checks. Registration has not yet been submitted because the registry service is not connected.",
    );
  };

  return (
    <main className="register-page">
      {/* Navigation */}
      <header className="auth-navbar">
        <Link to="/" className="brand">
          <div className="brand-icon">
            <ShieldCheck size={27} />
          </div>

          <div className="brand-text">
            <h2>Nurse Registry</h2>
            <span>PLATEAU STATE</span>
          </div>
        </Link>

        <Link to="/nurse/login" className="back-link">
          <ArrowLeft size={16} />
          Back to login
        </Link>
      </header>

      {/* Main Content */}
      <section className="register-container">
        <div className="register-heading">
          <span className="portal-label">NURSE REGISTRATION</span>

          <h1>Create your professional profile</h1>

          <p>
            Complete the registration form to apply for inclusion in the Plateau
            State Nurse Registry.
          </p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          {/* PERSONAL INFORMATION */}
          <section className="register-section">
            <div className="register-section-heading">
              <div className="register-section-icon">
                <UserRound size={21} />
              </div>

              <div>
                <h2>Personal information</h2>
                <p>Your basic identification and contact details.</p>
              </div>
            </div>

            <div className="register-grid">
              <div className="form-group">
                <label htmlFor="full-name">Full legal name</label>
                <input
                  type="text"
                  id="full-name"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone number</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="nin">National Identification Number</label>
                <input
                  type="text"
                  id="nin"
                  placeholder="Enter your NIN"
                  inputMode="numeric"
                  pattern="[0-9]{11}"
                  maxLength={11}
                  required
                />
                <span className="field-hint">
                  Your NIN is private and will not appear in public searches.
                </span>
              </div>
            </div>
            {fileError && (
              <p className="registration-message" role="alert">
                {fileError}
              </p>
            )}
          </section>

          {/* PROFESSIONAL INFORMATION */}
          <section className="register-section">
            <div className="register-section-heading">
              <div className="register-section-icon">
                <BriefcaseMedical size={21} />
              </div>

              <div>
                <h2>Professional information</h2>
                <p>
                  Details relating to your nursing qualification and licence.
                </p>
              </div>
            </div>

            <div className="register-grid">
              <div className="form-group">
                <label htmlFor="license-number">NMCN Licence Number</label>
                <input
                  type="text"
                  id="license-number"
                  placeholder="Enter your licence number"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="expiry-date">Licence expiry date</label>
                <input type="date" id="expiry-date" min={localToday} required />
              </div>

              <div className="form-group">
                <label htmlFor="cadre">Professional cadre</label>
                <select id="cadre" defaultValue="" required>
                  <option value="" disabled>
                    Select your cadre
                  </option>
                  <option value="registered-nurse">Registered Nurse</option>
                  <option value="registered-midwife">Registered Midwife</option>
                  <option value="nurse-midwife">Nurse and Midwife</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="specialty">Specialty</label>
                <input
                  type="text"
                  id="specialty"
                  placeholder="Enter your specialty"
                  required
                />
              </div>
            </div>
          </section>

          {/* EMPLOYMENT INFORMATION */}
          <section className="register-section">
            <div className="register-section-heading">
              <div className="register-section-icon">
                <Building2 size={21} />
              </div>

              <div>
                <h2>Employment information</h2>
                <p>Where you currently practise your profession.</p>
              </div>
            </div>

            <div className="register-grid">
              <div className="form-group">
                <label htmlFor="hospital">Hospital or institution</label>
                <input
                  type="text"
                  id="hospital"
                  placeholder="Enter hospital name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  id="department"
                  placeholder="Enter department"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="ward">Ward or unit</label>
                <input
                  type="text"
                  id="ward"
                  placeholder="Enter your ward or unit"
                  required
                />
              </div>
            </div>
          </section>

          {/* DOCUMENTS */}
          <section className="register-section">
            <div className="register-section-heading">
              <div className="register-section-icon">
                <FileCheck size={21} />
              </div>

              <div>
                <h2>Identity and licence documents</h2>
                <p>Upload the documents required for officer review.</p>
              </div>
            </div>

            <div className="register-grid">
              <div className="form-group">
                <label htmlFor="licence-document">NMCN Licence Document</label>
                <input
                  type="file"
                  id="licence-document"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileChange}
                  required
                />
                <span className="field-hint">
                  Upload a clear scan or photograph of your licence.
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="profile-photo">Profile photograph</label>
                <input
                  type="file"
                  id="profile-photo"
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                  required
                />
                <span className="field-hint">
                  Upload a clear photograph for your registry profile.
                </span>
              </div>

              <div className="form-group full-width">
                <label htmlFor="selfie">Initial identity selfie</label>

                <div className="upload-notice">
                  <Camera size={23} />

                  <div>
                    <strong>Identity verification photograph</strong>
                    <p>
                      Submit a recent selfie for comparison with your licence
                      photograph during officer review.
                    </p>
                  </div>
                </div>

                <input
                  type="file"
                  id="selfie"
                  accept="image/jpeg,image/png"
                  capture="user"
                  onChange={handleFileChange}
                  required
                />

                <span className="field-hint">
                  This is required during initial registration only.
                </span>
              </div>
            </div>
          </section>

          {/* CONSENT */}
          <section className="register-section consent-section">
            <div className="register-section-heading">
              <div className="register-section-icon">
                <LockKeyhole size={21} />
              </div>

              <div>
                <h2>Consent and declaration</h2>
                <p>Review the information before submitting.</p>
              </div>
            </div>

            <label className="consent-checkbox">
              <input type="checkbox" required />

              <span>
                I confirm that the information supplied is accurate and consent
                to the collection and processing of my personal and professional
                information for registry administration and licence
                verification, subject to the applicable privacy policy.
              </span>
            </label>
          </section>

          {/* SUBMIT */}
          <div className="register-submit-area">
            <p>
              Your application will remain pending until an authorised registry
              officer completes the review.
            </p>

            <button type="submit" className="register-submit">
              Submit registration application
            </button>

            {registrationMessage && (
              <p className="registration-message" role="status">
                {registrationMessage}
              </p>
            )}

            <span>
              Already registered? <Link to="/nurse/login">Sign in here</Link>
            </span>
          </div>
        </form>
      </section>

      {/* Footer */}
      <footer className="auth-footer">
        <p>
          © {new Date().getFullYear()} Plateau State Nurse Registry. All rights
          reserved.
        </p>
      </footer>
    </main>
  );
}

export default NurseRegister;
