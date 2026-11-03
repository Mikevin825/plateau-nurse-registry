import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Building2, MailCheck, ShieldCheck } from "lucide-react";
import { registerHR } from "../apiService";

export default function HRRegistration() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    if (values.password !== values.password_confirm) {
      setSuccess(false); setMessage("The passwords do not match."); return;
    }
    delete values.password_confirm;
    setBusy(true); setMessage(""); setSuccess(false);
    try {
      await registerHR(values);
      form.reset();
      setSuccess(true);
      setMessage("Your request was submitted. You can sign in after registry staff approve your account.");
    } catch (error) {
      setMessage(error.message || "We could not submit your request. Check the details and try again.");
    } finally { setBusy(false); }
  }

  return (
    <main className="auth-page">
      <header className="auth-navbar"><Link to="/" className="brand"><div className="brand-icon"><ShieldCheck size={25} /></div><div className="brand-text"><h2>Nurse Registry</h2><span>PLATEAU STATE</span></div></Link><Link to="/hospital/login" className="back-link"><ArrowLeft size={16} /> Hospital sign in</Link></header>
      <section className="auth-container"><div className="auth-card hr-register-card">
        <div className="auth-heading"><div className="auth-icon hospital-icon"><Building2 size={26} /></div><span className="portal-label">HOSPITAL PORTAL</span><h1>Request HR access</h1><p>Submit your institution details for registry review. Approved requests receive a hospital HR account.</p></div>
        {message && <p className={success ? "registration-message success" : "registration-message"} role={success ? "status" : "alert"}>{success && <MailCheck size={18} />}{message}</p>}
        <form className="auth-form" onSubmit={submit}>
          <label>Work email<input name="email" type="email" autoComplete="email" placeholder="you@hospital.org" required /></label>
          <label>Hospital or employer name<input name="hospital_name" maxLength={255} autoComplete="organization" placeholder="Institution name" required /></label>
          <label>Employer type<select name="employer_type" defaultValue="hospital" required><option value="hospital">Hospital</option><option value="primary_health_centre">Primary health centre</option><option value="clinic">Clinic</option><option value="other">Other</option></select></label>
          <label>Local government area<input name="lga" maxLength={120} placeholder="e.g. Jos North" required /></label>
          <label>Hospital contact email <span className="optional-label">Optional</span><input name="contact_email" type="email" autoComplete="email" placeholder="contact@hospital.org" /></label>
          <label>Create password<input name="password" type="password" minLength={8} autoComplete="new-password" required /></label>
          <label>Confirm password<input name="password_confirm" type="password" minLength={8} autoComplete="new-password" required /></label>
          <button className="auth-submit hospital-submit" disabled={busy}>{busy ? "Submitting request…" : "Submit for review"}</button>
        </form>
        <div className="auth-security"><ShieldCheck size={17} /><span>Your account remains pending until the registry approves the request.</span></div>
      </div></section>
      <footer className="auth-footer"><p>© {new Date().getFullYear()} Plateau State Nurse Registry. All rights reserved.</p></footer>
    </main>
  );
}
