import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ArrowLeft,
  Search,
  LockKeyhole,
  UserRound,
  BadgeCheck,
} from "lucide-react";
import "./PublicVerify.css";

function PublicVerify() {
  const [registryId, setRegistryId] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [submittedId, setSubmittedId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanId = registryId.trim().toUpperCase();

    if (!cleanId) {
      return;
    }

    setSubmittedId(cleanId);

    setVerificationMessage(
      "Live registry verification is not yet available. The submitted ID has not been checked against the official registry.",
    );
  };

  return (
    <main className="verify-page">
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

        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </header>

      {/* Main Content */}
      <section className="verify-container">
        <div className="verify-heading">
          <div className="verify-icon">
            <ShieldCheck size={30} />
          </div>

          <span className="portal-label">PUBLIC VERIFICATION</span>

          <h1>Verify a nurse's credentials</h1>

          <p>
            Confirm the registration and current licence status of a nursing
            professional registered on the Plateau State Nurse Registry.
          </p>
        </div>

        {/* Search Form */}
        <div className="verify-card">
          <div className="verify-card-heading">
            <h2>Search nurse registry</h2>

            <p>
              Enter the nurse's official NANNM Registry ID to begin
              verification.
            </p>
          </div>

          <form className="verify-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="registry-id">NANNM Registry ID</label>

              <div className="input-wrapper">
                <BadgeCheck size={18} />

                <input
                  type="text"
                  id="registry-id"
                  placeholder="e.g. PSNR-2026-00001"
                  value={registryId}
                  onChange={(event) => setRegistryId(event.target.value)}
                  required
                />
              </div>

              <span className="field-hint">
                Enter the Registry ID printed on the nurse's digital
                identification card.
              </span>
            </div>

            <button type="submit" className="verify-submit">
              <Search size={18} />
              Verify nurse
            </button>
          </form>

          {/* Information */}
          <div className="verify-privacy">
            <LockKeyhole size={17} />

            <p>
              Public verification displays limited professional information.
              Personal identification numbers and private documents are never
              publicly displayed.
            </p>
          </div>
        </div>

        {/* Verification Result */}
        {verificationMessage ? (
          <div className="verify-result-placeholder" role="status">
            <div className="placeholder-icon">
              <LockKeyhole size={23} />
            </div>

            <h3>Verification unavailable</h3>

            <p>
              Registry ID submitted: <strong>{submittedId}</strong>
            </p>

            <p>{verificationMessage}</p>
          </div>
        ) : (
          <div className="verify-result-placeholder">
            <div className="placeholder-icon">
              <UserRound size={23} />
            </div>

            <h3>Verification results will appear here</h3>

            <p>
              Enter a valid NANNM Registry ID to view the nurse's public
              registration information.
            </p>
          </div>
        )}
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

export default PublicVerify;
