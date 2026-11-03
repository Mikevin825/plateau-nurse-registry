const API_BASE = (import.meta.env.VITE_API_BASE_URL || "/api/v1").replace(/\/$/, "");

async function request(path, { token, ...options } = {}) {
  const headers = new Headers(options.headers || {});
  if (token) headers.set("Authorization", `Token ${token}`);
  if (!(options.body instanceof FormData) && options.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await response.json() : null;
  if (!response.ok) {
    const detail = payload?.detail || payload?.non_field_errors?.[0] ||
      Object.entries(payload || {}).map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`).join("; ");
    throw new Error(detail || `Request failed (${response.status})`);
  }
  return payload;
}

export const loginNurse = (credentials) => request("/auth/token/", {
  method: "POST", body: JSON.stringify(credentials),
});

export const registerNurse = (values) => {
  const body = values instanceof FormData ? values : new FormData();
  if (!(values instanceof FormData)) {
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) body.append(key, value);
    });
  }
  return request("/register/", { method: "POST", body });
};

export const verifyNursePublic = (nanmId) =>
  request(`/verify/${encodeURIComponent(nanmId)}/`);

export const getCurrentUser = (token) => request("/me/", { token });
export const getNurseById = (_id, token) => request("/nurse/profile/", { token });
export const getNurseProfile = (token) => request("/nurse/profile/", { token });
export const getNurseActivity = (token) => request("/nurse/activity/", { token });
export const getNurseCard = (token) => request("/nurse/card/", { token });
export const getHRNurses = (token) => request("/hr/nurses/", { token });
export const confirmEmployment = (id, token) => request(`/hr/nurses/${id}/confirm/`, { token, method: "POST", body: "{}" });
export const getEmployerOptions = () => request("/hr/employers/");
export const registerHR = (values) => request("/hr/register/", { method: "POST", body: JSON.stringify(values) });
export const getHRReviewQueue = (token) => request("/admin/hr-registrations/", { token });
export const reviewHRRegistration = (id, action, token, reason = "") => request(`/admin/hr-registrations/${id}/`, {
  token, method: "POST", body: JSON.stringify({ action, reason }),
});

export const uploadRenewal = (file, expiry, token) => {
  const body = new FormData();
  body.append("file", file);
  body.append("licence_expiry", expiry);
  return request("/nurse/renew/", { token, method: "POST", body });
};
export const getRenewalQueue = (token) => request("/admin/renewals/", { token });
export const reviewRenewal = (id, action, token, reason = "") => request(`/admin/renewals/${id}/`, {
  token, method: "POST", body: JSON.stringify({ action, reason }),
});
export const getAdminSummary = (token) => request("/admin/summary/", { token });
export const getAdminNurses = (token, filters = {}) => {
  const params = new URLSearchParams(Object.entries(filters).filter(([, value]) => value));
  return request(`/admin/nurses/${params.size ? `?${params}` : ""}`, { token });
};
export const reviewAdminNurse = (id, action, reason, token) => request(`/admin/nurses/${id}/`, {
  token, method: "POST", body: JSON.stringify({ action, reason }),
});
export const updateAdminNurse = (id, values, token) => {
  let body = values;
  if (!(values instanceof FormData)) body = JSON.stringify(values);
  return request(`/admin/nurses/${id}/`, { token, method: "PATCH", body });
};
export const createAdminNurse = (values, token) => request("/admin/nurses/", {
  token, method: "POST", body: values,
});
export const deleteAdminNurse = (id, token) => request(`/admin/nurses/${id}/`, { token, method: "DELETE" });
export const getAdminHRUsers = (token, search = "") => request(`/admin/hr-users/${search ? `?${new URLSearchParams({ search })}` : ""}`, { token });
export const createAdminHRUser = (values, token) => request("/admin/hr-users/", { token, method: "POST", body: JSON.stringify(values) });
export const updateAdminHRUser = (values, token) => request(`/admin/hr-users/${values.id}/`, { token, method: "PATCH", body: JSON.stringify(values) });
export const deleteAdminHRUser = (id, token) => request(`/admin/hr-users/${id}/`, { token, method: "DELETE" });
export const getAdminSupervisors = (token) => request("/admin/supervisors/", { token });
export const createAdminSupervisor = (values, token) => request("/admin/supervisors/", { token, method: "POST", body: JSON.stringify(values) });
export const updateAdminSupervisor = (id, values, token) => request(`/admin/supervisors/${id}/`, { token, method: "PATCH", body: JSON.stringify(values) });
export const deleteAdminSupervisor = (id, token) => request(`/admin/supervisors/${id}/`, { token, method: "DELETE" });

export const uploadFile = async (url, file, token) => {
  const body = new FormData();
  body.append("file", file);
  const response = await fetch(url, { method: "POST", body, headers: token ? { Authorization: `Token ${token}` } : {} });
  if (!response.ok) throw new Error("File upload failed");
  return response.json();
};

export default {
  loginNurse, registerNurse, verifyNursePublic, getCurrentUser, getNurseById,
  getNurseProfile, getNurseActivity, getNurseCard, getHRNurses, confirmEmployment, getEmployerOptions, registerHR,
  getHRReviewQueue, reviewHRRegistration, uploadRenewal, getRenewalQueue, reviewRenewal, getAdminSummary,
  getAdminNurses, reviewAdminNurse, updateAdminNurse, createAdminNurse, deleteAdminNurse,
  getAdminHRUsers, createAdminHRUser, updateAdminHRUser, deleteAdminHRUser,
  getAdminSupervisors, createAdminSupervisor, updateAdminSupervisor, deleteAdminSupervisor, uploadFile,
};
