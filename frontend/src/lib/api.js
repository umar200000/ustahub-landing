const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchAll() {
  const res = await fetch(`${API_BASE}/all`);
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export async function fetchSection(section) {
  const res = await fetch(`${API_BASE}/${section}`);
  if (!res.ok) throw new Error(`Failed to fetch ${section}`);
  return res.json();
}

// Admin API
const ADMIN_API = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/admin`;

export function getToken() {
  if (typeof window !== 'undefined') return localStorage.getItem('admin_token');
  return null;
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
}

export async function adminLogin(username, password) {
  const res = await fetch(`${ADMIN_API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

async function handleResponse(res, fallback) {
  if (!res.ok) {
    let message = fallback;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {}
    if (res.status === 401) message = 'Sessiya tugagan. Qayta login qiling.';
    throw new Error(`${message} (${res.status})`);
  }
  return res.json();
}

export async function adminFetch(endpoint) {
  const res = await fetch(`${ADMIN_API}/${endpoint}`, { headers: authHeaders() });
  return handleResponse(res, 'Fetch failed');
}

export async function adminPost(endpoint, data) {
  const res = await fetch(`${ADMIN_API}/${endpoint}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res, 'Create failed');
}

export async function adminPut(endpoint, data) {
  const res = await fetch(`${ADMIN_API}/${endpoint}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res, 'Update failed');
}

export async function adminDelete(endpoint) {
  const res = await fetch(`${ADMIN_API}/${endpoint}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse(res, 'Delete failed');
}

// ─── UstaHub Backend (superadmin) API ────────────────────────────────────────

const USTAHUB_API = process.env.NEXT_PUBLIC_USTAHUB_API_URL || 'http://localhost:8000/api/v1';

export function getUstahubToken() {
  if (typeof window !== 'undefined') return localStorage.getItem('ustahub_admin_token');
  return null;
}

export function setUstahubToken(token) {
  if (typeof window !== 'undefined') localStorage.setItem('ustahub_admin_token', token);
}

export function clearUstahubToken() {
  if (typeof window !== 'undefined') localStorage.removeItem('ustahub_admin_token');
}

function ustahubHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getUstahubToken()}`,
  };
}

export async function ustahubLogin(login, password) {
  const res = await fetch(`${USTAHUB_API}/superadmin/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  const data = await res.json();
  if (data?.data?.access_token) setUstahubToken(data.data.access_token);
  return data;
}

export async function ustahubFetch(endpoint) {
  const res = await fetch(`${USTAHUB_API}/${endpoint}`, { headers: ustahubHeaders() });
  if (res.status === 401) { clearUstahubToken(); throw new Error('SESSION_EXPIRED'); }
  if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
  return res.json();
}

export async function ustahubPatch(endpoint, data) {
  const res = await fetch(`${USTAHUB_API}/${endpoint}`, {
    method: 'PATCH',
    headers: ustahubHeaders(),
    body: JSON.stringify(data),
  });
  if (res.status === 401) { clearUstahubToken(); throw new Error('SESSION_EXPIRED'); }
  if (!res.ok) throw new Error(`Update failed (${res.status})`);
  return res.json();
}
