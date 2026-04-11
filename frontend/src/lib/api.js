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

export async function adminFetch(endpoint) {
  const res = await fetch(`${ADMIN_API}/${endpoint}`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Fetch failed');
  return res.json();
}

export async function adminPost(endpoint, data) {
  const res = await fetch(`${ADMIN_API}/${endpoint}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Create failed');
  return res.json();
}

export async function adminPut(endpoint, data) {
  const res = await fetch(`${ADMIN_API}/${endpoint}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Update failed');
  return res.json();
}

export async function adminDelete(endpoint) {
  const res = await fetch(`${ADMIN_API}/${endpoint}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Delete failed');
  return res.json();
}
