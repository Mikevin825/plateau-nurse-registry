import { useState } from 'react'
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  FileCheck,
  ClipboardCheck,
  ChartNoAxesCombined,
  Settings,
  LogOut,
  ShieldCheck,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Building2,
} from 'lucide-react'

import './HRLayout.css'

const navigation = [
  {
    label: 'Overview',
    path: '/hr/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Nurse Directory',
    path: '/hr/nurses',
    icon: Users,
  },
  {
    label: 'Licence Monitoring',
    path: '/hr/licences',
    icon: FileCheck,
  },
  {
    label: 'Employment Verification',
    path: '/hr/employment',
    icon: ClipboardCheck,
  },
  {
    label: 'Reports',
    path: '/hr/reports',
    icon: ChartNoAxesCombined,
  },
  {
    label: 'Settings',
    path: '/hr/settings',
    icon: Settings,
  },
]

function HRLayout() {
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
      className={`hr-shell ${collapsed ? 'sidebar-collapsed' : ''} ${
        mobileOpen ? 'mobile-sidebar-open' : ''
      }`}
    >
      <aside className="hr-sidebar">
        <div className="hr-sidebar-brand">
          <div className="hr-brand-icon">
            <ShieldCheck size={23} />
          </div>

          <div className="hr-brand-text">
            <h2>Nurse Registry</h2>
            <span>HOSPITAL PORTAL</span>
          </div>
        </div>

        <div className="hr-hospital-identity">
          <Building2 size={17} />
          <span>Hospital Workspace</span>
        </div>

        <div className="hr-sidebar-label">WORKSPACE</div>

        <nav className="hr-navigation">
          {navigation.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end
                onClick={closeMobileSidebar}
                className={({ isActive }) =>
                  `hr-nav-link ${isActive ? 'active' : ''}`
                }
                title={collapsed ? item.label : undefined}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="hr-sidebar-bottom">
          <Link
            to="/hospital/login"
            onClick={() => localStorage.removeItem("token")}
            className="hr-nav-link hr-logout-link"
          >
            <LogOut size={19} />
            <span>Sign out</span>
          </Link>
        </div>
      </aside>

      {mobileOpen && (
        <button
          type="button"
          className="hr-mobile-overlay"
          aria-label="Close navigation"
          onClick={closeMobileSidebar}
        />
      )}

      <div className="hr-main">
        <header className="hr-topbar">
          <div className="hr-topbar-left">
            <button
              type="button"
              className="hr-menu-button"
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
              className="hr-mobile-menu-button"
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={21} />
            </button>

            <div className="hr-breadcrumb">
              <span>Hospital Portal</span>
              <span>/</span>
              <strong>{currentPage}</strong>
            </div>
          </div>

          <div className="hr-topbar-identity">
            <Building2 size={17} />
            <span>Hospital Administrator</span>
          </div>
        </header>

        <div className="hr-page-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default HRLayout
