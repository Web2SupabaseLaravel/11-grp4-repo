import React from "react";
import { Link } from "react-router-dom";

const GENDY_FONT_LINK = "https://fonts.googleapis.com/css2?family=Gendy:wght@400&display=swap";

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill={i <= rating ? "#D0021B" : "#ddd"}
        className="bi bi-star-fill"
        viewBox="0 0 16 16"
        style={{ marginLeft: 4 }}
      >
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73-3.523-3.356c-.329-.314-.158-.888.283-.95l4.898-.696 2.184-4.327c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
      </svg>
    );
  }
  return <div className="d-flex align-items-center">{stars}</div>;
};

const RestaurantCard = ({ restaurant }) => (
  <Link to={`/restaurant/${restaurant.city.toLowerCase()}/${restaurant.id}`} style={{ textDecoration: "none" }}>
    
    <div
      className="shadow-sm bg-white mb-5"
      style={{ width: "280px", cursor: "pointer", fontFamily: "'Gendy', cursive", color: "#38190f" }}
    >
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="img-fluid"
        style={{ height: 250, width: "100%", objectFit: "cover" }}
      />
      <div className="p-3" style={{ fontSize: 16 }}>
        <div className="fw-bold">{restaurant.name}</div>
        <div className="d-flex align-items-center mt-2" style={{ color: "#a19992", fontSize: 14 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="#a19992"
            className="bi bi-geo-alt"
            viewBox="0 0 16 16"
            style={{ marginRight: 6 }}
          >
            <path d="M12.166 8.94c-.524.827-1.05 1.657-1.564 2.486a35.475 35.475 0 0 1-1.01 1.64c-.146.21-.282.42-.41.626-.007.012-.015.023-.022.034a.144.144 0 0 1-.025.034.557.557 0 0 1-.073.066.388.388 0 0 1-.144.073.35.35 0 0 1-.07.01.385.385 0 0 1-.14-.01.56.56 0 0 1-.077-.068.132.132 0 0 1-.026-.034.3.3 0 0 1-.02-.034c-.128-.206-.263-.416-.41-.626-.306-.456-.633-.91-.973-1.358-.491-.664-1.034-1.3-1.52-1.936a.5.5 0 0 1 0-.56c.314-.433.644-.863.994-1.278.299-.345.597-.69.897-1.034.215-.245.43-.49.645-.736.027-.031.054-.062.081-.093a.5.5 0 0 1 .68 0c.224.257.443.521.66.784.322.406.63.83.91 1.275a.5.5 0 0 1-.044.57zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
            <path d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          </svg>
          {restaurant.city}
        </div>
        <div className="mt-2">
          <StarRating rating={restaurant.rating} />
        </div>
      </div>
    </div>
  </Link>
);





const ReservationHeader = ({ title, subtitle }) => (
  
  
  
  <div
    className="d-flex flex-column align-items-center justify-content-center text-center"
    style={{
      backgroundColor: "#cf1e2e",
      padding: "80px 20px 70px",
      color: "white",
      fontFamily: "'Gendy', cursive",
    }}
  >
    <h2 style={{ fontWeight: "bold", fontSize: 48, marginBottom: 0 }}>{title}</h2>
    <h1 style={{ fontWeight: "bold", fontSize: 64, marginBottom: 30, lineHeight: 1.1 }}>
      {subtitle}
    </h1>
    <form
      className="d-flex justify-content-center align-items-center"
      style={{ maxWidth: 460, width: "100%" }}
      onSubmit={(e) => e.preventDefault()}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          flexGrow: 1,
        }}
      >
        <img
  src="/search.png"
  alt="search icon"
  style={{ width: 18, height: 18, marginRight: 8 }}
/>
        <input
          type="text"
          placeholder="Location, Restaurant, or Cuisine…"
          style={{
            border: "none",
            outline: "none",
            fontSize: 14,
            flexGrow: 1,
            fontFamily: "'Gendy', cursive",
          }}
        />
      </div>
      <button
        type="submit"
        className="btn"
        style={{
          backgroundColor: "#1b0d06",
          color: "white",
          fontWeight: "600",
          fontSize: 14,
          padding: "8px 20px",
          marginLeft: 10,
          borderRadius: 6,
          fontFamily: "'Gendy', cursive",
        }}
      >
        Let's go
      </button>
    </form>
  </div>
);

const restaurantsData = [
  {
    id: 1,
    name: "Mikla",
    city: "Istanbul",
    rating: 5,
    image:
      "https://cdn.vox-cdn.com/thumbor/7nDr-VfQlq5rOH80ECW-wujr7qY=/0x0:2000x1334/1400x933/filters:focal(760x376:1060x676):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/66031684/mikla.0.jpg",
  },
  {
    id: 2,
    name: "Nusr-Et Steakhouse",
    city: "Istanbul",
    rating: 4,
    image:
      "https://cdn.vox-cdn.com/thumbor/fR9PC0bEzVg1eQ0D9Fp8hXO-MXQ=/0x0:2000x1333/1400x933/filters:focal(792x487:1100x795):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/65887813/nusr-et.0.jpg",
  },
  {
    id: 3,
    name: "360 Istanbul",
    city: "Istanbul",
    rating: 4,
    image: "https://media.timeout.com/images/105240600/750/422/image.jpg",
  },
  {
    id: 4,
    name: "Sunset Grill & Bar",
    city: "Istanbul",
    rating: 4,
    image: "https://media-cdn.tripadvisor.com/media/photo-s/15/f3/64/cf/sunset-grill-bar.jpg",
  },
];

export default function IstanbulRestaurantsPage({
  restaurants = restaurantsData,
  headerTitle = "Istanbul Restaurants",
  headerSubtitle = "Make a free reservation!",
}) {
  return (

    
    <>
      <link rel="stylesheet" href={GENDY_FONT_LINK} />
      <div style={{ backgroundColor: "#faf5eb", minHeight: "100vh", paddingBottom: 100 }}>
        <ReservationHeader title={headerTitle} subtitle={headerSubtitle} />
        <div
          className="d-flex flex-wrap justify-content-center"
          style={{ gap: 50, marginTop: 90 }}
        >
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </>
  );
}
