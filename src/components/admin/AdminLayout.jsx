import { logout } from "../../apiService";

import { useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  Link,
} from "react-router-dom";

import {
  LayoutDashboard,
  ClipboardCheck,
  RefreshCw,
  Building2,
  LogOut,
  ShieldCheck,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import "./AdminLayout.css";
import { getCurrentUser } from "../../apiService";

const navigation = [
  { label: "Overview", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Nurse Registry", path: "/admin/nurses", icon: ClipboardCheck },
  { label: "Licence Renewals", path: "/admin/renewals", icon: RefreshCw },
  { label: "Hospital HR", path: "/admin/hr-users", icon: Building2 },
  { label: "Supervisors", path: "/admin/supervisors", icon: ShieldCheck, adminOnly: true },
];

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [role, setRole] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    let active = true;
    getCurrentUser(token).then((user) => { if (active) setRole(user.role); }).catch(() => {});
    return () => { active = false; };
  }, [token]);

  const visibleNavigation = navigation.filter((item) => !item.adminOnly || role === "super_admin");

  const location = useLocation();

  const currentPage =
    visibleNavigation.find((item) => item.path === location.pathname)?.label ||
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
          {visibleNavigation.map((item) => {
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
            onClick={() => { const token = localStorage.getItem("token"); logout(token).catch(() => {}).finally(() => localStorage.removeItem("token")); }}
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
