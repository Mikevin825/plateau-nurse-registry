import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Hospital, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { getCurrentUser, loginNurse } from "../apiService";
import "./HospitalLogin.css";

export default function HospitalLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault(); setBusy(true); setMessage("");
    const form = new FormData(event.currentTarget);
    try {
      const result = await loginNurse({ email: form.get("email"), password: form.get("password") });
      const token = result.token || result.access;
      if (!token) throw new Error("Sign in could not be completed. Please try again.");
      localStorage.setItem("token", token);
      const user = await getCurrentUser(token);
      if (user.role === "hr") { navigate("/hr/dashboard", { replace: true }); return; }
      localStorage.removeItem("token");
      throw new Error("This account does not have approved hospital HR access.");
    } catch (error) {
      localStorage.removeItem("token");
      setMessage(error.message || "We could not sign you in. Check your details and try again.");
    } finally { setBusy(false); }
  }

  return (
    <main className="auth-page">
      <header className="auth-navbar"><Link to="/" className="brand"><div className="brand-icon"><ShieldCheck size={25} /></div><div className="brand-text"><h2>Nurse Registry</h2><span>PLATEAU STATE</span></div></Link><Link to="/" className="back-link"><ArrowLeft size={16} /> Back to home</Link></header>
      <section className="auth-container"><div className="auth-card hospital-auth-card">
        <div className="auth-heading"><div className="auth-icon hospital-icon"><Hospital size={26} /></div><span className="portal-label">HOSPITAL PORTAL</span><h1>Institutional access</h1><p>Sign in to review nurses associated with your institution and confirm employment.</p></div>
        <form className="auth-form" onSubmit={submit}>
          <div className="form-group"><label htmlFor="hospital-email">Work email</label><div className="input-wrapper"><Mail size={18} /><input id="hospital-email" name="email" type="email" autoComplete="username" placeholder="name@hospital.org" required /></div></div>
          <div className="form-group"><label htmlFor="hospital-password">Password</label><div className="input-wrapper"><LockKeyhole size={18} /><input id="hospital-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" required /><button type="button" className="password-toggle" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>
          <button type="submit" className="auth-submit hospital-submit" disabled={busy}>{busy ? "Signing in…" : "Sign in to Hospital Portal"}<ArrowLeft size={18} className="submit-arrow" /></button>
          {message && <p className="login-message" role="alert">{message}</p>}
        </form>
        <div className="auth-register-link"><span>Need institutional access?</span><Link to="/hospital/register">Request an HR account</Link></div>
        <div className="auth-security"><ShieldCheck size={17} /><span>Only approved hospital accounts can access nurse records.</span></div>
      </div><p className="auth-bottom-text">If your request is awaiting review, contact your registry administrator for assistance.</p></section>
      <footer className="auth-footer"><p>© {new Date().getFullYear()} Plateau State Nurse Registry. All rights reserved.</p></footer>
    </main>
  );
}
