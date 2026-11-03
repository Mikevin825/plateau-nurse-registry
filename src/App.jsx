import { ShieldCheck, UserRound, Hospital, ArrowRight } from "lucide-react";
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
import AdminNurseRegistry from "./pages/admin/AdminNurseRegistry";

function WelcomePage() {
  return (
    <main className="welcome-page">
      {/* Navigation */}
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

        <div className="nav-status">
          <span className="status-dot"></span>
          Official Registry Portal
        </div>
      </header>

      {/* Main Content */}
      <section className="welcome-content">
        <div className="welcome-heading">
          <span className="eyebrow">PLATEAU STATE NURSE REGISTRY</span>

          <h1>
            Professional identity.
            <br />
            <span>Verified with confidence.</span>
          </h1>

          <p>
            A central platform for nurse registration, professional licensing
            and identity verification across Plateau State.
          </p>
        </div>

        {/* Portal Selection */}
        <div className="portal-section">
          <div className="section-heading">
            <h2>Choose your portal</h2>
            <p>Select the appropriate access point to continue.</p>
          </div>

          <div className="portal-grid">
            {/* Nurse Portal */}
            <article className="portal-card nurse-card">
              <div className="portal-icon nurse-icon">
                <UserRound size={30} />
              </div>

              <div className="portal-info">
                <span className="portal-label">FOR REGISTERED NURSES</span>

                <h3>Nurse Portal</h3>

                <p>
                  Access your professional profile, monitor your licence status,
                  manage renewals and download your digital identification card.
                </p>
              </div>

              <Link to="/nurse/login" className="portal-button nurse-button">
                <span>Enter Nurse Portal</span>
                <ArrowRight size={19} />
              </Link>

              <div className="portal-footer">
                <ShieldCheck size={16} />
                Secure professional access
              </div>
            </article>

            {/* Hospital Portal */}
            <article className="portal-card hospital-card">
              <div className="portal-icon hospital-icon">
                <Hospital size={30} />
              </div>

              <div className="portal-info">
                <span className="portal-label">FOR HOSPITALS & EMPLOYERS</span>

                <h3>Hospital Portal</h3>

                <p>
                  Verify nursing professionals, review licensing information and
                  access employment details through your approved hospital
                  account.
                </p>
              </div>

              <Link
                to="/hospital/login"
                className="portal-button hospital-button"
              >
                <span>Enter Hospital Portal</span>
                <ArrowRight size={19} />
              </Link>

              <div className="portal-footer">
                <ShieldCheck size={16} />
                Authorised institutional access
              </div>
            </article>
          </div>
        </div>

        {/* Public Verification */}
        <div className="public-verification">
          <div>
            <ShieldCheck size={21} />
            <span>Need to verify a nurse's licence?</span>
          </div>

          <Link to="/verify">
            Public Verification
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} Plateau State Nurse Registry. All rights
          reserved.
        </p>

        <span>Professional integrity. Public trust.</span>
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
      <Route path="/nurse/register" element={<NurseRegister />} />

      {/* Nurse Portal */}
      <Route path="/nurse" element={<NurseLayout />}>
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

      {/* HR Portal */}
      <Route path="/hr" element={<HRLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<HRDashboard />} />
        <Route path="nurses" element={<HRNurseDirectory />} />
        <Route path="licences" element={<HRLicenceMonitoring />} />
        <Route path="employment" element={<HREmploymentVerification />} />
        <Route path="reports" element={<HRReports />} />
        <Route path="settings" element={<HRSettings />} />
      </Route>

      {/* Super Admin Portal */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="nurses" element={<AdminNurseRegistry />} />
      </Route>

      {/* Public Verification */}
      <Route path="/verify" element={<PublicVerify />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
