import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Hospital,
} from "lucide-react";
import "./HospitalLogin.css";

function HospitalLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoginMessage(
      "Hospital authentication is not yet available. Only approved institutional accounts will be able to access this portal once the registry service is connected.",
    );
  };

  return (
    <main className="auth-page">
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

      <section className="auth-container">
        <div className="auth-card hospital-auth-card">
          <div className="auth-heading">
            <div className="auth-icon hospital-icon">
              <Hospital size={27} />
            </div>

            <span className="portal-label">HOSPITAL PORTAL</span>

            <h1>Institutional access</h1>

            <p>
              Sign in to verify nursing professionals and manage your hospital's
              employment records.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="hospital-email">Registered hospital email</label>

              <div className="input-wrapper">
                <Mail size={18} />

                <input
                  type="email"
                  id="hospital-email"
                  placeholder="Enter your hospital email"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="hospital-password">Password</label>

              <div className="input-wrapper">
                <LockKeyhole size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  id="hospital-password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit hospital-submit">
              Sign in to Hospital Portal
              <ArrowLeft size={18} className="submit-arrow" />
            </button>

            {loginMessage && (
              <p className="login-message" role="status">
                {loginMessage}
              </p>
            )}
          </form>

          <div className="auth-security">
            <ShieldCheck size={17} />
            <span>Authorised institutional access only.</span>
          </div>
        </div>

        <p className="auth-bottom-text">
          Hospital access is restricted to approved institutional accounts.
          Contact the registry administrator for assistance.
        </p>
      </section>

      <footer className="auth-footer">
        <p>
          © {new Date().getFullYear()} Plateau State Nurse Registry. All rights
          reserved.
        </p>
      </footer>
    </main>
  );
}

export default HospitalLogin;
