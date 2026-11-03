import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../apiService";

export default function RoleGuard({ roles, children, redirectTo = "/nurse/login" }) {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    let active = true;
    if (!token) return undefined;
    getCurrentUser(token)
      .then((result) => { if (active) setUser(result); })
      .catch(() => { localStorage.removeItem("token"); if (active) setUser(null); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [token]);

  if (!token) return <Navigate to={redirectTo} replace state={{ from: location }} />;
  if (loading) return <div role="status" className="route-loading">Loading your workspace…</div>;
  if (!user || !roles.includes(user.role)) {
    const loginPath = user?.role === "hr" ? "/hospital/login" : "/nurse/login";
    return <Navigate to={loginPath} replace />;
  }
  return children;
}
