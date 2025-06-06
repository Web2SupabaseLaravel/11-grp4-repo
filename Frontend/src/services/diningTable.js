const API_BASE_URL = 'http://localhost:8000/api/dining-table';

export async function getAllTables() {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error('Failed to fetch tables');
  return response.json();
}

export async function getTableById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch table with ID: ${id}`);
  return response.json();
}

export async function getTablesByRestaurantId(restaurantId) {
  const response = await fetch(`http://localhost:8000/api/dining-table/by-restaurant/${restaurantId}`);
  if (!response.ok) throw new Error('Failed to fetch tables by restaurant');
  return response.json();
}


export async function createTable(data) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Failed to create table');
  return response.json();
}

export async function updateTable(id, data) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error(`Failed to update table with ID: ${id}`);
  return response.json();
}

export async function deleteTable(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json'
    }
  });
  if (!response.ok) throw new Error(`Failed to delete table with ID: ${id}`);
  return response.json();
}
