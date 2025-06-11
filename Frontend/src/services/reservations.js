const API_BASE_URL = 'http://localhost:8000/api/reservations';

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

export async function getAllReservations() {
  const res = await fetch(API_BASE_URL, {
    method: 'GET',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch reservations');
  return res.json();
}

export async function getReservationById(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'GET',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error(`Failed to fetch reservation with ID: ${id}`);
  return res.json();
}

export async function createReservation(data) {
  await initCsrf();
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create reservation');
  return res.json();
}

export async function updateReservation(id, data) {
  await initCsrf();
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'POST', // using _method override
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
    body: JSON.stringify({
      _method: 'PUT',
      ...data,
    }),
  });
  if (!res.ok) throw new Error(`Failed to update reservation with ID: ${id}`);
  return res.json();
}

export async function deleteReservation(id) {
  await initCsrf();
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'POST', // using _method override
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
    body: JSON.stringify({
      _method: 'DELETE',
    }),
  });
  if (res.status === 204) return true;
  if (!res.ok) throw new Error(`Failed to delete reservation with ID: ${id}`);
  return res.json();
}
