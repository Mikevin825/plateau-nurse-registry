import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { getCurrentUser, loginNurse } from "../apiService";
import "./NurseLogin.css";

export default function NurseLogin({ portal = "nurse" }) {
  const isStaffPortal = portal === "admin";
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    try {
      const result = await loginNurse({ email: form.get("email"), password: form.get("password") });
      const token = result.token || result.access;
      if (!token) throw new Error("Sign in could not be completed. Please try again.");
      localStorage.setItem("token", token);
      const user = await getCurrentUser(token);
      if (isStaffPortal && ["super_admin", "supervisor"].includes(user.role)) {
        navigate("/admin/dashboard", { replace: true });
        return;
      }
      if (!isStaffPortal && user.role === "nurse") {
        navigate("/nurse/dashboard", { replace: true });
        return;
      }
      localStorage.removeItem("token");
      throw new Error(isStaffPortal
        ? "This account does not have registry staff access."
        : "This account is not a nurse account. Use the hospital or staff sign in.");
    } catch (error) {
      localStorage.removeItem("token");
      setMessage(error.message || "We could not sign you in. Check your details and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <header className="auth-navbar"><Link to="/" className="brand"><div className="brand-icon"><ShieldCheck size={25} /></div><div className="brand-text"><h2>Nurse Registry</h2><span>PLATEAU STATE</span></div></Link><Link to="/" className="back-link"><ArrowLeft size={16} /> Back to home</Link></header>
      <section className="auth-container">
        <div className="auth-card">
          <div className="auth-heading"><div className="auth-icon nurse-icon"><ShieldCheck size={26} /></div><span className="portal-label">{isStaffPortal ? "REGISTRY STAFF" : "NURSE PORTAL"}</span><h1>{isStaffPortal ? "Staff sign in" : "Welcome back"}</h1><p>{isStaffPortal ? "Sign in with your registry staff email to review and manage records." : "Access your nurse profile, licence information and registry services."}</p></div>
          <form className="auth-form" onSubmit={submit}>
            <div className="form-group"><label htmlFor="login-email">Email address</label><div className="input-wrapper"><Mail size={18} /><input id="login-email" name="email" type="email" autoComplete="username" placeholder="name@example.com" required /></div></div>
            <div className="form-group"><label htmlFor="login-password">Password</label><div className="input-wrapper"><LockKeyhole size={18} /><input id="login-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" required /><button type="button" className="password-toggle" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>
            <button type="submit" className="auth-submit" disabled={busy}>{busy ? "Signing in…" : isStaffPortal ? "Sign in to Staff Workspace" : "Sign in to Nurse Portal"}<ArrowLeft size={18} className="submit-arrow" /></button>
            {message && <p className="login-message" role="alert">{message}</p>}
          </form>
          {!isStaffPortal && <div className="auth-register-link"><span>New to the registry?</span><Link to="/nurse/register">Create a nurse account</Link></div>}
          <div className="auth-security"><ShieldCheck size={17} /><span>{isStaffPortal ? "Restricted access for registry staff." : "Your professional information is protected."}</span></div>
        </div>
        <p className="auth-bottom-text">Having trouble accessing your account? Contact your registry administrator.</p>
      </section>
      <footer className="auth-footer"><p>© {new Date().getFullYear()} Plateau State Nurse Registry. All rights reserved.</p></footer>
    </main>
  );
}
