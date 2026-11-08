import { useEffect, useState } from "react";
import { FlaskConical } from "lucide-react";
import { isDemoMode } from "../apiService";
import "./DemoModeBanner.css";

// Shown only when the app has fallen back to the bundled demonstration data
// because no Django API could be reached (for example on the Vercel build).
export default function DemoModeBanner() {
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    let active = true;
    isDemoMode().then((value) => {
      if (active) setDemo(value);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!demo) return null;

  return (
    <div className="demo-banner" role="status">
      <FlaskConical size={15} />
      <span>
        <strong>Offline demonstration mode.</strong> Sample data only — this build
        is not connected to a live registry, and changes are not saved.
      </span>
    </div>
  );
}
