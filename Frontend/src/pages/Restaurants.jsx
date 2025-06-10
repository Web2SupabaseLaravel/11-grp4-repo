// Pages/Restaurants.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllRestaurants } from '../services/restaurants';

const Restaurants = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all restaurants then filter by city
    getAllRestaurants()
      .then((data) => {
        const filtered = data.filter(r => r.city?.toLowerCase() === city.toLowerCase());
        setRestaurants(filtered);
      })
      .catch((err) => {
        console.error('Error fetching restaurants:', err);
      })
      .finally(() => setLoading(false));
  }, [city]);

  if (loading) {
    return <p style={{ padding: 20 }}>Loading restaurants...</p>;
  }

  if (restaurants.length === 0) {
    return (
      <div style={{ padding: 40 }}>
        <h2>No restaurants found in {city}</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ marginBottom: 30 }}>Restaurants in {city}</h1>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {restaurants.map((r) => (
          <div
            key={r.restaurant_id}
            onClick={() => navigate(`/restaurant/${r.restaurant_id}`)}
            style={{
              border: '1px solid #ccc',
              borderRadius: 10,
              padding: 20,
              width: 280,
              background: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}
          >
            <img
              src={r.image_url || '/default-restaurant.jpg'}
              alt={r.name}
              style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 6 }}
            />
            <h3 style={{ margin: '10px 0' }}>{r.name}</h3>
            <p style={{ margin: '4px 0' }}>{r.address}</p>
            <p style={{ fontSize: 12, color: '#555', margin: '4px 0' }}>{r.opening_hours}</p>
            <p style={{ fontSize: 12, color: '#555', margin: '4px 0' }}>Phone: {r.phone_number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
