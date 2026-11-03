
import { useState } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  Link,
} from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Flag,
  RefreshCw,
  ShieldAlert,
  Building2,
  UserCog,
  FileBarChart,
  ScrollText,
  Settings,
  LogOut,
  ShieldCheck,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import "./AdminLayout.css";

const navigation = [
  { label: "Overview", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Nurse Registry", path: "/admin/nurses", icon: Users },
  { label: "Pending Approvals", path: "/admin/approvals", icon: ClipboardCheck },
  { label: "Flagged Records", path: "/admin/flagged", icon: Flag },
  { label: "Licence Renewals", path: "/admin/renewals", icon: RefreshCw },
  { label: "Suspended / Revoked", path: "/admin/restricted", icon: ShieldAlert },
  { label: "Hospitals", path: "/admin/hospitals", icon: Building2 },
  { label: "User Management", path: "/admin/users", icon: UserCog },
  { label: "Reports & Exports", path: "/admin/reports", icon: FileBarChart },
  { label: "Audit Logs", path: "/admin/audit-logs", icon: ScrollText },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();

  const currentPage =
    navigation.find((item) => item.path === location.pathname)?.label ||
    "Overview";

  function closeMobileSidebar() {
    setMobileOpen(false);
  }

  return (
    <div
      className={`admin-shell ${collapsed ? "sidebar-collapsed" : ""} ${
        mobileOpen ? "mobile-sidebar-open" : ""
      }`}
    >
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <div className="admin-brand-icon">
            <ShieldCheck size={24} />
          </div>

          <div className="admin-brand-text">
            <h2>Nurse Registry</h2>
            <span>REGULATORY ADMINISTRATION</span>
          </div>
        </div>

        <div className="admin-workspace-identity">
          <ShieldCheck size={18} />
          <span>Super Admin Workspace</span>
        </div>

        <div className="admin-sidebar-label">ADMINISTRATION</div>

        <nav className="admin-navigation" aria-label="Admin navigation">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end
                onClick={closeMobileSidebar}
                className={({ isActive }) =>
                  `admin-nav-link ${isActive ? "active" : ""}`
                }
                title={collapsed ? item.label : undefined}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="admin-sidebar-bottom">
          <Link
            to="/admin/login"
            className="admin-nav-link admin-logout-link"
          >
            <LogOut size={20} />
            <span>Sign out</span>
          </Link>
        </div>
      </aside>

      {mobileOpen && (
        <button
          type="button"
          className="admin-mobile-overlay"
          aria-label="Close navigation"
          onClick={closeMobileSidebar}
        />
      )}

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-menu-button"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
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
              className="admin-mobile-menu-button"
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={21} />
            </button>

            <div className="admin-breadcrumb">
              <span>Super Admin</span>
              <span>/</span>
              <strong>{currentPage}</strong>
            </div>
          </div>

          <div className="admin-topbar-identity">
            <ShieldCheck size={19} />
            <span>Super Administrator</span>
          </div>
        </header>

        <main className="admin-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
