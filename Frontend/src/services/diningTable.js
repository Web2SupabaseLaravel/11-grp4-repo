const API_BASE_URL = 'https://your-backend-url.vercel.app/api/dining-table';

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
  await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, {
    method: 'GET',
    credentials: 'include',
  });
}

export async function getAllTables() {
  const res = await fetch(API_BASE_URL, {
    method: 'GET',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch tables');
  return res.json();
}

export async function getTableById(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'GET',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error(`Failed to fetch table with ID: ${id}`);
  return res.json();
}

export async function getTablesByRestaurantId(restaurantId) {
  const res = await fetch(`${API_BASE_URL}/by-restaurant/${restaurantId}`, {
    method: 'GET',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch tables by restaurant');
  return res.json();
}

export async function createTable(data) {
  await initCsrf();
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create table');
  return res.json();
}

export async function updateTable(id, data) {
  await initCsrf();
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'POST',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
    body: JSON.stringify({
      _method: 'PUT',
      ...data,
    }),
  });
  if (!res.ok) throw new Error(`Failed to update table with ID: ${id}`);
  return res.json();
}

export async function deleteTable(id) {
  await initCsrf();
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'POST',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
    body: JSON.stringify({
      _method: 'DELETE',
    }),
  });
  if (res.status === 204) return true;
  if (!res.ok) throw new Error(`Failed to delete table with ID: ${id}`);
  return res.json();
}
const API_BASE_URL = 'https://your-backend-url.vercel.app/api/dining-table';

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
  await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, {
    method: 'GET',
    credentials: 'include',
  });
}

export async function getAllTables() {
  const res = await fetch(API_BASE_URL, {
    method: 'GET',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch tables');
  return res.json();
}

export async function getTableById(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'GET',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error(`Failed to fetch table with ID: ${id}`);
  return res.json();
}

export async function getTablesByRestaurantId(restaurantId) {
  const res = await fetch(`${API_BASE_URL}/by-restaurant/${restaurantId}`, {
    method: 'GET',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch tables by restaurant');
  return res.json();
}

export async function createTable(data) {
  await initCsrf();
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create table');
  return res.json();
}

export async function updateTable(id, data) {
  await initCsrf();
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'POST',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
    body: JSON.stringify({
      _method: 'PUT',
      ...data,
    }),
  });
  if (!res.ok) throw new Error(`Failed to update table with ID: ${id}`);
  return res.json();
}

export async function deleteTable(id) {
  await initCsrf();
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'POST',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
    body: JSON.stringify({
      _method: 'DELETE',
    }),
  });
  if (res.status === 204) return true;
  if (!res.ok) throw new Error(`Failed to delete table with ID: ${id}`);
  return res.json();
}
