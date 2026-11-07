import { useEffect, useState } from "react";
import { getCurrentUser, getHRNurses } from "../apiService";

function displayLicence(value) {
  const map = {
    Licensed: "Active",
    "Expiring soon": "Expiring Soon",
    Pending: "Pending",
    Rejected: "Rejected",
    Suspended: "Suspended",
    Revoked: "Revoked",
    Flagged: "Flagged",
    Expired: "Expired",
  };
  return map[value] || value || "Pending";
}

export default function useHRDirectory() {
  const [nurses, setNurses] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    let active = true;
    Promise.all([getHRNurses(token), getCurrentUser(token)])
      .then(([rows, user]) => {
        if (!active) return;
        setNurses(
          rows.map((row) => ({
            ...row,
            name: row.full_name,
            initials: row.full_name
              .split(/\s+/)
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase(),
            nannmId: row.nanm_id || `REQ-${row.id}`,
            licenceStatus: displayLicence(row.licence_status),
            status: displayLicence(row.licence_status),
            expiry: row.licence_expiry,
            employment:
              row.employment_status === "confirmed"
                ? "Confirmed"
                : row.employment_status === "rejected"
                  ? "Rejected"
                  : "Pending",
          })),
        );
        setEmployers(user.employers || []);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [token]);
  return { nurses, employers, loading, error, setNurses, token };
}
