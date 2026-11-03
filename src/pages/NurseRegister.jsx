import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BriefcaseMedical, Building2, Camera, FileCheck, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";
import { getEmployerOptions, registerNurse } from "../apiService";
import "./NurseRegister.css";

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

export default function NurseRegister() {
  const navigate = useNavigate();
  const [employers, setEmployers] = useState([]);
  const [employerError, setEmployerError] = useState("");
  const [employerChoice, setEmployerChoice] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    getEmployerOptions().then((rows) => { if (active) setEmployers(rows); })
      .catch((error) => { if (active) setEmployerError(error.message || "Could not load approved employers."); });
    return () => { active = false; };
  }, []);

  function validateFile(event) {
    const file = event.target.files?.[0];
    if (file && file.size > 10 * 1024 * 1024) {
      event.target.value = "";
      setMessage("Uploads must be 10 MB or smaller.");
    } else {
      setMessage("");
    }
  }

  async function submit(event) {
    event.preventDefault();
    setMessage("");
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const password = form.get("password");
    if (password !== form.get("password_confirm")) {
      setMessage("The passwords do not match."); setBusy(false); return;
    }
    form.delete("password_confirm");
    if (employerChoice === "custom") form.set("employer", "");
    try {
      const result = await registerNurse(form);
      const token = result.token || result.access;
      if (!token) throw new Error("Your application was saved, but sign in could not be started. Please sign in with your new account.");
      localStorage.setItem("token", token);
      navigate("/nurse/dashboard", { replace: true });
    } catch (error) {
      setMessage(error.message || "We could not submit your registration. Check the form and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="register-page auth-page">
      <header className="auth-navbar"><Link to="/" className="brand"><div className="brand-icon"><ShieldCheck size={25} /></div><div className="brand-text"><h2>Nurse Registry</h2><span>PLATEAU STATE</span></div></Link><Link to="/nurse/login" className="back-link"><ArrowLeft size={16} /> Back to sign in</Link></header>
      <section className="register-container">
        <div className="register-heading"><span className="portal-label">NURSE REGISTRATION</span><h1>Create your professional account</h1><p>Submit your details and documents for review by the Plateau State registry.</p></div>
        {message && <p className="registration-message" role="alert">{message}</p>}
        <form className="register-form" onSubmit={submit} encType="multipart/form-data">
          <section className="register-section"><div className="register-section-heading"><div className="register-section-icon"><UserRound size={21} /></div><div><h2>Personal information</h2><p>Your identification and account details.</p></div></div>
            <div className="register-grid"><div className="form-group"><label htmlFor="full-name">Full legal name</label><input id="full-name" name="full_name" autoComplete="name" placeholder="Enter your full name" required /></div><div className="form-group"><label htmlFor="nurse-email">Email address</label><input id="nurse-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></div><div className="form-group"><label htmlFor="phone">Phone number</label><input id="phone" name="phone" type="tel" inputMode="tel" pattern="\+?[0-9]{10,15}" autoComplete="tel" placeholder="08012345678" required /></div><div className="form-group"><label htmlFor="nin">National Identification Number</label><input id="nin" name="nin" inputMode="numeric" pattern="[0-9]{11}" minLength={11} maxLength={11} autoComplete="off" placeholder="11 digits" required /><span className="field-hint">Your NIN is encrypted and stays private.</span></div><div className="form-group"><label htmlFor="password">Create password</label><input id="password" name="password" type="password" minLength={8} autoComplete="new-password" required /></div><div className="form-group"><label htmlFor="password-confirm">Confirm password</label><input id="password-confirm" name="password_confirm" type="password" minLength={8} autoComplete="new-password" required /></div></div>
          </section>
          <section className="register-section"><div className="register-section-heading"><div className="register-section-icon"><BriefcaseMedical size={21} /></div><div><h2>Professional information</h2><p>Details from your nursing qualification and licence.</p></div></div>
            <div className="register-grid"><div className="form-group"><label htmlFor="licence-number">NMCN licence number</label><input id="licence-number" name="licence_number" placeholder="Enter your licence number" required /></div><div className="form-group"><label htmlFor="expiry-date">Licence expiry date</label><input id="expiry-date" name="licence_expiry" type="date" min={localToday} required /></div><div className="form-group"><label htmlFor="cadre">Professional cadre</label><select id="cadre" name="cadre" defaultValue="" required><option value="" disabled>Select your cadre</option><option>Registered Nurse</option><option>Registered Midwife</option><option>Nurse and Midwife</option><option>Other</option></select></div><div className="form-group"><label htmlFor="specialty">Specialty</label><input id="specialty" name="specialty" placeholder="e.g. General Nursing" required /></div></div>
          </section>
          <section className="register-section"><div className="register-section-heading"><div className="register-section-icon"><Building2 size={21} /></div><div><h2>Employment information</h2><p>Where you currently practise your profession.</p></div></div>
            <div className="register-grid"><div className="form-group"><label htmlFor="employer">Hospital or institution</label><select id="employer" name="employer" value={employerChoice} onChange={(event) => setEmployerChoice(event.target.value)} required><option value="" disabled>Select an approved institution</option>{employers.map((employer) => <option value={employer.id} key={employer.id}>{employer.name}{employer.lga ? ` · ${employer.lga}` : ""}</option>)}<option value="custom">My institution is not listed</option></select>{employerError && <span className="field-hint" role="status">{employerError}</span>}</div>{employerChoice === "custom" && <div className="form-group"><label htmlFor="custom-employer">Institution name</label><input id="custom-employer" name="custom_employer_name" placeholder="Enter institution name" required /></div>}<div className="form-group"><label htmlFor="ward">Ward or unit</label><input id="ward" name="ward" placeholder="e.g. Medical ward" /></div></div>
          </section>
          <section className="register-section"><div className="register-section-heading"><div className="register-section-icon"><FileCheck size={21} /></div><div><h2>Required documents</h2><p>Upload a clear licence scan and an identity selfie.</p></div></div>
            <div className="register-grid"><div className="form-group"><label htmlFor="licence-document">NMCN licence document</label><input id="licence-document" name="licence_scan" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={validateFile} required /><span className="field-hint">PDF, JPG or PNG · up to 10 MB.</span></div><div className="form-group"><label htmlFor="selfie">Initial identity selfie</label><input id="selfie" name="selfie" type="file" accept="image/jpeg,image/png" capture="user" onChange={validateFile} required /><span className="field-hint"><Camera size={14} /> A clear recent photo is used for identity review.</span></div></div>
          </section>
          <section className="register-section consent-section"><div className="register-section-heading"><div className="register-section-icon"><LockKeyhole size={21} /></div><div><h2>Consent</h2><p>Required before submitting your application.</p></div></div><label className="consent-checkbox"><input type="checkbox" name="consent" required /><span>I confirm that the information supplied is accurate and consent to processing my personal and professional information for registry administration and licence verification.</span></label><label className="consent-checkbox"><input type="checkbox" name="confirm_duplicate" /><span>If the registry finds a possible duplicate, I confirm that I have reviewed my details and want the application reviewed.</span></label></section>
          <div className="register-submit-area"><p>Your application will remain pending until an authorised registry officer completes the review.</p><button type="submit" className="register-submit" disabled={busy}>{busy ? "Submitting application…" : "Submit registration application"}</button><span>Already registered? <Link to="/nurse/login">Sign in</Link></span></div>
        </form>
      </section>
      <footer className="auth-footer"><p>© {new Date().getFullYear()} Plateau State Nurse Registry. All rights reserved.</p></footer>
    </main>
  );
}
