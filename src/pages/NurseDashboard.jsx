
import {
  UserRound,
  FileCheck,
  CreditCard,
  ShieldCheck,
  Clock3,
  AlertCircle,
  ArrowUpRight,
} from 'lucide-react'

import './NurseDashboard.css'

function NurseDashboard() {
  return (
    <section className="dashboard-content">
      <div className="dashboard-welcome">
        <div>
          <span className="dashboard-eyebrow">NURSE PORTAL</span>
          <h1>Welcome back, Nurse</h1>
          <p>Here's an overview of your professional registry account.</p>
        </div>

        <div className="dashboard-date">
          <Clock3 size={17} />
          <span>Account overview</span>
        </div>
      </div>

      {/* Status cards */}
      <div className="dashboard-stats">
        <article className="stat-card">
          <div className="stat-card-top">
            <span>Registration status</span>
            <div className="stat-icon green">
              <ShieldCheck size={21} />
            </div>
          </div>

          <h2>Pending Review</h2>
          <span className="stat-description">
            Awaiting officer verification
          </span>
        </article>

        <article className="stat-card">
          <div className="stat-card-top">
            <span>Licence status</span>
            <div className="stat-icon blue">
              <FileCheck size={21} />
            </div>
          </div>

          <h2>Not Verified</h2>
          <span className="stat-description">
            Licence review is pending
          </span>
        </article>

        <article className="stat-card">
          <div className="stat-card-top">
            <span>Registry ID</span>
            <div className="stat-icon purple">
              <CreditCard size={21} />
            </div>
          </div>

          <h2>Not Issued</h2>
          <span className="stat-description">
            Issued after registration approval
          </span>
        </article>
      </div>

      {/* Registration notice */}
      <section className="dashboard-notice">
        <div className="notice-icon">
          <AlertCircle size={22} />
        </div>

        <div className="notice-content">
          <h3>Your registration is under review</h3>
          <p>
            Your submitted information and documents are awaiting
            verification by an authorised registry officer. Your NANNM
            Registry ID will be issued after approval.
          </p>
        </div>

        <ArrowUpRight size={20} className="notice-arrow" />
      </section>

      {/* Lower dashboard sections */}
      <div className="dashboard-lower-grid">
        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <h3>Professional Information</h3>
              <p>Your registered professional details</p>
            </div>

            <UserRound size={20} />
          </div>

          <div className="profile-placeholder">
            <div className="profile-avatar">
              <UserRound size={30} />
            </div>

            <div>
              <h4>Profile not yet verified</h4>
              <p>Your approved details will appear here.</p>
            </div>
          </div>

          <div className="panel-divider"></div>

          <div className="profile-detail">
            <span>Licence number</span>
            <strong>Pending verification</strong>
          </div>

          <div className="profile-detail">
            <span>Current employer</span>
            <strong>Pending verification</strong>
          </div>

          <div className="profile-detail">
            <span>Professional cadre</span>
            <strong>Pending verification</strong>
          </div>
        </section>

        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <h3>Licence & Renewal</h3>
              <p>Manage your professional licence</p>
            </div>

            <FileCheck size={20} />
          </div>

          <div className="renewal-empty">
            <div className="renewal-icon">
              <FileCheck size={27} />
            </div>

            <h4>No verified licence yet</h4>

            <p>
              Your licence information and renewal options will become
              available after your registration has been reviewed.
            </p>
          </div>
        </section>
      </div>
    </section>
  )
}

export default NurseDashboard
