import { useState } from "react";
import { Link } from "react-router-dom";
import "./NurseLogin.css";
import {
  ShieldCheck,
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  CreditCard,
} from "lucide-react";

function NurseLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoginMessage(
      "Authentication is not yet available. Please try again when the registry service is connected.",
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
        <div className="auth-card">
          <div className="auth-heading">
            <div className="auth-icon nurse-icon">
              <ShieldCheck size={27} />
            </div>

            <span className="portal-label">NURSE PORTAL</span>

            <h1>Welcome back</h1>

            <p>
              Sign in to access your professional registration and licence
              information.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>

              <div className="input-wrapper">
                <Mail size={18} />

                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <div className="input-wrapper">
                <LockKeyhole size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
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

            <div className="form-group">
              <label htmlFor="license">NMCN Licence Number</label>

              <div className="input-wrapper">
                <CreditCard size={18} />

                <input
                  type="text"
                  id="license"
                  placeholder="Enter your NMCN licence number"
                  autoComplete="off"
                  required
                />
              </div>

              <span className="field-hint">
                Use the licence number printed on your Nursing and Midwifery
                Council certificate.
              </span>
            </div>

            <button type="submit" className="auth-submit">
              Sign in to Nurse Portal
              <ArrowLeft size={18} className="submit-arrow" />
            </button>

            {loginMessage && (
              <p className="login-message" role="status">
                {loginMessage}
              </p>
            )}
          </form>

          <div className="auth-register-link">
            <span>New to the registry?</span>
            <Link to="/nurse/register">Create an account</Link>
          </div>

          <div className="auth-security">
            <ShieldCheck size={17} />
            <span>Your professional information is protected.</span>
          </div>
        </div>

        <p className="auth-bottom-text">
          Having trouble accessing your account? Contact your registry
          administrator.
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

export default NurseLogin;
