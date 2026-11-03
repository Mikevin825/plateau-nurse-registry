
import { useState } from "react";
import {
  Building2,
  UserRound,
  Bell,
  ShieldCheck,
  Save,
  LockKeyhole,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import "./HRSettings.css";

export default function HRSettings() {
  const [notifications, setNotifications] = useState({
    licenceExpiry: true,
    employmentRequests: true,
    registryUpdates: false,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const [notice, setNotice] = useState("");

  const [account] = useState({
    name: "Hospital HR Administrator",
    email: "hr@hospital.example",
    role: "Hospital HR Administrator",
    hospital: "Plateau State Specialist Hospital",
  });

  const [hospital] = useState({
    name: "Plateau State Specialist Hospital",
    registrationId: "HOSP-PL-001",
    email: "admin@hospital.example",
    phone: "+234 800 000 0000",
    address: "Plateau State, Nigeria",
  });

  function updateNotification(key) {
    setNotifications((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));

    setNotice(
      "Preference updated locally. Backend synchronisation is not yet connected."
    );
  }

  function updatePasswordField(event) {
    const { name, value } = event.target;

    setPasswords((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handlePasswordSubmit(event) {
    event.preventDefault();
    setNotice("");

    if (!passwords.current || !passwords.next || !passwords.confirm) {
      setNotice("Please complete all password fields.");
      return;
    }

    if (passwords.next.length < 8) {
      setNotice("Your new password must contain at least 8 characters.");
      return;
    }

    if (passwords.next !== passwords.confirm) {
      setNotice("The new passwords do not match.");
      return;
    }

    setNotice(
      "Password validation passed. Actual password changes require backend integration."
    );

    setPasswords({
      current: "",
      next: "",
      confirm: "",
    });
  }

  return (
    <div className="hr-settings-page">
      <header className="hr-settings-header">
        <div>
          <span className="hr-settings-eyebrow">
            ACCOUNT MANAGEMENT
          </span>
          <h1>Settings</h1>
          <p>
            Manage your hospital information, HR account,
            notification preferences and security.
          </p>
        </div>
      </header>

      {notice && (
        <div className="hr-settings-notice" role="status">
          <AlertCircle size={19} />
          <span>{notice}</span>
        </div>
      )}

      <section className="hr-settings-card">
        <div className="hr-settings-card-heading">
          <div className="hr-settings-heading-icon">
            <Building2 size={22} />
          </div>
          <div>
            <h2>Hospital Information</h2>
            <p>Information associated with your HR workspace.</p>
          </div>
        </div>

        <div className="hr-settings-information-grid">
          <div className="hr-settings-information-item">
            <span>Hospital Name</span>
            <strong>{hospital.name}</strong>
          </div>

          <div className="hr-settings-information-item">
            <span>Facility Registration ID</span>
            <strong>{hospital.registrationId}</strong>
          </div>

          <div className="hr-settings-information-item">
            <span>Contact Email</span>
            <strong>{hospital.email}</strong>
          </div>

          <div className="hr-settings-information-item">
            <span>Contact Phone</span>
            <strong>{hospital.phone}</strong>
          </div>

          <div className="hr-settings-information-item full">
            <span>Location</span>
            <strong>
              <MapPin size={16} />
              {hospital.address}
            </strong>
          </div>
        </div>

        <div className="hr-settings-readonly">
          <ShieldCheck size={18} />
          <span>
            Hospital registration details are managed by the
            registry administrator. Contact the registry to
            request corrections.
          </span>
        </div>
      </section>

      <section className="hr-settings-card">
        <div className="hr-settings-card-heading">
          <div className="hr-settings-heading-icon">
            <UserRound size={22} />
          </div>
          <div>
            <h2>HR Account</h2>
            <p>Your account identity and assigned permissions.</p>
          </div>
        </div>

        <div className="hr-settings-information-grid">
          <div className="hr-settings-information-item">
            <span>Account Name</span>
            <strong>{account.name}</strong>
          </div>

          <div className="hr-settings-information-item">
            <span>Email Address</span>
            <strong>
              <Mail size={16} />
              {account.email}
            </strong>
          </div>

          <div className="hr-settings-information-item">
            <span>Account Role</span>
            <strong>{account.role}</strong>
          </div>

          <div className="hr-settings-information-item">
            <span>Assigned Hospital</span>
            <strong>{account.hospital}</strong>
          </div>
        </div>

        <div className="hr-settings-readonly">
          <ShieldCheck size={18} />
          <span>
            Your HR account is restricted to its assigned
            hospital. Account identity and permissions are
            controlled by the registry administrator.
          </span>
        </div>
      </section>

      <section className="hr-settings-card">
        <div className="hr-settings-card-heading">
          <div className="hr-settings-heading-icon">
            <Bell size={22} />
          </div>
          <div>
            <h2>Notification Preferences</h2>
            <p>Choose which administrative updates you receive.</p>
          </div>
        </div>

        <div className="hr-settings-preferences">
          <label className="hr-settings-preference">
            <div>
              <strong>Licence Expiry Alerts</strong>
              <p>
                Receive notifications when nurses' licences
                approach their expiry dates.
              </p>
            </div>

            <input
              type="checkbox"
              checked={notifications.licenceExpiry}
              onChange={() => updateNotification("licenceExpiry")}
            />
          </label>

          <label className="hr-settings-preference">
            <div>
              <strong>Employment Verification Requests</strong>
              <p>
                Receive notifications when employment
                confirmations require attention.
              </p>
            </div>

            <input
              type="checkbox"
              checked={notifications.employmentRequests}
              onChange={() => updateNotification("employmentRequests")}
            />
          </label>

          <label className="hr-settings-preference">
            <div>
              <strong>Registry Updates</strong>
              <p>
                Receive general announcements and important
                registry information.
              </p>
            </div>

            <input
              type="checkbox"
              checked={notifications.registryUpdates}
              onChange={() => updateNotification("registryUpdates")}
            />
          </label>
        </div>
      </section>

      <section className="hr-settings-card">
        <div className="hr-settings-card-heading">
          <div className="hr-settings-heading-icon">
            <LockKeyhole size={22} />
          </div>
          <div>
            <h2>Account Security</h2>
            <p>Manage your account password.</p>
          </div>
        </div>

        <form
          className="hr-settings-password-form"
          onSubmit={handlePasswordSubmit}
        >
          <label>
            <span>Current Password</span>
            <input
              type="password"
              name="current"
              value={passwords.current}
              onChange={updatePasswordField}
              placeholder="Enter current password"
              autoComplete="current-password"
            />
          </label>

          <label>
            <span>New Password</span>
            <input
              type="password"
              name="next"
              value={passwords.next}
              onChange={updatePasswordField}
              placeholder="Enter new password"
              autoComplete="new-password"
            />
          </label>

          <label>
            <span>Confirm New Password</span>
            <input
              type="password"
              name="confirm"
              value={passwords.confirm}
              onChange={updatePasswordField}
              placeholder="Confirm new password"
              autoComplete="new-password"
            />
          </label>

          <button type="submit">
            <Save size={18} />
            Update Password
          </button>
        </form>

        <div className="hr-settings-security-note">
          <CheckCircle2 size={18} />
          <span>
            Password changes will be processed securely by
            the authentication service once backend integration
            is complete. This demonstration does not change
            your actual password.
          </span>
        </div>
      </section>
    </div>
  );
}
