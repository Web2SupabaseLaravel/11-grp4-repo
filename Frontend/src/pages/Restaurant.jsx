import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const GENDY_FONT_LINK = "https://fonts.googleapis.com/css2?family=Gendy:wght@400&display=swap";

const cities = [
  { label: "Istanbul", value: "Istanbul", coords: [41.0082, 28.9784] },
  { label: "Elazig", value: "Elazig", coords: [38.6741, 39.2226] },
  { label: "Ankara", value: "Ankara", coords: [39.9334, 32.8597] },
  { label: "Izmir", value: "Izmir", coords: [38.4192, 27.1287] },
];

const RestaurantPage = ({ cityRestaurantMap }) => {
  const { city, id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [guests, setGuests] = useState(4);
  const [location, setLocation] = useState(cities[0].value);
  const [mapPosition, setMapPosition] = useState(cities[0].coords);
  const [date, setDate] = useState("");

  useEffect(() => {
    const cityKey = city?.toLowerCase();
    const restaurants = cityRestaurantMap?.[cityKey];
    if (restaurants) {
      const rest = restaurants.find((r) => r.id === parseInt(id));
      if (rest) {
        setRestaurant(rest);
        const cityInfo = cities.find((c) => c.label.toLowerCase() === cityKey);
        if (cityInfo) {
          setLocation(cityInfo.value);
          setMapPosition(cityInfo.coords);
        }
      }
    }
  }, [city, id, cityRestaurantMap]);

  if (!restaurant) return <div>Restaurant not found</div>;

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });

  const {
    name: restaurantName,
    rating,
    reviewsCount = 900,
    priceRange = "€30 and under",
    cuisine = "Mexican",
    description = "Effortless table reservations across Turkey! Discover, book, and enjoy the finest dining experiences in top restaurants, from the vibrant streets of Istanbul to the charming eateries of Ankara and beyond. Your perfect table is just a click away!",
    image: mainImage = "https://images.unsplash.com/photo-1541544181002-5a6d6d4720a1",
    photoGallery = [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
    ],
    menuItems = [
      { name: "Guacamole", price: "€6.50", desc: "Freshly made avocado dip served with tortilla chips." },
      { name: "Tostadas", price: "€7.00", desc: "Crispy tortillas with beans, meat, and fresh toppings." },
      { name: "Quesadillas", price: "€6.90", desc: "Flour tortillas filled with cheese and grilled." },
      { name: "Nachos", price: "€5.50", desc: "Corn tortilla chips topped with cheese and jalapeños." }
    ],
  } = restaurant;

  const handleLocationChange = (e) => {
    const selectedCity = cities.find((c) => c.value === e.target.value);
    setLocation(selectedCity.value);
    setMapPosition(selectedCity.coords);
  };
<style>{`
        body {
          background-color: #f7f1e9;
          font-family: 'Gendy', cursive;
          margin: 0; padding: 0;
          color: #3f2c23;
        }
        .container {
          max-width: 1024px;
          margin: 40px auto;
          padding: 0 20px 60px;
        }
        .header-logo {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 20px;
          cursor: default;
          user-select: none;
        }
        .header-logo .red {
          color: #b82f38;
          font-weight: 900;
        }
        .rating-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 400;
          font-size: 14px;
          margin-bottom: 12px;
          user-select: none;
          font-family: Helvetica, Arial, sans-serif;
          font-weight: 500;
        }
        .reviews-count, .price-range, .cuisine {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #6b4e3a;
          font-family: Helvetica, Arial, sans-serif;
          font-weight: 500;
        }
        .rating-bar svg {
          cursor: default;
        }
        .description {
          font-size: 14px;
          line-height: 1.4;
          margin-bottom: 30px;
          max-width: 700px;
          font-family: Helvetica, Arial, sans-serif;
          font-weight: 500;
        }
        .map-container {
          height: 250px;
          width: 100%;
          border-radius: 6px;
          margin-bottom: 40px;
          box-shadow: 0 3px 12px rgb(0 0 0 / 0.15);
        }
        .main-section {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          margin-bottom: 60px;
        }
        .left-col {
          flex: 1 1 400px;
          min-width: 300px;
        }
        .right-col {
          flex: 0.8 1 280px;
          min-width: 280px;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        .main-image {
          width: 100%;
          height: 220px;
          object-fit: cover;
          border-radius: 8px;
          box-shadow: 0 6px 18px rgb(209 2 27 / 0.3);
          user-select: none;
        }
        .form-group {
          background-color: #502e19;
          color: white;
          padding: 12px 18px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          user-select: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-family: Helvetica, Arial, sans-serif;
          font-weight: 500;
        }
        select, input[type="date"] {
          font-family: Helvetica, Arial, sans-serif;
          font-weight: 500;
          font-size: 16px;
          padding: 6px 10px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          user-select: auto;
          outline: none;
        }
        select:focus, input[type="date"]:focus {
          outline: 2px solid #b82f38;
        }
        .guests-controls {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-top: 6px;
          font-weight: 900;
          font-size: 16px;
          user-select: none;
        }
        .guests-controls button {
          background-color: #3f2c23;
          border: none;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 4px;
          font-weight: 900;
          cursor: pointer;
          transition: background-color 0.3s ease;
          user-select: none;
        }
        .guests-controls button:hover {
          background-color: #b82f38;
        }
        .book-btn {
          background-color: #b82f38;
          color: white;
          font-weight: 900;
          text-transform: uppercase;
          font-size: 15px;
          border-radius: 4px;
          border: none;
          padding: 16px 30px;
          cursor: pointer;
          letter-spacing: 1px;
          user-select: none;
          align-self: flex-start;
          transition: background-color 0.3s ease;
        }
        .book-btn:hover {
          background-color: #b82f38;
        }
        .photos-section {
          margin-top: 40px;
        }
        .photos-section h3 {
          font-weight: 900;
          margin-bottom: 14px;
          font-size: 20px;
          letter-spacing: 0.3px;
          user-select: none;
          font-family: Helvetica, Arial, sans-serif;
          font-weight: 500;
        }
        .photo-gallery img {
          width: 100%;
          height: 80px;
          object-fit: cover;
          margin-bottom: 20px;
          border-radius: 4px;
          box-shadow: 0 1px 5px rgb(0 0 0 / 0.15);
          user-select: none;
        }
        .menu-section {
          margin-top: 40px;
        }
        .menu-section h3 {
          font-weight: 900;
          margin-bottom: 14px;
          font-size: 20px;
          letter-spacing: 0.3px;
          user-select: none;
          font-family: Helvetica, Arial, sans-serif;
          font-weight: 500;
        }
        .menu-item {
          margin-bottom: 14px;
          user-select: none;
          font-family: Helvetica, Arial, sans-serif;
          font-weight: 500;
          font-size: 14px;
        }
        .menu-item-name {
          font-weight: 900;
          font-size: 15px;
          color: #502e19;
          display: flex;
          justify-content: space-between;
          letter-spacing: 0.4px;
        }
        .menu-item-desc {
          font-size: 13px;
          color: #6b4e3a;
          margin-top: 3px;
        }
        @media (max-width: 768px) {
          .main-section {
            flex-direction: column;
          }
          .right-col {
            flex: none;
            min-width: 100%;
          }
        }
      `}</style>
  return (
    <>
      <link href={GENDY_FONT_LINK} rel="stylesheet" />
      <div className="container" style={{ fontFamily: "'Gendy', cursive", backgroundColor: "#faf5eb", padding: 20 }}>
        <header className="header-logo" style={{ fontSize: 36, fontWeight: 700, marginBottom: 20 }}>
          {restaurantName.split("•").map((part, idx) =>
            idx === 1 ? <span key={idx} style={{ color: "#b82f38" }}>•Et</span> : <span key={idx}>{part}</span>
          )}
        </header>

        <img src={mainImage} alt="Restaurant" style={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 10, marginBottom: 20 }} />

        <div className="rating-bar" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          {[...Array(5)].map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={i < Math.floor(rating) ? "#D0021B" : "#ddd"} viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73-3.523-3.356c-.329-.314-.158-.888.283-.95l4.898-.696 2.184-4.327c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          ))}
          <span>{rating.toFixed(1)} • {reviewsCount} Reviews • {priceRange} • {cuisine}</span>
        </div>

        <p style={{ lineHeight: 1.6 }}>{description}</p>

        <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={false} style={{ height: 250, borderRadius: 10, marginBottom: 30 }}>
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={mapPosition}>
            <Popup>{restaurantName} Location</Popup>
          </Marker>
        </MapContainer>

        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", marginBottom: 30 }}>
          <select value={location} onChange={handleLocationChange} style={{ padding: 12, borderRadius: 8, border: "1px solid #bbb", fontSize: 15 }}>
            {cities.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ padding: 12, borderRadius: 8, border: "1px solid #bbb", fontSize: 15 }} />

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setGuests(Math.max(1, guests - 1))} style={{ padding: "10px 14px", borderRadius: 8, background: "#3f1d0a", color: "white", border: "none", fontSize: 16, fontWeight: 700 }}>−</button>
            <span>{guests} Guests</span>
            <button onClick={() => setGuests(guests + 1)} style={{ padding: "10px 14px", borderRadius: 8, background: "#3f1d0a", color: "white", border: "none", fontSize: 16, fontWeight: 700 }}>+</button>
          </div>

          <a href="/reservation" style={{ backgroundColor: "#bd2031", color: "white", padding: "12px 24px", borderRadius: 8, textDecoration: "none", fontWeight: 700, fontSize: 16, textAlign: "center" }}>Book Now</a>
        </div>

        <section>
          <h3 style={{ fontSize: 22, marginBottom: 10 }}>Photos</h3>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {photoGallery.map((src, i) => (
              <img key={i} src={src} alt={`Photo ${i + 1}`} style={{ width: "49%", height: 140, objectFit: "cover", borderRadius: 6 }} />
            ))}
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h3 style={{ fontSize: 22, marginBottom: 10 }}>Menu</h3>
          {menuItems.map((item, idx) => (
            <div key={idx} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                <span>{item.name}</span>
                <span>{item.price}</span>
              </div>
              <div style={{ fontSize: 14, color: "#6b4e3a" }}>{item.desc}</div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default RestaurantPage;
