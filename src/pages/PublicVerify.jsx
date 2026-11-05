import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ArrowLeft,
  Search,
  LockKeyhole,
  UserRound,
  BadgeCheck,
} from "lucide-react";
import "./PublicVerify.css";
import { verifyNursePublic, resolveMediaUrl } from "../apiService";

const Icon = ({ children, size = 20 }) => <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{children}</svg>;

export default function PublicVerify() {
  const [registryId, setRegistryId] = useState("");
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef(null);
  const submitRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (result && !dialog.open) dialog.showModal();
  }, [result]);

  function closeResult() {
    if (dialogRef.current?.open) dialogRef.current.close();
    setResult(null);
    requestAnimationFrame(() => submitRef.current?.focus());
  }

            <p>
              Enter the nurse's official NANNM Registry ID to begin
              verification.
            </p>
          </div>

          <form className="verify-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="registry-id">NANNM Registry ID</label>

              <div className="input-wrapper">
                <BadgeCheck size={18} />

                <input
                  type="text"
                  id="registry-id"
                  placeholder="e.g. PSNR-2026-00001"
                  value={registryId}
                  onChange={(event) => setRegistryId(event.target.value)}
                  required
                />
              </div>

              <span className="field-hint">
                Enter the Registry ID printed on the nurse's digital
                identification card.
              </span>
            </div>

            <button type="submit" className="verify-submit" disabled={loading}>
              <Search size={18} />
              {loading ? " Verifying..." : "Verify nurse"}
            </button>
          </form>

          {/* Information */}
          <div className="verify-privacy">
            <LockKeyhole size={17} />

            <p>
              Public verification displays limited professional information.
              Personal identification numbers and private documents are never
              publicly displayed.
            </p>
          </div>
        </div>

        {/* Verification Result */}
        {result || errorMessage ? (
          <div className="verify-result-placeholder" role="status">
            <div className="placeholder-icon">
              <LockKeyhole size={23} />
            </div>

            <h3>{result ? "Verification results" : "Nurse not found"}</h3>
            {result ? (
              <div className="verify-result-details">
                <p>NANNM ID: <strong>{result.nanm_id}</strong></p>
                <p>Name: <strong>{result.full_name}</strong></p>
                <p>Licence status: <strong>{result.licence_status}</strong></p>
                <p>Employer: <strong>{result.employer || "Not disclosed"}</strong></p>
                {result.photo_url && <img src={resolveMediaUrl(result.photo_url)} alt={`${result.full_name} registry photo`} />}
              </div>
            ) : <p role="alert">{errorMessage}</p>}
          </div>
        ) : (
          <div className="verify-result-placeholder">
            <div className="placeholder-icon">
              <UserRound size={23} />
            </div>

            <h3>Verification results will appear here</h3>

            <p>
              Enter a valid NANNM Registry ID to view the nurse's public
              registration information.
            </p>
          </div>
        )}

      </section>

      {/* Footer */}
      <footer className="auth-footer">
        <p>
          © {new Date().getFullYear()} Plateau State Nurse Registry. All rights
          reserved.
        </p>
      </footer>
    </main>
  )
}
