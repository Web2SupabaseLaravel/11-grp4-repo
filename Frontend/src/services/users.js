const API_BASE_URL = 'http://localhost:8000/api';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};
    
function withCsrf(headers = {}) {
  const csrfToken = getCookie('XSRF-TOKEN');
  if (csrfToken) {
    headers['X-XSRF-TOKEN'] = decodeURIComponent(csrfToken);
  }
  return headers;
}

export async function initCsrf() {
  await fetch('http://localhost:8000/sanctum/csrf-cookie', {
    method: 'GET',
    credentials: 'include',
  });
}

export async function registerUser(data) {
  await initCsrf();
  const res = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
}

export async function loginUser(credentialsData) {
  await initCsrf();
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
    body: JSON.stringify(credentialsData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
}

export async function googleLogin(tokenData) {
  await initCsrf();
  const res = await fetch(`${API_BASE_URL}/google-login`, {
    method: 'POST',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
    body: JSON.stringify(tokenData),
  });
  if (!res.ok) throw new Error('Google login failed');
  return res.json();
}

export async function getAllUsers() {
  const res = await fetch(`${API_BASE_URL}/users`, {
    method: 'GET',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function updateUser(userId, updatedData) {
  const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'POST',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
    body: JSON.stringify({
      _method: 'PUT',
      ...updatedData,
    }),
  });
  if (!res.ok) throw new Error(`Failed to update user with ID ${userId}`);
  return res.json();
}

export async function deleteUser(userId) {
  await initCsrf();
  const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'POST',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
    body: JSON.stringify({
      _method: 'DELETE',
    }),
  });

  if (res.status === 204) return { success: true }; 

  if (!res.ok) throw new Error(`Failed to delete user with ID ${userId}`);

  return res.json();

  
}

export async function getCurrentUser() {
  const res = await fetch(`${API_BASE_URL}/me`, {
    method: 'GET',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch current user');
  return res.json();
}
