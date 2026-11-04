import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  FileCheck2,
  Hospital,
  LockKeyhole,
  SearchCheck,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import NurseLogin from "./pages/NurseLogin";
import HospitalLogin from "./pages/HospitalLogin";
import PublicVerify from "./pages/PublicVerify";
import NurseRegister from "./pages/NurseRegister";
import NurseDashboard from "./pages/NurseDashboard";
import NurseProfile from "./pages/NurseProfile";
import LicenceManagement from "./pages/LicenceManagement";
import DigitalIDCard from "./pages/DigitalIDCard";
import { Link } from "react-router-dom";
import NurseNotifications from "./pages/NurseNotifications";
import NurseLayout from "./components/nurse/NurseLayout";
import HRLayout from "./components/hr/HRLayout";
import HRDashboard from "./pages/hr/HRDashboard";
import HRNurseDirectory from "./pages/hr/HRNurseDirectory";
import HRLicenceMonitoring from "./pages/hr/HRLicenceMonitoring";
import HREmploymentVerification from "./pages/hr/HREmploymentVerification";
import HRReports from "./pages/hr/HRReports";
import HRSettings from "./pages/hr/HRSettings";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HRRegistration from "./pages/HRRegistration";
import AccountSecurity from "./pages/AccountSecurity";
import { ForgotPassword, ResetPassword } from "./pages/PasswordRecovery";
import RoleGuard from "./components/RoleGuard";
import RenewalReview from "./pages/admin/RenewalReview";
import AdminNurses from "./pages/admin/AdminNurses";
import AdminHRUsers from "./pages/admin/AdminHRUsers";
import AdminSupervisors from "./pages/admin/AdminSupervisors";
import "./clinical-ui.css";

function WelcomePage() {
  return (
    <main className="welcome-page">
      <header className="navbar">
        <Link to="/" className="brand">
          <div className="brand-icon">
            <ShieldCheck size={27} />
          </div>

          <div className="brand-text">
            <h2>Nurse Registry</h2>
            <span>PLATEAU STATE</span>
          </div>
        </Link>

        <nav className="landing-nav" aria-label="Main navigation">
          <a href="#portals">Portals</a>
          <a href="#how-it-works">How it works</a>
          <Link to="/verify" className="landing-nav-verify">Verify a nurse <ArrowRight size={16} /></Link>
        </nav>
      </header>

      <section className="landing-hero">
        <div className="landing-hero-copy">
          <span className="eyebrow"><span className="status-dot" /> PLATEAU STATE NURSE REGISTRY</span>
          <h1>Trusted nursing credentials, <span>all in one place.</span></h1>
          <p>Register your professional details, keep track of your licence, and let employers or the public verify credentials with confidence.</p>
          <div className="landing-hero-actions">
            <Link to="/nurse/register" className="landing-primary-action">Create nurse account <ArrowRight size={18} /></Link>
            <Link to="/verify" className="landing-secondary-action"><SearchCheck size={18} /> Verify a nurse</Link>
          </div>
          <p className="landing-login-hint">Already registered? <Link to="/nurse/login">Sign in to your account</Link></p>
        </div>

        <div className="landing-hero-art" aria-label="Illustration of a verified nurse registry credential" role="img">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-id-card">
            <div className="hero-card-top">
              <div className="hero-card-mark"><ShieldCheck size={20} /></div>
              <div><strong>PLATEAU STATE</strong><span>NURSE REGISTRY</span></div>
              <BadgeCheck className="hero-card-check" size={23} />
            </div>
            <div className="hero-card-person">
              <div className="hero-card-avatar"><UserRound size={31} /></div>
              <div><span>PROFESSIONAL IDENTITY</span><strong>Verified credentials</strong><small>Secure registry record</small></div>
            </div>
            <div className="hero-card-status"><span><i /> Registry status</span><strong><BadgeCheck size={16} /> Verified</strong></div>
            <div className="hero-card-code" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
          <div className="hero-float-note"><LockKeyhole size={17} /><span>Private information stays protected</span></div>
        </div>
      </section>

      <section className="landing-assurance" aria-label="Registry service features">
        <div><ShieldCheck size={20} /><span>Official professional records</span></div>
        <div><LockKeyhole size={20} /><span>Role-based secure access</span></div>
        <div><SearchCheck size={20} /><span>Simple credential checks</span></div>
      </section>

      <section className="landing-section portal-section" id="portals">
        <div className="landing-section-heading">
          <span className="eyebrow">ONE REGISTRY, THE RIGHT TOOLS</span>
          <h2>Start with the portal that fits your role.</h2>
          <p>Choose a secure workspace for your registry tasks.</p>
        </div>
        <div className="portal-grid">
          <article className="portal-card nurse-card">
            <div className="portal-icon nurse-icon"><UserRound size={27} /></div>
            <div className="portal-info">
              <span className="portal-label">FOR NURSES</span>
              <h3>Your professional profile</h3>
              <p>Manage your registration, monitor licence status, submit renewals and access your digital ID card.</p>
            </div>
            <Link to="/nurse/login" className="portal-button nurse-button"><span>Open nurse portal</span><ArrowRight size={18} /></Link>
            <Link to="/nurse/register" className="portal-text-link">New to the registry? Create an account</Link>
          </article>

          <article className="portal-card hospital-card">
            <div className="portal-icon hospital-icon"><Hospital size={27} /></div>
            <div className="portal-info">
              <span className="portal-label">FOR HOSPITALS & EMPLOYERS</span>
              <h3>Institutional workspace</h3>
              <p>Review nurses associated with your institution, monitor licence information and confirm employment.</p>
            </div>
            <Link to="/hospital/login" className="portal-button hospital-button"><span>Open hospital portal</span><ArrowRight size={18} /></Link>
            <Link to="/hospital/register" className="portal-text-link">Need access? Request an account</Link>
          </article>
        </div>
      </section>

      <section className="landing-how landing-section" id="how-it-works">
        <div className="landing-how-copy">
          <span className="eyebrow">A CLEAR PROCESS</span>
          <h2>From registration to verification.</h2>
          <p>The registry helps nurses, employers and the public find the right next step without sharing private information unnecessarily.</p>
        </div>
        <div className="landing-steps">
          <article className="landing-step"><span className="landing-step-number">01</span><div className="landing-step-icon"><ClipboardCheck size={21} /></div><div><h3>Submit your details</h3><p>Nurses create a profile and provide professional documents for review.</p></div></article>
          <article className="landing-step"><span className="landing-step-number">02</span><div className="landing-step-icon"><FileCheck2 size={21} /></div><div><h3>Registry staff review</h3><p>Applications and licence updates are reviewed before registry records are updated.</p></div></article>
          <article className="landing-step"><span className="landing-step-number">03</span><div className="landing-step-icon"><BadgeCheck size={21} /></div><div><h3>Verify with confidence</h3><p>Use a Registry ID to check a nurse's public professional status.</p></div></article>
        </div>
      </section>

      <section className="landing-verify-cta" id="verify">
        <div className="landing-verify-icon"><SearchCheck size={25} /></div>
        <div><span className="eyebrow">PUBLIC VERIFICATION</span><h2>Checking a nurse's credentials?</h2><p>Search by the Registry ID shown on their professional identification card.</p></div>
        <Link to="/verify" className="landing-primary-action">Verify a nurse <ArrowRight size={18} /></Link>
      </section>

      <footer className="site-footer">
        <div className="landing-footer-main">
          <Link to="/" className="brand">
            <div className="brand-icon"><ShieldCheck size={24} /></div>
            <div className="brand-text"><h2>Nurse Registry</h2><span>PLATEAU STATE</span></div>
          </Link>
          <p>A trusted place for nursing registration, licence management and professional verification.</p>
        </div>
        <div className="landing-footer-links"><strong>Portals</strong><Link to="/nurse/login">Nurse sign in</Link><Link to="/nurse/register">Nurse registration</Link><Link to="/hospital/login">Hospital sign in</Link></div>
        <div className="landing-footer-links"><strong>Public services</strong><Link to="/verify">Verify a nurse</Link><a href="#how-it-works">How it works</a><a href="#portals">Choose a portal</a></div>
        <div className="landing-footer-bottom"><span>© {new Date().getFullYear()} Plateau State Nurse Registry</span><span>Professional integrity. Public trust.</span></div>
      </footer>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />

      {/* Nurse authentication */}
      <Route path="/nurse/login" element={<NurseLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
      <Route path="/nurse/register" element={<NurseRegister />} />

      {/* Nurse Portal */}
      <Route path="/nurse" element={<RoleGuard roles={["nurse"]}><NurseLayout /></RoleGuard>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<NurseDashboard />} />
        <Route path="profile" element={<NurseProfile />} />
        <Route path="licence" element={<LicenceManagement />} />
        <Route path="id-card" element={<DigitalIDCard />} />
        <Route path="notifications" element={<NurseNotifications />} />
      </Route>

      {/* Hospital Portal */}
      {/* Hospital authentication */}
      <Route path="/hospital/login" element={<HospitalLogin />} />
      <Route path="/hospital/register" element={<HRRegistration />} />
      <Route path="/admin/login" element={<NurseLogin portal="admin" />} />

      {/* HR Portal */}
      <Route path="/hr" element={<RoleGuard roles={["hr"]} redirectTo="/hospital/login"><HRLayout /></RoleGuard>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<HRDashboard />} />
        <Route path="nurses" element={<HRNurseDirectory />} />
        <Route path="licences" element={<HRLicenceMonitoring />} />
        <Route path="employment" element={<HREmploymentVerification />} />
        <Route path="reports" element={<HRReports />} />
        <Route path="settings" element={<HRSettings />} />
      </Route>

      {/* Super Admin Portal */}
      <Route path="/admin" element={<RoleGuard roles={["super_admin", "supervisor"]} redirectTo="/admin/login"><AdminLayout /></RoleGuard>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="hr-registrations" element={<Navigate to="/admin/hr-users?tab=review" replace />} />
        <Route path="renewals" element={<RenewalReview />} />
        <Route path="nurses" element={<AdminNurses />} />
        <Route path="hr-users" element={<AdminHRUsers />} />
        <Route path="supervisors" element={<AdminSupervisors />} />
      </Route>

      <Route path="/account/security" element={<RoleGuard roles={["nurse", "hr", "super_admin", "supervisor"]}><AccountSecurity /></RoleGuard>} />

      {/* Public Verification */}
      <Route path="/verify" element={<PublicVerify />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
