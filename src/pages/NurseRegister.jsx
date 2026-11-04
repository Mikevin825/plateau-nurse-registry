import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEmployerOptions, registerNurse } from "../apiService";
import "./NurseRegister.css";

const steps = ["Personal and account", "Professional credentials", "Employment", "Documents and review"];
const fieldsByStep = [
  ["full_name", "email", "phone", "nin", "password", "password_confirm"],
  ["licence_number", "licence_expiry", "cadre", "specialty"],
  ["employer", "custom_employer_name", "ward"],
  ["licence_scan", "selfie", "consent"],
];
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const initial = { full_name: "", email: "", phone: "", nin: "", password: "", password_confirm: "", licence_number: "", licence_expiry: "", cadre: "", specialty: "", employer: "", custom_employer_name: "", ward: "", licence_scan: null, selfie: null, consent: false, confirm_duplicate: false };

export default function NurseRegister() {
  const navigate = useNavigate();
  const [employers, setEmployers] = useState([]);
  const [employerError, setEmployerError] = useState("");
  const [values, setValues] = useState(initial);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const summaryRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => { let live = true; getEmployerOptions().then(rows => { if (live) setEmployers(rows); }).catch(error => { if (live) setEmployerError(error.message || "Could not load approved employers."); }); return () => { live = false; }; }, []);
  useEffect(() => { titleRef.current?.focus(); }, [step]);
  function set(name, value) { setValues(current => ({ ...current, [name]: value })); setErrors(current => ({ ...current, [name]: "" })); }

  function validate(currentStep) {
    const next = {};
    const required = fieldsByStep[currentStep];
    for (const name of required) {
      if (name === "custom_employer_name" && values.employer !== "custom") continue;
      if (name === "employer" && values.employer === "custom") continue;
      const value = values[name];
      if (value === null || value === undefined || value === "" || value === false) next[name] = "This field is required.";
    }
    if (currentStep === 0) {
      if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid email address.";
      if (values.phone && !/^\+?[0-9]{10,15}$/.test(values.phone)) next.phone = "Enter a phone number with 10 to 15 digits.";
      if (values.nin && !/^\d{11}$/.test(values.nin)) next.nin = "Enter an 11-digit NIN.";
      if (values.password && values.password.length < 8) next.password = "Use at least 8 characters.";
      if (values.password !== values.password_confirm) next.password_confirm = "Passwords do not match.";
    }
    if (currentStep === 1 && values.licence_expiry && values.licence_expiry < localToday) next.licence_expiry = "Expiry date must be today or later.";
    if (currentStep === 3) {
      for (const name of ["licence_scan", "selfie"]) if (values[name] && values[name].size > 10 * 1024 * 1024) next[name] = "Choose a file up to 10 MB.";
      if (!values.consent) next.consent = "Consent is required to submit.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }
  function continueStep() { setMessage(""); if (validate(step)) setStep(s => Math.min(s + 1, steps.length - 1)); else requestAnimationFrame(() => summaryRef.current?.focus()); }
  function mapServerError(error) {
    const text = error.message || "We could not submit your registration. Check the details and try again.";
    const mapped = {};
    for (const match of text.matchAll(/([a-z_]+):\s*([^;\n]+)/gi)) if (initial[match[1]] !== undefined) mapped[match[1]] = match[2];
    const order = Object.keys(mapped);
    if (order.length) { const targetStep = fieldsByStep.findIndex(list => list.some(field => mapped[field])); if (targetStep >= 0) { setStep(targetStep); setErrors(mapped); setMessage("Review the highlighted information and submit again."); requestAnimationFrame(() => summaryRef.current?.focus()); return; } }
    setMessage(text);
  }
  async function submit(event) {
    event.preventDefault(); setMessage("");
    if (!validate(3)) { summaryRef.current?.focus(); return; }
    setBusy(true);
    const form = new FormData();
    for (const [name, value] of Object.entries(values)) {
      if (name === "password_confirm") continue;
      if (name === "employer" && value === "custom") { form.set("employer", ""); continue; }
      if (value !== null && value !== "") form.set(name, typeof value === "boolean" ? String(value) : value);
    }
    try { const result = await registerNurse(form); const token = result.token || result.access; if (!token) throw new Error("Application saved. Sign in to continue."); localStorage.setItem("token", token); navigate("/nurse/dashboard", { replace: true }); }
    catch (error) { mapServerError(error); }
    finally { setBusy(false); }
  }
  const input = (name, label, props = {}) => <div className="form-group" key={name}><label htmlFor={name}>{label}</label><input id={name} name={name} value={values[name]} onChange={e => set(name, e.target.value)} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} {...props} />{errors[name] && <small id={`${name}-error`} className="step-field-error">{errors[name]}</small>}</div>;
  const fileInput = (name, label, accept, extra = {}) => <div className="form-group" key={name}><label htmlFor={name}>{label}</label><input id={name} type="file" accept={accept} onChange={e => set(name, e.target.files?.[0] || null)} aria-invalid={Boolean(errors[name])} {...extra} /><small>{values[name]?.name || "PDF, JPG or PNG · up to 10 MB"}</small>{errors[name] && <small className="step-field-error">{errors[name]}</small>}</div>;
  return <main className="register-page auth-page"><header className="auth-navbar"><Link to="/" className="brand"><span className="brand-icon" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3 19 6v5c0 5-3.2 8-7 10-3.8-2-7-5-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/></svg></span><span className="brand-text"><strong>Nurse Registry</strong><small>PLATEAU STATE</small></span></Link><Link to="/nurse/login" className="back-link">←&nbsp; Back to sign in</Link></header>
    <section className="register-container"><div className="register-heading"><span className="portal-label">NURSE REGISTRATION</span><h1>Create your professional account</h1><p>Complete four short steps. Your details and files stay on this device until you submit.</p></div>
      <ol className="registration-progress" aria-label="Registration progress">{steps.map((name, index) => <li key={name} aria-current={step === index ? "step" : undefined} className={index < step ? "complete" : index === step ? "current" : ""}><span>{index + 1}</span><span>{name}</span></li>)}</ol>
      <form className="register-form registration-wizard" onSubmit={step === 3 ? submit : e => { e.preventDefault(); continueStep(); }} noValidate>
        {(message || Object.keys(errors).length > 0) && <div ref={summaryRef} className="registration-message" role="alert" tabIndex={-1}><strong>{message || "Check the information in this step."}</strong>{Object.values(errors).some(Boolean) && <ul>{Object.entries(errors).filter(([, value]) => value).map(([key, value]) => <li key={key}><a href={`#${key}`} onClick={event => { event.preventDefault(); document.getElementById(key)?.focus(); }}>{value}</a></li>)}</ul>}</div>}
        <section className="register-section" aria-labelledby="registration-step-title"><div className="register-section-heading"><div><p className="portal-label">STEP {step + 1} OF 4</p><h2 id="registration-step-title" ref={titleRef} tabIndex={-1}>{steps[step]}</h2><p>{["Your identification and account details.", "Details from your nursing qualification and licence.", "Where you currently practise your profession.", "Attach your documents, confirm consent, then review."][step]}</p></div></div>
          {step === 0 && <div className="register-grid">{input("full_name", "Full legal name", { autoComplete: "name", required: true })}{input("email", "Email address", { type: "email", autoComplete: "email", required: true })}{input("phone", "Phone number", { type: "tel", inputMode: "tel", pattern: "\\+?[0-9]{10,15}", autoComplete: "tel", required: true })}{input("nin", "National Identification Number", { inputMode: "numeric", minLength: 11, maxLength: 11, autoComplete: "off", required: true })}{input("password", "Create password", { type: "password", minLength: 8, autoComplete: "new-password", required: true })}{input("password_confirm", "Confirm password", { type: "password", minLength: 8, autoComplete: "new-password", required: true })}</div>}
          {step === 1 && <div className="register-grid">{input("licence_number", "NMCN licence number", { required: true })}{input("licence_expiry", "Licence expiry date", { type: "date", min: localToday, required: true })}<div className="form-group"><label htmlFor="cadre">Professional cadre</label><select id="cadre" value={values.cadre} onChange={e => set("cadre", e.target.value)} aria-invalid={Boolean(errors.cadre)}><option value="">Select your cadre</option>{["Registered Nurse", "Registered Midwife", "Nurse and Midwife", "Other"].map(x => <option key={x}>{x}</option>)}</select>{errors.cadre && <small className="step-field-error">{errors.cadre}</small>}</div>{input("specialty", "Specialty", { placeholder: "e.g. General Nursing", required: true })}</div>}
          {step === 2 && <div className="register-grid"><div className="form-group"><label htmlFor="employer">Hospital or institution</label><select id="employer" value={values.employer} onChange={e => set("employer", e.target.value)} aria-invalid={Boolean(errors.employer)}><option value="">Select an approved institution</option>{employers.map(row => <option value={row.id} key={row.id}>{row.name}{row.lga ? ` · ${row.lga}` : ""}</option>)}<option value="custom">My institution is not listed</option></select>{employerError && <small>{employerError}</small>}{errors.employer && <small className="step-field-error">{errors.employer}</small>}</div>{values.employer === "custom" && input("custom_employer_name", "Institution name", { required: true })}{input("ward", "Ward or unit", { placeholder: "e.g. Medical ward" })}</div>}
          {step === 3 && <><div className="register-grid">{fileInput("licence_scan", "NMCN licence document", ".pdf,.jpg,.jpeg,.png", { required: true })}{fileInput("selfie", "Initial identity selfie", "image/jpeg,image/png", { capture: "user", required: true })}</div><label className="consent-checkbox"><input id="consent" type="checkbox" checked={values.consent} onChange={e => set("consent", e.target.checked)} /><span>I confirm the information is accurate and consent to processing for registry administration and licence verification.</span></label>{errors.consent && <small className="step-field-error">{errors.consent}</small>}<label className="consent-checkbox"><input type="checkbox" checked={values.confirm_duplicate} onChange={e => set("confirm_duplicate", e.target.checked)} /><span>If a possible duplicate is found, I have reviewed my details and want the application reviewed.</span></label><div className="registration-review"><h3>Review your details</h3><p><strong>Name:</strong> {values.full_name || "—"}</p><p><strong>Email:</strong> {values.email || "—"}</p><p><strong>Licence:</strong> {values.licence_number || "—"} · {values.cadre || "—"}</p><p><strong>Employer:</strong> {values.employer === "custom" ? values.custom_employer_name || "—" : employers.find(row => String(row.id) === String(values.employer))?.name || "—"}</p></div></>}
        </section>
        <div className="registration-step-actions">{step > 0 && <button type="button" className="registration-back" onClick={() => { setErrors({}); setStep(s => s - 1); }}>Back</button>}{step < 3 ? <button type="submit" className="register-submit">Continue</button> : <button type="submit" className="register-submit" disabled={busy}>{busy ? "Submitting application…" : "Submit registration application"}</button>}</div>
      </form>
      <p className="registration-pending-note">Your application remains pending until an authorised registry officer completes the review.</p><p className="registration-signin">Already registered? <Link to="/nurse/login">Sign in</Link></p>
    </section><footer className="auth-footer"><p>© {new Date().getFullYear()} Plateau State Nurse Registry. All rights reserved.</p></footer></main>;
}
