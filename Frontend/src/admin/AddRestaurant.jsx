import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRestaurant } from '../services/restaurants';

export default function AddRestaurant() {
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
  const [error, setError] = useState(null);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addRestaurant({
        restaurant_id: parseInt(form.restaurant_id, 10),
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
      console.error(err);
      setError('فشل إضافة المطعم، تأكد من البيانات.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>+ Add New Restaurant</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <label>ID:</label><br/>
        <input name="restaurant_id" value={form.restaurant_id} onChange={handleChange} required/><br/><br/>

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

        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#4caf50', color:'#fff', border:'none', borderRadius:4 }}>
          Add Restaurant
        </button>
      </form>
    </div>
  );
}
