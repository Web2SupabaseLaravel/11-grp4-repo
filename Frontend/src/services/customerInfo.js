
const API_BASE_URL = 'http://localhost:8000/api/customers'; // غيّره حسب بيئة عملك

export async function getAllCustomers() {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch customers');
  return res.json();
}

export async function getCustomerById(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch customer with ID: ${id}`);
  return res.json();
}

export async function createCustomer(data) {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create customer');
  return res.json();
}

export async function updateCustomer(id, data) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`Failed to update customer with ID: ${id}`);
  return res.json();
}

export async function deleteCustomer(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error(`Failed to delete customer with ID: ${id}`);
  return res.json();
}
