// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRestaurants } from "../services/restaurants";

export default function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState("istanbul");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllRestaurants()
      .then((data) => {
        setRestaurants(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching restaurants:", err);
        setError("Failed to load restaurants.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filtered = restaurants.filter(
    (r) => r.city?.toLowerCase() === location.toLowerCase()
  );

  if (loading) {
    return <p style={{ padding: 20 }}>Loading restaurants...</p>;
  }

  if (error) {
    return <p style={{ padding: 20, color: "red" }}>{error}</p>;
  }

  const cities = Array.from(
    new Set(restaurants.map((r) => r.city || "Unknown"))
  );

  return (
    <div className="container">
      {/* City selector buttons */}
      <div className="location-buttons" style={{ marginBottom: 16 }}>
        {cities.map((cityName) => (
          <button
            key={cityName}
            onClick={() => setLocation(cityName)}
            style={{
              margin: "0 8px 8px 0",
              padding: "8px 16px",
              cursor: "pointer",
              backgroundColor:
                cityName === location ? "#bd2031" : "#eee",
              color: cityName === location ? "#fff" : "#333",
              border: "none",
              borderRadius: 4,
            }}
          >
            {cityName}
          </button>
        ))}
      </div>

      {/* Restaurant cards */}
      <div
        className="cards-grid"
        style={{ display: "flex", gap: 20, flexWrap: "wrap" }}
      >
        {filtered.map((r) => (
          <div
            key={r.restaurant_id}
            className="card"
            onClick={() =>
              navigate(`/restaurant/${r.restaurant_id}`)
            }
            style={{
              border: "1px solid #ccc",
              borderRadius: 10,
              padding: 20,
              width: 280,
              background: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >
            <img
              src={r.image_url || "/default-restaurant.jpg"}
              alt={r.name}
              loading="lazy"
              style={{
                width: "100%",
                height: 160,
                objectFit: "cover",
                borderRadius: 6,
              }}
            />
            <div className="card-body">
              <h2
                className="card-title"
                style={{ margin: "10px 0" }}
              >
                {r.name}
              </h2>
              <p
                className="card-desc"
                style={{ margin: "4px 0", fontSize: 14 }}
              >
                {r.address}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "#555",
                  margin: "4px 0",
                }}
              >
                {r.opening_hours}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "#555",
                  margin: "4px 0",
                }}
              >
                Phone: {r.phone_number}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
