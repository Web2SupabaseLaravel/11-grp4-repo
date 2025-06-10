// src/admin/EditRestaurant.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRestaurantById, updateRestaurant } from '../services/restaurants';

export default function EditRestaurant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    restaurant_id: '',
    name: '',
    city: '',
    address: '',
    opening_hours: '',
    phone_number: '',
    email: '',
    seating_capacity: '',
    allowsreservationmodification: false,
    image_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1) جلب بيانات المطعم مسبقًا
  useEffect(() => {
    getRestaurantById(id)
      .then(data => {
        setForm({
          restaurant_id: data.restaurant_id,
          name: data.name || '',
          city: data.city || '',
          address: data.address || '',
          opening_hours: data.opening_hours || '',
          phone_number: data.phone_number || '',
          email: data.email || '',
          seating_capacity: data.seating_capacity || '',
          allowsreservationmodification: data.allowsreservationmodification,
          image_url: data.image_url || ''
        });
      })
      .catch(err => {
        console.error('Failed to load restaurant:', err);
        setError('Unable to load restaurant data.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 2) إرسال التحديث
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await updateRestaurant(id, {
        name: form.name,
        city: form.city,
        address: form.address,
        opening_hours: form.opening_hours,
        phone_number: form.phone_number,
        email: form.email,
        seating_capacity: parseInt(form.seating_capacity, 10),
        allowsreservationmodification: form.allowsreservationmodification,
        image_url: form.image_url
      });
      navigate('/admin/restaurants');
    } catch (err) {
      console.error('Failed to update restaurant:', err);
      setError('Failed to save changes.');
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (error)   return <p style={{ padding: 20, color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Restaurant #{form.restaurant_id}</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <label>Name:</label><br/>
        <input name="name" value={form.name} onChange={handleChange} required/><br/><br/>

        <label>City:</label><br/>
        <input name="city" value={form.city} onChange={handleChange} required/><br/><br/>

        <label>Address:</label><br/>
        <input name="address" value={form.address} onChange={handleChange}/><br/><br/>

        <label>Opening Hours:</label><br/>
        <input name="opening_hours" value={form.opening_hours} onChange={handleChange}/><br/><br/>

        <label>Phone Number:</label><br/>
        <input name="phone_number" value={form.phone_number} onChange={handleChange}/><br/><br/>

        <label>Email:</label><br/>
        <input name="email" type="email" value={form.email} onChange={handleChange}/><br/><br/>

        <label>Seating Capacity:</label><br/>
        <input name="seating_capacity" type="number" value={form.seating_capacity} onChange={handleChange}/><br/><br/>

        <label>
          <input
            name="allowsreservationmodification"
            type="checkbox"
            checked={form.allowsreservationmodification}
            onChange={handleChange}
          /> Allows Reservation Modification
        </label><br/><br/>

        <label>Image URL:</label><br/>
        <input name="image_url" value={form.image_url} onChange={handleChange}/><br/><br/>

        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#0275d8',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
