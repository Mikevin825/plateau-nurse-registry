import { useState } from "react";
import { Link } from "react-router-dom";
import { registerHR } from "../apiService";

export default function HRRegistration() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    setMessage("");
    const values = Object.fromEntries(new FormData(form));
    try {
      await registerHR(values);
      form.reset();
      setMessage("Your request was submitted for super-admin review.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  return <main className="auth-page"><section className="auth-container"><div className="auth-card">
    <span className="portal-label">HOSPITAL REGISTRATION</span><h1>Request HR access</h1>
    <p>Approved registrations receive an institutional account after review.</p>
    <form className="auth-form" onSubmit={submit}>
      <label>Work email<input name="email" type="email" autoComplete="email" required /></label>
      <label>Hospital or employer name<input name="hospital_name" maxLength={255} required /></label>
      <label>Employer type<select name="employer_type" defaultValue="hospital"><option value="hospital">Hospital</option><option value="primary_health_centre">Primary health centre</option><option value="clinic">Clinic</option><option value="other">Other</option></select></label>
      <label>Local government area<input name="lga" maxLength={120} required /></label>
      <label>Hospital contact email<input name="contact_email" type="email" /></label>
      <label>Password<input name="password" type="password" minLength={8} autoComplete="new-password" required /></label>
      <button className="auth-submit" disabled={busy}>{busy ? "Submitting…" : "Submit registration"}</button>
      {message && <p role="status">{message}</p>}
    </form><Link to="/hospital/login">Back to institutional login</Link>
  </div></section></main>;
}
