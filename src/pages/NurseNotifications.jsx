import { useState } from 'react'
import {
  ArrowLeft,
  Bell,
  CheckCheck,
  ClipboardCheck,
  Clock,
  FileCheck,
  ShieldCheck,
  Building2,
  Info,
  Mail,
} from 'lucide-react'

import { Link } from 'react-router-dom'
import './NurseNotifications.css'

const initialNotifications = [
  {
    id: 1,
    type: 'registration',
    title: 'Registration submitted successfully',
    message:
      'Your registration details have been received. An authorised registry officer will review your application.',
    date: 'Just now',
    unread: true,
  },
  {
    id: 2,
    type: 'verification',
    title: 'Licence verification pending',
    message:
      'Your NMCN licence is awaiting manual verification against the relevant records.',
    date: 'Today',
    unread: true,
  },
  {
    id: 3,
    type: 'employment',
    title: 'Employment confirmation required',
    message:
      'Your declared employer will need to confirm your current employment details.',
    date: 'Yesterday',
    unread: false,
  },
]

function getNotificationIcon(type) {
  switch (type) {
    case 'registration':
      return <ClipboardCheck size={19} />

    case 'verification':
      return <ShieldCheck size={19} />

    case 'licence':
      return <FileCheck size={19} />

    case 'employment':
      return <Building2 size={19} />

    default:
      return <Info size={19} />
  }
}

function NurseNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [activeFilter, setActiveFilter] = useState('all')

  const unreadCount = notifications.filter(
    (notification) => notification.unread,
  ).length

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === 'unread') {
      return notification.unread
    }

    return true
  })

  function markAsRead(id) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification,
      ),
    )
  }

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      })),
    )
  }

  return (
    <div className="nurse-notifications-page">
      <header className="notifications-header">
        <Link to="/nurse/dashboard" className="notifications-back">
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </Link>

        <div className="notifications-brand">
          <ShieldCheck size={20} />
          <span>Nurse Registry</span>
        </div>
      </header>

      <main className="notifications-container">
        <div className="notifications-heading">
          <div>
            <span className="notifications-eyebrow">NURSE PORTAL</span>
            <h1>Notifications</h1>
            <p>
              Stay informed about your registration, licence and
              registry activities.
            </p>
          </div>

          <div className="notifications-count">
            <Bell size={19} />
            <span>{unreadCount} unread</span>
          </div>
        </div>

        <section className="notifications-summary">
          <div className="notifications-summary-icon">
            <Mail size={22} />
          </div>

          <div>
            <strong>You are up to date with your registry activity</strong>
            <p>
              Important updates about your registration and licence
              status will appear here.
            </p>
          </div>
        </section>

        <section className="notifications-panel">
          <div className="notifications-toolbar">
            <div>
              <h2>All notifications</h2>
              <span>{notifications.length} total updates</span>
            </div>

            <button
              className="mark-all-read"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <CheckCheck size={16} />
              Mark all as read
            </button>
          </div>

          <div className="notifications-filters">
            <button
              className={activeFilter === 'all' ? 'active' : ''}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>

            <button
              className={activeFilter === 'unread' ? 'active' : ''}
              onClick={() => setActiveFilter('unread')}
            >
              Unread
              {unreadCount > 0 && <span>{unreadCount}</span>}
            </button>
          </div>

          <div className="notifications-list">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <article
                  key={notification.id}
                  className={`notification-item ${
                    notification.unread ? 'unread' : ''
                  }`}
                >
                  <div className={`notification-icon ${notification.type}`}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="notification-content">
                    <div className="notification-title-row">
                      <h3>{notification.title}</h3>

                      {notification.unread && (
                        <span className="notification-unread-dot" />
                      )}
                    </div>

                    <p>{notification.message}</p>

                    <div className="notification-meta">
                      <span>
                        <Clock size={13} />
                        {notification.date}
                      </span>

                      {notification.unread && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="notifications-empty">
                <div>
                  <CheckCheck size={27} />
                </div>
                <h3>No unread notifications</h3>
                <p>You've read all your current registry updates.</p>
              </div>
            )}
          </div>
        </section>

        <p className="notifications-footer-note">
          These notifications are displayed for demonstration.
          Official registry updates and email alerts will be connected
          to the platform backend.
        </p>
      </main>
    </div>
  )
}

export default NurseNotifications