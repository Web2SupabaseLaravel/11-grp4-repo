const API_BASE_URL = 'https://resto-seven-zeta.vercel.app';

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

export const fetchReports = async () => {
  await initCsrf();
  const response = await fetch(`${API_BASE_URL}/report`, {
    method: 'GET',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const createReport = async (reportData) => {
  await initCsrf();
  const response = await fetch(`${API_BASE_URL}/report`, {
    method: 'POST',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
    body: JSON.stringify(reportData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'خطأ في إنشاء التقرير');
  }

  return response.json();
};

export const deleteReport = async (id) => {
  await initCsrf();
  const response = await fetch(`${API_BASE_URL}/report/${id}`, {
    method: 'DELETE',
    headers: withCsrf({ ...defaultHeaders }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('فشل في حذف التقرير');
  }

  return await response.json();
};
