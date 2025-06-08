// HomePage.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import "slick-carousel/slick/slick.css";

const citiesData = [ // no need backend data here 
  {
    id: "istanbul",
    name: "Istanbul",
    description:
      "Explore Istanbul’s vibrant dining scene! From traditional eateries to modern restaurants, experience a rich blend of flavors and cultures in every corner of the city.",
    image: "/istanbul.png",
  },
  {
    id: "ankara",
    name: "Ankara",
    description:
      "Discover Ankara’s diverse dining scene! From cozy local spots to elegant restaurants, enjoy a perfect blend of tradition and modern flavors in the heart of Turkey.",
    image: "/ankara.png",
  },
  {
    id: "izmir",
    name: "Izmir",
    description:
      "Experience Izmir’s vibrant culinary scene! From seaside cafés to authentic Turkish restaurants, savor a perfect mix of fresh flavors and rich traditions by the Aegean coast.",
    image: "/izmir.png",
  },
  {
    id: "elazig",
    name: "Elazig",
    description:
      "Explore the rich culinary heritage of Elazığ! Known for its traditional Anatolian flavors, the city offers a unique dining experience with delicious kebabs, local specialties, and warm hospitality.",
    image: "/elazig.png",
  },
];
const userRole = localStorage.getItem("userRole");
export default function Home() {
  const [location, setLocation] = useState("istanbul");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(4);
  const dateInputRef = useRef(null);
  const navigate = useNavigate();

  function formatDate(d) {
    if (!d) return "SELECT DATE";
    const options = { month: "short", day: "numeric", year: "numeric" };
    const dt = new Date(d);
    return dt.toLocaleDateString("en-US", options).toUpperCase();
  }

  const openDatePicker = () => {
    if (dateInputRef.current) dateInputRef.current.showPicker?.() || dateInputRef.current.click();
  };

  return (







    <>
      <link href="https://fonts.googleapis.com/css2?family=Gendy:wght@400&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        body, html, #root {
          margin: 0; padding: 0;
          font-family: 'Gendy', cursive;
          background-color: #f7f3eb;
          color: #442a18;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 24px 16px; }
        .top-bar {
          display: flex; justify-content: center; gap: 40px;
          margin-bottom: 60px; margin-top: 30px; flex-wrap: wrap;
        }
        .select-box, .date-box, .guests-box {
          background-color: #442a18; color: white;
          padding: 19px 30px; font-size: 14px; letter-spacing: 0.05em;
          text-transform: uppercase; border: none; cursor: pointer;
          display: flex; align-items: center; gap: 30px;
          min-width: 140px; border-radius: 0; margin: 0% 1%;
          position: relative;
        }
        .select-box select {
          background: none; border: none; color: white;
          font-family: 'Gendy', cursive; font-size: 14px;
          text-transform: uppercase; cursor: pointer; appearance: none;
        }
        .guests-box > button {
          background: none; border: 1.5px solid white; color: white;
          font-weight: 900; font-size: 18px; width: 30px; height: 30px;
          border-radius: 2px; cursor: pointer;
          display: flex; justify-content: center; align-items: center;
          user-select: none;
        }
        .book-button {
          background-color: #bd2031; color: white;
          font-weight: 700; font-size: 14px; padding: 12px 32px;
          border: none; cursor: pointer; text-transform: uppercase;
          letter-spacing: 0.05em; min-width: 140px; border-radius: 0;
        }
        .main-section {
          display: flex; gap: 50px; justify-content: flex-start;
          align-items: center; flex-wrap: wrap; margin-bottom: 90px;
          padding-left: 90px;
        }
        .main-text {
          max-width: 500px; font-weight: 300; font-size: 90px;
          line-height: 1.1; letter-spacing: -0.02em; user-select: none;
          min-width: 280px;
        }
        .main-subtext {
          font-weight: 100; font-size: 14px; max-width: 500px;
          margin-top: 12px; user-select: none; color: #442a18cc;
          min-width: 280px;
        }
        .location-buttons {
          margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap;
        }
        .location-buttons button {
          background-color: #bd2031; border: none; color: white;
          padding: 8px 24px; cursor: pointer;
          font-family: 'Gendy', cursive; font-weight: 700;
          font-size: 14px; text-transform: uppercase;
          letter-spacing: 0.05em; user-select: none; min-width: 90px;
          border-radius: 0; transition: background-color 0.3s ease;
        }
        .location-buttons button:hover {
          background-color: #a01a27;
        }
        .phone-image {
          user-select: none; min-width: 220px; max-width: 350px;
          flex-shrink: 0;
        }
        .phone-image img {
          width: 130%; display: block; user-select: none;
          margin-bottom: 90px;
        }
        .cards-grid {
          display: flex; gap: 24px; overflow-x: auto;
          padding-bottom: 10px; scroll-behavior: smooth;
        }
        .cards-grid::-webkit-scrollbar {
          height: 8px;
        }
        .cards-grid::-webkit-scrollbar-thumb {
          background: #bd2031; border-radius: 4px;
        }
        .cards-grid::-webkit-scrollbar-track {
          background: transparent;
        }
        .card {
          background-color: white; border-radius: 8px; overflow: hidden;
          max-width: 320px; width: 320px; user-select: none;
          display: flex; flex-direction: column; cursor: pointer;
          transition: none; box-shadow: none !important;
          flex-shrink: 0; border: 1px solid #ddd;
        }
        .card:hover {
          box-shadow: none;
        }
        .card img {
          width: 100%; height: 160px; object-fit: cover;
          user-select: none;
        }
        .card-body {
          padding: 16px 24px 24px; flex-grow: 1;
          display: flex; flex-direction: column; justify-content: space-between;
        }
        .card-title {
          font-weight: 700; font-size: 20px; margin-bottom: 6px;
          color: #442a18;
        }
        .card-desc {
          font-weight: 400; font-size: 12px; color: #442a18cc;
          margin-bottom: 16px; line-height: 1.4; flex-grow: 1;
        }
        .discover-btn {
          align-self: flex-start; font-weight: 700; font-size: 12px;
          color: #442a18; border: 1.5px solid #442a18;
          padding: 6px 16px; border-radius: 50px; background: none;
          cursor: pointer; transition: all 0.3s ease;
          text-transform: uppercase; letter-spacing: 0.1em;
        }
        .discover-btn:hover {
          background-color: #442a18; color: white;
        }
        .date-display {
          font-weight: 700; padding-left: 8px; padding-right: 8px;
          user-select: none; white-space: nowrap;
          text-transform: uppercase;
        }
        .date-box input[type="date"] {
          position: absolute; left: 0; top: 0; width: 100%; height: 100%;
          opacity: 0; cursor: pointer; z-index: 2;
        }
      `}</style>

      {userRole === "admin" && <AdminNavbar />}

      <div className="container">
        <div className="top-bar" aria-label="Booking controls">
          <div className="select-box" aria-label="Location select">
            <label htmlFor="location-select" style={{ fontWeight: "700", marginRight: 6 }}>
              LOCATION
            </label>
            <select
              id="location-select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              aria-live="polite"
            >
              <option value="istanbul">Istanbul</option>
              <option value="ankara">Ankara</option>
              <option value="izmir">Izmir</option>
              <option value="elazig">Elazig</option>
            </select>
          </div>
          <div
            className="date-box"
            aria-label="Date selector"
            style={{ display: "flex", alignItems: "center", gap: 8 }}
            onClick={() => dateInputRef.current?.showPicker?.()}
          >
            <div style={{ fontSize: 10, letterSpacing: "0.1em", userSelect: "none" }}>DATE</div>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setDate(e.target.value)}
              ref={dateInputRef}
              aria-label="Select date"
            />
            <div className="date-display" aria-live="polite">{formatDate(date)}</div>
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 24 24"
              style={{ marginLeft: 8, pointerEvents: "none" }}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div
            className="guests-box"
            aria-label="Guest selector"
            style={{ gap: 8, justifyContent: "center" }}
          >
            <div style={{ fontSize: 10, letterSpacing: "0.1em", fontWeight: 700 }}>GUEST(S)</div>
            <div style={{ fontWeight: 700, minWidth: 70, textAlign: "center" }} aria-live="polite">
              {guests} GUESTS
            </div>
            <button aria-label="Remove guest" onClick={() => setGuests((g) => (g > 1 ? g - 1 : 1))} type="button">
              &minus;
            </button>
            <button aria-label="Add guest" onClick={() => setGuests((g) => g + 1)} type="button">
              +
            </button>
          </div>
          <button className="book-button" type="button" aria-label="Book now">
            BOOK NOW
          </button>
        </div>

        <section className="main-section">
          <div>
            <h1 className="main-text" aria-label="Reserve your table heading">
              Reserve Your <br />
              Table.
            </h1>
            <p className="main-subtext" aria-label="Intro text">
              Effortless table reservations across Turkey! Discover, book, and enjoy the finest dining experiences in top restaurants, from the vibrant streets of Istanbul to the charming eateries of Ankara and beyond. Your perfect table is just a click away!
            </p>
            <div className="location-buttons" role="group" aria-label="Select city">
              {citiesData.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setLocation(c.id)}
                  aria-pressed={location === c.id}
                  type="button"
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
          <div className="phone-image" aria-hidden="true">
            <img src="/mobile.png" alt="Mobile app showing ResTo logo" loading="lazy" draggable="false" style={{ userSelect: "none" }} />
          </div>
        </section>

        <div className="cards-grid" aria-label="City restaurant cards">
          {citiesData.map(({ id, name, description, image }) => (
            <article className="card" key={id} tabIndex={0} aria-labelledby={`${id}-title`}>
              <img src={image} alt={`${name} city view`} loading="lazy" draggable="false" />
              <div className="card-body">
                <h2
                  className="card-title"
                  id={`${id}-title`}
                  style={{
                    fontFamily: "'Gendy', cursive",
                    fontWeight: "700",
                    fontSize: "24px",
                    color: "#3b1a00",
                  }}
                >
                  {name}
                </h2>
                <p
                  className="card-desc"
                  style={{
                    fontFamily: "'Gendy', cursive",
                    fontWeight: "400",
                    fontSize: "14px",
                    color: "#9e9e9e",
                    marginBottom: "20px",
                  }}
                >
                  {description}
                </p>
                <button
                  className="discover-btn"
                  type="button"
                  aria-label={`Discover ${name} restaurants`}
                  style={{
                    fontFamily: "'Gendy', cursive",
                    fontWeight: "700",
                    fontSize: "13px",
                    borderRadius: "20px",
                    border: "1.5px solid #3b1a00",
                    color: "#3b1a00",
                    padding: "6px 18px",
                    backgroundColor: "white",
                    textTransform: "none",
                    letterSpacing: "normal",
                    cursor: "pointer",
                    alignSelf: "flex-start",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#3b1a00";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = "#3b1a00";
                  }}
                  onClick={() => navigate(`/${id}`)}
                >
                  Discover Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
