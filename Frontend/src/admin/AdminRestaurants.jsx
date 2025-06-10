// src/admin/AdminRestaurants.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllRestaurants, deleteRestaurant } from '../services/restaurants';

export default function AdminRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  // جلب قائمة المطاعم
  const fetchRestaurants = async () => {
    try {
      const data = await getAllRestaurants();
      setRestaurants(data);
    } catch (err) {
      console.error('Failed to fetch restaurants:', err);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // حذف مطعم
  const handleDelete = async (id) => {
    try {
      await deleteRestaurant(id);
      setRestaurants(restaurants.filter(r => r.restaurant_id !== id));
    } catch (err) {
      console.error('Failed to delete restaurant:', err);
    }
  };

  // الانتقال لصفحة إضافة مطعم
  const handleAdd = () => {
    navigate('/admin/restaurants/add');
  };

  // الانتقال لصفحة تعديل مطعم
  const handleEdit = (id) => {
    navigate(`/admin/restaurants/edit/${id}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Panel – Restaurants</h2>
      <button
        onClick={handleAdd}
        style={{
          marginBottom: 16,
          padding: '8px 16px',
          backgroundColor: '#4caf50',
          color: '#fff',
          border: 'none',
          borderRadius: 4
        }}
      >
        + Add Restaurant
      </button>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={th}>Image</th>
            <th style={th}>Name</th>
            <th style={th}>City</th>
            <th style={th}>Rating</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map(r => (
            <tr key={r.restaurant_id}>
              <td style={td}>
                <img
                  src={r.image_url || '/default-restaurant.jpg'}
                  alt={r.name}
                  width="80"
                  style={{ objectFit: 'cover', borderRadius: 4 }}
                />
              </td>
              <td style={td}>{r.name}</td>
              <td style={td}>{r.city}</td>
              <td style={td}>{r.rating?.toFixed(1) ?? 'N/A'}</td>
              <td style={td}>
                <button onClick={() => handleEdit(r.restaurant_id)} style={editBtn}>
                  Edit
                </button>
                <button onClick={() => handleDelete(r.restaurant_id)} style={deleteBtn}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  border: '1px solid #ddd',
  padding: 8,
  background: '#f5f5f5'
};

const td = {
  border: '1px solid #ddd',
  padding: 8
};

const editBtn = {
  marginRight: 8,
  padding: '4px 8px',
  background: '#0275d8',
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer'
};

const deleteBtn = {
  padding: '4px 8px',
  background: '#d9534f',
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer'
};
