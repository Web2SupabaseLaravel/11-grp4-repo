import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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

  return (
    <>
      <link href={GENDY_FONT_LINK} rel="stylesheet" />
      <style>
        {`@import url('${GENDY_FONT_LINK}');`}
      </style>
      <style>{`
        body {
          background-color: #f7f1e9;
          font-family: 'Gendy', cursive;
          margin: 0; padding: 0;
          color: #3f2c23;
        }
      `}</style>
      <div className="container">
        <header className="header-logo">
          {restaurantName.split("•").map((part, idx) =>
            idx === 1 ? <span key={idx} className="red">•Et</span> : <span key={idx}>{part}</span>
          )}
        </header>

        <img src={mainImage} alt="Restaurant" className="main-image" />

        <div className="rating-bar">
          {[...Array(5)].map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={i < Math.floor(rating) ? "#D0021B" : "#ddd"} viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73-3.523-3.356c-.329-.314-.158-.888.283-.95l4.898-.696 2.184-4.327c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          ))}
          <span>{rating.toFixed(1)} • {reviewsCount} Reviews • {priceRange} • {cuisine}</span>
        </div>

        <p className="description">{description}</p>

        <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={false} className="map-container">
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={mapPosition}>
            <Popup>{restaurantName} Location</Popup>
          </Marker>
        </MapContainer>

        <div className="form-group">
          <select value={location} onChange={handleLocationChange}>
            {cities.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

          <div className="guests-controls">
            <button onClick={() => setGuests(Math.max(1, guests - 1))}>−</button>
            <span>{guests} Guests</span>
            <button onClick={() => setGuests(guests + 1)}>+</button>
          </div>

          <button className="book-btn" onClick={() => navigate(`/reservation/${restaurant.id}`)}>
            Book Now
          </button>
        </div>

        <section className="photos-section">
          <h3>Photos</h3>
          <div className="photo-gallery">
            {photoGallery.map((src, i) => (
              <img key={i} src={src} alt={`Photo ${i + 1}`} />
            ))}
          </div>
        </section>

        <section className="menu-section">
          <h3>Menu</h3>
          {menuItems.map((item, idx) => (
            <div key={idx} className="menu-item">
              <div className="menu-item-name">
                <span>{item.name}</span>
                <span>{item.price}</span>
              </div>
              <div className="menu-item-desc">{item.desc}</div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default RestaurantPage;
