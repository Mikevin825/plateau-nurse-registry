// Offline demonstration API.
//
// The deployed front end has no Django behind it, so when the real API cannot
// be reached every request is answered from the generated fixture data in
// demoData.js. This keeps the same response shapes as the real API so the
// components do not need to know the difference.
//
// Mutations apply to an in-memory copy and are lost on reload. Nothing here
// talks to the network.

import { DEMO_DATA } from "./demoData";

const WARNING_DAYS = 180;

// --- in-memory state ---------------------------------------------------------

const state = {
  nurses: DEMO_DATA.nurses.map((nurse) => ({
    ...nurse,
    documents: nurse.documents.map((document) => ({ ...document })),
  })),
  accounts: DEMO_DATA.accounts.map((account) => ({ ...account })),
  hrRegistrations: [],
  session: null,
  nextId: 1000,
};

// --- helpers -----------------------------------------------------------------

function addDays(offset) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

function employerName(id) {
  const employer = DEMO_DATA.employers.find((row) => row.id === id);
  return employer ? employer.name : "";
}

function publicLicenceStatus(nurse) {
  if (nurse.record_status === "flagged") return "Flagged";
  if (nurse.record_status === "suspended") return "Suspended";
  if (nurse.record_status === "revoked") return "Revoked";
  if (nurse.record_status === "pending") return "Pending";
  if (nurse.record_status === "rejected") return "Rejected";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(`${addDays(nurse.licence_expiry_offset_days)}T00:00:00`);
  if (expiry < today) return "Expired";
  const days = Math.round((expiry - today) / 86400000);
  if (days <= WARNING_DAYS) return "Expiring soon";
  return "Licensed";
}

function findNurse(idOrNanm) {
  const key = String(idOrNanm);
  return state.nurses.find(
    (nurse) => String(nurse.id) === key || nurse.nanm_id === key,
  );
}

function profilePayload(nurse) {
  return {
    id: nurse.id,
    nanm_id: nurse.nanm_id,
    full_name: nurse.full_name,
    email: nurse.email,
    phone: nurse.phone,
    photo: "",
    licence_number: nurse.licence_number,
    licence_expiry: addDays(nurse.licence_expiry_offset_days),
    licence_status: publicLicenceStatus(nurse),
    specialty: nurse.specialty,
    cadre: nurse.cadre,
    employer: employerName(nurse.employer_id),
    ward: nurse.ward,
    record_status: nurse.record_status,
    employer_confirmed_at: nurse.employer_confirmed_at
      ? new Date().toISOString()
      : null,
    employment_confirmed: Boolean(nurse.employer_confirmed_at),
    employment_status: nurse.employment_status,
    employment_decided_at: nurse.employment_decided_at,
    created_at: nurse.created_at,
  };
}

function publicPayload(nurse) {
  return {
    nanm_id: nurse.nanm_id,
    full_name: nurse.full_name,
    photo_url: "",
    licence_status: publicLicenceStatus(nurse),
    licence_expiry: addDays(nurse.licence_expiry_offset_days),
    employer: employerName(nurse.employer_id),
    record_status: nurse.record_status,
  };
}

function adminPayload(nurse) {
  return {
    id: nurse.id,
    nanm_id: nurse.nanm_id,
    full_name: nurse.full_name,
    email: nurse.email,
    phone: nurse.phone,
    nin_last4: nurse.nin_last4,
    user_is_active: nurse.has_account,
    photo_url: "",
    licence_number: nurse.licence_number,
    licence_expiry: addDays(nurse.licence_expiry_offset_days),
    specialty: nurse.specialty,
    cadre: nurse.cadre,
    employer_id: nurse.employer_id,
    employer: employerName(nurse.employer_id),
    ward: nurse.ward,
    record_status: nurse.record_status,
    created_at: nurse.created_at,
    updated_at: nurse.updated_at,
    documents: nurse.documents.map((document) => ({
      id: document.id,
      document_type: document.document_type,
      decision: document.decision,
      uploaded_at: document.uploaded_at,
      content_path: "",
    })),
  };
}

function summaryPayload() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const approved = state.nurses.filter(
    (nurse) => nurse.record_status === "approved",
  );
  const expiryOf = (nurse) =>
    new Date(`${addDays(nurse.licence_expiry_offset_days)}T00:00:00`);
  const warningDate = new Date(today);
  warningDate.setDate(warningDate.getDate() + WARNING_DAYS);

  return {
    total_nurses: state.nurses.length,
    pending_nurses: state.nurses.filter(
      (nurse) => nurse.record_status === "pending",
    ).length,
    active_licences: approved.filter((nurse) => expiryOf(nurse) > warningDate)
      .length,
    expiring_licences: approved.filter((nurse) => expiryOf(nurse) <= warningDate)
      .length,
    expired_licences: approved.filter((nurse) => expiryOf(nurse) < today).length,
    restricted_nurses: state.nurses.filter((nurse) =>
      ["suspended", "revoked"].includes(nurse.record_status),
    ).length,
    pending_hr_registrations: state.hrRegistrations.filter(
      (row) => row.status === "pending",
    ).length,
    pending_renewals: state.nurses.flatMap((nurse) => nurse.documents).filter(
      (document) =>
        document.document_type === "renewal" && document.decision === "pending",
    ).length,
    recent_nurses: [...state.nurses]
      .slice(-5)
      .reverse()
      .map((nurse) => ({
        id: nurse.id,
        full_name: nurse.full_name,
        nanm_id: nurse.nanm_id,
        employer__name: employerName(nurse.employer_id),
        record_status: nurse.record_status,
        created_at: nurse.created_at,
      })),
  };
}

function fail(status, payload) {
  const error = new Error(
    payload?.detail ||
      (payload ? JSON.stringify(payload) : `Request failed (${status})`),
  );
  error.status = status;
  error.payload = payload;
  throw error;
}

function parseBody(body) {
  if (body === undefined || body === null) return {};
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
}

function requireSession() {
  if (!state.session) fail(403, { detail: "Permission denied." });
  return state.accounts.find((account) => account.username === state.session);
}

const ALLOWED_TRANSITIONS = {
  pending: ["approved", "rejected", "flagged"],
  approved: ["suspended", "revoked"],
  suspended: ["approved", "revoked"],
  flagged: ["approved", "rejected", "revoked"],
  rejected: ["pending"],
  revoked: [],
};

function nextNanmId() {
  const issued = state.nurses
    .map((nurse) => nurse.nanm_id)
    .filter(Boolean)
    .map((id) => Number(id.split("-")[2]));
  const highest = issued.length ? Math.max(...issued) : 0;
  return `PLT-NUR-${String(highest + 1).padStart(6, "0")}`;
}

// --- router ------------------------------------------------------------------

function match(path, pattern) {
  const parts = path.split("/").filter(Boolean);
  const wanted = pattern.split("/").filter(Boolean);
  if (parts.length !== wanted.length) return null;
  const params = {};
  for (let index = 0; index < parts.length; index += 1) {
    if (wanted[index].startsWith("<") && wanted[index].endsWith(">")) {
      params[wanted[index].slice(1, -1)] = parts[index];
    } else if (wanted[index] !== parts[index]) {
      return null;
    }
  }
  return params;
}

export async function demoFetch(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const body = parseBody(options.body);

  // The token identifies who is making this request, so let it drive the
  // session. A single global session breaks as soon as two tabs are signed in
  // as different demo users: they share localStorage but not module state.
  const token = typeof options.token === "string" ? options.token : "";
  const tokenUser = token.replace(/^demo-/, "");
  if (tokenUser && state.accounts.some((account) => account.username === tokenUser)) {
    state.session = tokenUser;
  }
  const query = path.includes("?")
    ? new URLSearchParams(path.slice(path.indexOf("?") + 1))
    : new URLSearchParams();
  const cleanPath = path.split("?")[0];

  // --- public ---
  let params = match(cleanPath, "verify/<nanm_id>");
  if (params && method === "GET") {
    const nurse = state.nurses.find(
      (row) => row.nanm_id === params.nanm_id,
    );
    if (!nurse) fail(404, { detail: "Not registered" });
    return publicPayload(nurse);
  }

  params = match(cleanPath, "hr/employers");
  if (params && method === "GET") {
    return DEMO_DATA.employers
      .filter((employer) => employer.approved)
      .map(({ id, name, type, lga }) => ({ id, name, type, lga }));
  }

  params = match(cleanPath, "verify/<nanm_id>/photo");
  if (params) fail(404, "Registry photo not found.");

  // --- authentication ---
  params = match(cleanPath, "auth/token");
  if (params && method === "POST") {
    const identifier = String(
      body.identifier || body.email || body.username || "",
    ).trim();
    const password = String(body.password || "");
    const account = state.accounts.find(
      (row) =>
        row.username.toLowerCase() === identifier.toLowerCase() ||
        row.email.toLowerCase() === identifier.toLowerCase(),
    );
    if (!account || account.password !== password) {
      fail(400, { detail: "Invalid email or password." });
    }
    state.session = account.username;
    return { token: `demo-${account.username}`, access: `demo-${account.username}` };
  }

  params = match(cleanPath, "auth/logout");
  if (params) {
    state.session = null;
    return null;
  }

  params = match(cleanPath, "auth/password");
  if (params) return { detail: "Password updated." };

  params = match(cleanPath, "auth/password-reset");
  if (params) {
    return {
      detail:
        "If an active account uses that email, a password reset link has been sent.",
    };
  }

  params = match(cleanPath, "auth/password-reset/<uidb64>/<token>");
  if (params) return { detail: "Password updated. Sign in with your new password." };

  params = match(cleanPath, "register");
  if (params && method === "POST") {
    const employer = DEMO_DATA.employers.find(
      (row) => row.id === Number(body.employer),
    );
    const nurse = {
      id: state.nextId++,
      nanm_id: null,
      full_name: String(body.full_name || "").trim(),
      email: String(body.email || "").trim(),
      phone: String(body.phone || "").trim(),
      licence_number: String(body.licence_number || "").trim(),
      licence_expiry_offset_days: Math.max(
        0,
        Math.round(
          (new Date(body.licence_expiry) - new Date()) / 86400000,
        ),
      ),
      specialty: String(body.specialty || ""),
      cadre: String(body.cadre || ""),
      employer_id: employer ? employer.id : DEMO_DATA.employers[0].id,
      ward: String(body.ward || ""),
      record_status: "pending",
      employment_status: "pending",
      employer_confirmed_at: false,
      employment_decided_at: null,
      nin_last4: String(body.nin || "").slice(-4),
      has_account: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      documents: [],
    };
    state.nurses.push(nurse);
    const account = {
      username: nurse.email,
      email: nurse.email,
      password: body.password,
      role: "nurse",
      employer_id: nurse.employer_id,
      employer_name: employerName(nurse.employer_id),
      nurse_id: nurse.id,
    };
    state.accounts.push(account);
    state.session = account.username;
    return {
      token: `demo-${account.username}`,
      access: `demo-${account.username}`,
      nurse: profilePayload(nurse),
    };
  }

  params = match(cleanPath, "hr/register");
  if (params && method === "POST") {
    const registration = {
      id: state.nextId++,
      email: body.email,
      hospital_name: body.hospital_name,
      employer_type: body.employer_type,
      lga: body.lga,
      contact_email: body.contact_email || "",
      created_at: new Date().toISOString(),
      status: "pending",
    };
    state.hrRegistrations.push(registration);
    return { id: registration.id, status: "pending" };
  }

  // --- session-scoped ---
  params = match(cleanPath, "me");
  if (params && method === "GET") {
    const account = requireSession();
    const nurse = account.nurse_id
      ? state.nurses.find((row) => row.id === account.nurse_id)
      : null;
    return {
      id: account.username,
      email: account.email,
      first_name: "",
      last_name: "",
      role: account.role,
      nurse: nurse ? profilePayload(nurse) : null,
      employers:
        account.role === "hr"
          ? DEMO_DATA.employers
              .filter((employer) => employer.id === account.employer_id)
              .map((employer) => ({ ...employer }))
          : [],
    };
  }

  params = match(cleanPath, "nurse/profile");
  if (params && method === "GET") {
    const account = requireSession();
    const nurse = state.nurses.find((row) => row.id === account.nurse_id);
    if (!nurse) fail(403, { detail: "This account has no nurse profile." });
    return profilePayload(nurse);
  }

  params = match(cleanPath, "nurse/card");
  if (params && method === "GET") {
    const account = requireSession();
    const nurse = state.nurses.find((row) => row.id === account.nurse_id);
    if (!nurse) fail(403, { detail: "This account has no nurse profile." });
    const available =
      nurse.record_status === "approved" && Boolean(nurse.nanm_id);
    return {
      available,
      record_status: nurse.record_status,
      // No QR or signed link can be produced without the backend.
      signed_url: "",
      qr_url: "",
      nurse: profilePayload(nurse),
    };
  }

  params = match(cleanPath, "nurse/activity");
  if (params && method === "GET") {
    const account = requireSession();
    const nurse = state.nurses.find((row) => row.id === account.nurse_id);
    if (!nurse) fail(403, { detail: "This account has no nurse profile." });
    return {
      documents: nurse.documents.map((document) => ({
        id: document.id,
        document_type: document.document_type,
        uploaded_at: document.uploaded_at,
        decision: document.decision,
        reason: "",
        proposed_expiry: document.proposed_expiry,
      })),
      notifications: [],
    };
  }

  params = match(cleanPath, "nurse/renew");
  if (params && method === "POST") {
    const account = requireSession();
    const nurse = state.nurses.find((row) => row.id === account.nurse_id);
    if (!nurse) fail(403, { detail: "This account has no nurse profile." });
    const document = {
      id: state.nextId++,
      document_type: "renewal",
      decision: "pending",
      uploaded_at: new Date().toISOString(),
      proposed_expiry: body.licence_expiry,
    };
    nurse.documents.push(document);
    return { id: document.id, decision: "pending", document_type: "renewal" };
  }

  // --- HR ---
  params = match(cleanPath, "hr/nurses");
  if (params && method === "GET") {
    const account = requireSession();
    if (account.role !== "hr" && !["super_admin", "supervisor", "reviewer"].includes(account.role)) {
      fail(403, { detail: "Permission denied." });
    }
    if (account.role === "hr") {
      return state.nurses
        .filter((nurse) => nurse.employer_id === account.employer_id)
        .map(profilePayload);
    }
    return state.nurses.map(profilePayload);
  }

  params = match(cleanPath, "hr/nurses/<pk>/confirm");
  if (params && method === "POST") {
    const account = requireSession();
    if (account.role !== "hr") fail(403, { detail: "Permission denied." });
    const nurse = findNurse(params.pk);
    if (!nurse || nurse.employer_id !== account.employer_id) {
      fail(404, "Nurse not found for your employer.");
    }
    if (nurse.employment_status !== "pending") {
      fail(400, "This employment record has already been decided.");
    }
    nurse.employment_status = "confirmed";
    nurse.employer_confirmed_at = true;
    nurse.employment_decided_at = new Date().toISOString();
    return profilePayload(nurse);
  }

  params = match(cleanPath, "hr/nurses/<pk>/reject");
  if (params && method === "POST") {
    const account = requireSession();
    if (account.role !== "hr") fail(403, { detail: "Permission denied." });
    const nurse = findNurse(params.pk);
    if (!nurse || nurse.employer_id !== account.employer_id) {
      fail(404, "Nurse not found for your employer.");
    }
    if (nurse.employment_status !== "pending") {
      fail(400, "This employment record has already been decided.");
    }
    nurse.employment_status = "rejected";
    nurse.employment_decided_at = new Date().toISOString();
    return profilePayload(nurse);
  }

  // --- reviewer / admin ---
  params = match(cleanPath, "admin/summary");
  if (params && method === "GET") {
    requireSession();
    return summaryPayload();
  }

  params = match(cleanPath, "admin/nurses");
  if (params && method === "GET") {
    requireSession();
    const search = (query.get("search") || "").toLowerCase();
    const status = query.get("status") || "";
    const employer = query.get("employer") || "";
    return state.nurses
      .filter((nurse) => {
        if (status && nurse.record_status !== status) return false;
        if (employer && String(nurse.employer_id) !== employer) return false;
        if (!search) return true;
        return [
          nurse.full_name,
          nurse.email,
          nurse.phone,
          nurse.nanm_id || "",
          nurse.licence_number,
          employerName(nurse.employer_id),
        ]
          .join(" ")
          .toLowerCase()
          .includes(search);
      })
      .map(adminPayload);
  }

  params = match(cleanPath, "admin/nurses/<pk>");
  if (params) {
    const account = requireSession();
    const nurse = findNurse(params.pk);
    if (!nurse) fail(404, "Nurse record not found.");

    if (method === "GET") return adminPayload(nurse);

    if (method === "DELETE") {
      state.nurses = state.nurses.filter((row) => row.id !== nurse.id);
      return null;
    }

    if (method === "PATCH") {
      if (body.employer) {
        nurse.employer_id = Number(body.employer);
      }
      for (const field of [
        "full_name",
        "email",
        "phone",
        "licence_number",
        "specialty",
        "cadre",
        "ward",
      ]) {
        if (field in body) nurse[field] = body[field];
      }
      if (body.licence_expiry) {
        nurse.licence_expiry_offset_days = Math.round(
          (new Date(body.licence_expiry) - new Date()) / 86400000,
        );
      }
      nurse.updated_at = new Date().toISOString();
      return adminPayload(nurse);
    }

    if (method === "POST") {
      const action = body.action;
      const transitions = ALLOWED_TRANSITIONS[nurse.record_status] || [];
      const targets = {
        approve: "approved",
        reject: "rejected",
        flag: "flagged",
        suspend: "suspended",
        revoke: "revoked",
        reinstate: "approved",
        reopen: "pending",
      };
      const target = targets[action];
      if (!target) fail(400, { action: "Choose a valid review action." });
      if (!transitions.includes(target)) {
        fail(400, `Invalid transition from ${nurse.record_status} to ${target}.`);
      }
      if (action === "approved" || (action !== "approve" && !body.reason)) {
        fail(400, "A reason is required for this transition.");
      }
      if (target === "approved" && !nurse.nanm_id) {
        nurse.nanm_id = nextNanmId();
      }
      nurse.record_status = target;
      nurse.updated_at = new Date().toISOString();
      return adminPayload(nurse);
    }
  }

  params = match(cleanPath, "admin/renewals");
  if (params && method === "GET") {
    requireSession();
    return state.nurses
      .flatMap((nurse) => nurse.documents)
      .filter(
        (document) =>
          document.document_type === "renewal" && document.decision === "pending",
      )
      .map((document) => {
        const nurse = state.nurses.find((row) =>
          row.documents.some((entry) => entry.id === document.id),
        );
        return {
          id: document.id,
          nurse_id: nurse.id,
          name: nurse.full_name,
          nanm_id: nurse.nanm_id,
          employer: employerName(nurse.employer_id),
          licence_number: nurse.licence_number,
          proposed_expiry: document.proposed_expiry,
          uploaded_at: document.uploaded_at,
        };
      });
  }

  params = match(cleanPath, "admin/renewals/<pk>");
  if (params && method === "POST") {
    requireSession();
    const document = state.nurses
      .flatMap((nurse) => nurse.documents)
      .find((entry) => String(entry.id) === params.pk);
    if (!document) fail(404, "Pending renewal not found.");
    const action = body.action;
    if (action === "approve") {
      document.decision = "approved";
    } else if (action === "reject") {
      document.decision = "rejected";
    } else {
      fail(400, { action: "Choose approve or reject." });
    }
    if (action === "reject" && !body.reason) {
      fail(400, { reason: "Provide a reason for rejecting this renewal." });
    }
    return { id: document.id, decision: document.decision, reason: body.reason || "" };
  }

  params = match(cleanPath, "admin/hr-registrations");
  if (params && method === "GET") {
    requireSession();
    return state.hrRegistrations
      .filter((row) => row.status === "pending")
      .map((row) => ({
        id: row.id,
        email: row.email,
        hospital_name: row.hospital_name,
        employer_type: row.employer_type,
        lga: row.lga,
        contact_email: row.contact_email,
        created_at: row.created_at,
      }));
  }

  params = match(cleanPath, "admin/hr-registrations/<pk>");
  if (params && method === "POST") {
    requireSession();
    const registration = state.hrRegistrations.find(
      (row) => String(row.id) === params.pk,
    );
    if (!registration) fail(404, "Pending registration not found.");
    const action = body.action;
    if (action === "approve") {
      registration.status = "approved";
      if (!DEMO_DATA.employers.some((row) => row.name === registration.hospital_name)) {
        DEMO_DATA.employers.push({
          id: state.nextId++,
          name: registration.hospital_name,
          type: registration.employer_type,
          lga: registration.lga,
          contact_email: registration.contact_email,
          approved: true,
          hr_usernames: [],
        });
      }
    } else if (action === "reject") {
      registration.status = "rejected";
    } else {
      fail(400, { action: "Choose approve or reject." });
    }
    return { id: registration.id, status: registration.status };
  }

  params = match(cleanPath, "admin/hr-users");
  if (params && method === "GET") {
    const account = requireSession();
    const rows = state.accounts.filter((row) => row.role === "hr");
    const search = (query.get("search") || "").toLowerCase();
    return rows
      .filter((row) => {
        if (!search) return true;
        return [row.email, row.employer_name, row.username]
          .join(" ")
          .toLowerCase()
          .includes(search);
      })
      .map((row) => ({
        id: row.username,
        email: row.email,
        first_name: "",
        last_name: "",
        is_active: true,
        employers: DEMO_DATA.employers
          .filter((employer) => employer.id === row.employer_id)
          .map((employer) => ({ ...employer })),
      }));
  }

  params = match(cleanPath, "admin/hr-users") ;
  if (params && method === "POST") {
    requireSession();
    const account = {
      username: body.email,
      email: body.email,
      password: body.password,
      role: "hr",
      employer_id: body.employer?.id || DEMO_DATA.employers[0].id,
      employer_name: body.employer?.name || DEMO_DATA.employers[0].name,
    };
    state.accounts.push(account);
    return {
      id: account.username,
      email: account.email,
      first_name: body.first_name || "",
      last_name: body.last_name || "",
      is_active: true,
      employers: DEMO_DATA.employers
        .filter((employer) => employer.id === account.employer_id)
        .map((employer) => ({ ...employer })),
    };
  }

  params = match(cleanPath, "admin/hr-users/<pk>");
  if (params) {
    const account = requireSession();
    const row = state.accounts.find(
      (entry) => entry.username === params.pk,
    );
    if (!row) fail(404, "Hospital HR account not found.");
    if (method === "DELETE") {
      state.accounts = state.accounts.filter((entry) => entry.username !== row.username);
      return null;
    }
    if (method === "PATCH") {
      if (body.email) row.email = body.email;
      if ("is_active" in body) row.is_active = Boolean(body.is_active);
      return {
        id: row.username,
        email: row.email,
        first_name: "",
        last_name: "",
        is_active: true,
        employers: DEMO_DATA.employers
          .filter((employer) => employer.id === row.employer_id)
          .map((employer) => ({ ...employer })),
      };
    }
  }

  params = match(cleanPath, "admin/supervisors");
  if (params && method === "GET") {
    requireSession();
    return state.accounts
      .filter((row) => row.role === "supervisor")
      .map((row) => ({
        id: row.username,
        email: row.email,
        first_name: "",
        last_name: "",
        is_active: true,
      }));
  }

  params = match(cleanPath, "admin/supervisors");
  if (params && method === "POST") {
    requireSession();
    const account = {
      username: body.email,
      email: body.email,
      password: body.password,
      role: "supervisor",
    };
    state.accounts.push(account);
    return {
      id: account.username,
      email: account.email,
      first_name: body.first_name || "",
      last_name: body.last_name || "",
      is_active: true,
    };
  }

  params = match(cleanPath, "admin/supervisors/<pk>");
  if (params) {
    const account = requireSession();
    const row = state.accounts.find((entry) => entry.username === params.pk);
    if (!row) fail(404, "Supervisor account not found.");
    if (method === "DELETE") {
      state.accounts = state.accounts.filter((entry) => entry.username !== row.username);
      return null;
    }
    if (method === "PATCH" && body.email) row.email = body.email;
    return {
      id: row.username,
      email: row.email,
      first_name: "",
      last_name: "",
      is_active: true,
    };
  }

  params = match(cleanPath, "admin/documents/<pk>/content");
  if (params) fail(404, "Document not found.");

  fail(404, { detail: `No demo route for ${method} ${cleanPath}` });
}
