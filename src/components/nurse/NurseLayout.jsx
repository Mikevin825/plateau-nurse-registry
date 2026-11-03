
import { useState } from 'react'
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  UserRound,
  FileCheck,
  CreditCard,
  Bell,
  LogOut,
  ShieldCheck,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'

import './NurseLayout.css'

const navigation = [
  {
    label: 'Overview',
    path: '/nurse/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'My Profile',
    path: '/nurse/profile',
    icon: UserRound,
  },
  {
    label: 'Licence & Renewal',
    path: '/nurse/licence',
    icon: FileCheck,
  },
  {
    label: 'Digital ID Card',
    path: '/nurse/id-card',
    icon: CreditCard,
  },
  {
    label: 'Notifications',
    path: '/nurse/notifications',
    icon: Bell,
  },
]

function NurseLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const location = useLocation()

  const currentPage =
    navigation.find((item) => item.path === location.pathname)?.label ||
    'Overview'

  function closeMobileSidebar() {
    setMobileOpen(false)
  }

  return (
    <div
      className={`nurse-shell ${collapsed ? 'sidebar-collapsed' : ''} ${
        mobileOpen ? 'mobile-sidebar-open' : ''
      }`}
    >
      <aside className="nurse-sidebar">
        <div className="nurse-sidebar-brand">
          <div className="nurse-brand-icon">
            <ShieldCheck size={23} />
          </div>

          <div className="nurse-brand-text">
            <h2>Nurse Registry</h2>
            <span>PLATEAU STATE</span>
          </div>
        </div>

        <div className="nurse-sidebar-label">WORKSPACE</div>

        <nav className="nurse-navigation">
          {navigation.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end
                onClick={closeMobileSidebar}
                className={({ isActive }) =>
                  `nurse-nav-link ${isActive ? 'active' : ''}`
                }
                title={collapsed ? item.label : undefined}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="nurse-sidebar-bottom">
          <Link
            to="/nurse/login"
            onClick={() => localStorage.removeItem("token")}
            className="nurse-nav-link nurse-logout-link"
          >
            <LogOut size={19} />
            <span>Sign out</span>
          </Link>
        </div>
      </aside>

      {mobileOpen && (
        <button
          type="button"
          className="nurse-mobile-overlay"
          aria-label="Close navigation"
          onClick={closeMobileSidebar}
        />
      )}

      <div className="nurse-main">
        <header className="nurse-topbar">
          <div className="nurse-topbar-left">
            <button
              type="button"
              className="nurse-menu-button"
              aria-label="Toggle sidebar"
              aria-expanded={!collapsed}
              onClick={() => setCollapsed((current) => !current)}
            >
              {collapsed ? (
                <PanelLeftOpen size={21} />
              ) : (
                <PanelLeftClose size={21} />
              )}
            </button>

            <button
              type="button"
              className="nurse-mobile-menu-button"
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={21} />
            </button>

            <div className="nurse-breadcrumb">
              <span>Nurse Portal</span>
              <span>/</span>
              <strong>{currentPage}</strong>
            </div>
          </div>

          <Link
            to="/nurse/notifications"
            className="nurse-notification-button"
            aria-label="View notifications"
          >
            <Bell size={20} />
          </Link>
        </header>

        <div className="nurse-page-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default NurseLayout
