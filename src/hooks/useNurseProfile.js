import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNurseProfile } from "../apiService";

export default function useNurseProfile() {
  const [nurse, setNurse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    let active = true;
    if (!token) {
      navigate("/nurse/login", { replace: true });
      return () => { active = false; };
    }
    getNurseProfile(token)
      .then((data) => { if (active) setNurse(data); })
      .catch((err) => {
        if (!active) return;
        setError(err.message);
        if (/credentials|authentication|token/i.test(err.message)) {
          localStorage.removeItem("token");
          navigate("/nurse/login", { replace: true });
        }
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [navigate, token]);

  return { nurse, loading, error, setNurse, token };
}
