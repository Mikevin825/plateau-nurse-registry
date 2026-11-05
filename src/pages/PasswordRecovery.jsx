import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { confirmPasswordReset, requestPasswordReset } from "../apiService";
import "./PasswordRecovery.css";

function RecoveryFrame({ children, signInPath = "/nurse/login" }) {
  return (
    <main className="password-recovery-page">
      <header className="recovery-header">
        <Link to="/" className="recovery-brand">Plateau State <span>Nurse Registry</span></Link>
        <Link to={signInPath} className="recovery-back">Back to sign in</Link>
      </header>
      <section className="recovery-content">{children}</section>
      <footer className="recovery-footer">Plateau State Nurse Registry</footer>
    </main>
  );
}

export function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const portal = searchParams.get("portal");
  const signInPath = portal === "hr" ? "/hospital/login" : portal === "admin" ? "/admin/login" : "/nurse/login";
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [deliveryHint, setDeliveryHint] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await requestPasswordReset(email.trim());
      setDeliveryHint(result?.delivery_hint || "");
      setSent(true);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <RecoveryFrame signInPath={signInPath}>
      <span className="recovery-eyebrow">ACCOUNT RECOVERY</span>
      <h1>Forgot your password?</h1>
      <p className="recovery-intro">Enter the email address linked to your registry account. If it is registered, we’ll send a one-time reset link.</p>
      {sent ? (
        <div className="recovery-message" role="status">
          <strong>Check your email</strong>
          <p>If an active account uses <b>{email}</b>, a password reset link has been sent. Check your spam folder if it does not arrive.</p>
          {deliveryHint && <p className="recovery-delivery-hint">{deliveryHint}</p>}
          <Link to={signInPath}>Return to sign in</Link>
        </div>
      ) : (
        <form className="recovery-form" onSubmit={submit}>
          <label htmlFor="recovery-email">Email address</label>
          <input id="recovery-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" />
          {error && <p className="recovery-error" role="alert">{error}</p>}
          <button type="submit" disabled={busy}>{busy ? "Sending link…" : "Send reset link"}</button>
        </form>
      )}
      <p className="recovery-signin">Remembered your password? <Link to={signInPath}>Return to sign in</Link></p>
    </RecoveryFrame>
  );
}

export function ResetPassword() {
  const { uidb64, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [complete, setComplete] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      await confirmPasswordReset(uidb64, token, password);
      setComplete(true);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <RecoveryFrame>
      <span className="recovery-eyebrow">ACCOUNT RECOVERY</span>
      <h1>{complete ? "Password updated" : "Choose a new password"}</h1>
      {complete ? (
        <div className="recovery-message" role="status">
          <p>Your password has been changed. You can now sign in with your new password.</p>
          <div className="recovery-login-links"><Link to="/nurse/login">Nurse sign in</Link><Link to="/hospital/login">Hospital / HR sign in</Link></div>
        </div>
      ) : (
        <>
          <p className="recovery-intro">Use a new password you have not used for this account before.</p>
          <form className="recovery-form" onSubmit={submit}>
            <label htmlFor="new-password">New password</label>
            <input id="new-password" type="password" autoComplete="new-password" minLength="8" required value={password} onChange={(event) => setPassword(event.target.value)} />
            <label htmlFor="confirm-password">Confirm new password</label>
            <input id="confirm-password" type="password" autoComplete="new-password" minLength="8" required value={confirm} onChange={(event) => setConfirm(event.target.value)} />
            {error && <p className="recovery-error" role="alert">{error}</p>}
            <button type="submit" disabled={busy}>{busy ? "Updating password…" : "Update password"}</button>
          </form>
          <p className="recovery-signin"><Link to="/nurse/login">Return to sign in</Link></p>
        </>
      )}
    </RecoveryFrame>
  );
}
