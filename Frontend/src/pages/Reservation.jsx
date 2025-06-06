import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getTablesByRestaurantId } from "../services/diningTable";
import { createCustomer } from "../services/customerInfo"; // عدّل المسار إذا لازم


const TableBox = ({ table, isSelected, onSelect }) => {
  const { number, seating_capacity, status } = table;
  const isReserved = status === false || status === "reserved" || status === 0;
  const borderColor = isReserved ? "#D64545" : isSelected ? "#f0a500" : "#4CAF50";
  const Icon = isReserved ? FaTimesCircle : FaCheckCircle;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => status !== "reserved" && onSelect(table)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && status !== "reserved") onSelect(table);
      }}
      title={`Table ${number} • Seats: ${seating_capacity} • ${
        status === "reserved" ? "Reserved" : "Available"
      }`}
      style={{
        borderLeft: `6px solid ${borderColor}`,
        backgroundColor: isSelected ? "#4a341f" : "#3f1d0a",
        borderRadius: 8,
        padding: 16,
        color: "#f3e9db",
        fontWeight: 300,
        fontSize: 15,
        width: 130,
        userSelect: "none",
        cursor: status === "reserved" ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: 12,
        boxShadow: isSelected ? "0 0 10px #f0a500" : "0 4px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease, background-color 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <Icon color={borderColor} size={24} />
      <div>
        <div style={{ fontFamily: "'Gendy', cursive", fontWeight: 300 }}>
          Table {number}
        </div>
        <div
          style={{
            fontSize: 13,
            marginTop: 4,
            color: "#d7c9b8",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 300,
          }}
        >
          Seats: {seating_capacity}
        </div>
      </div>
    </div>
  );
};

const groupTablesByLocation = (tables) => {
  return tables.reduce((acc, table) => {
    const loc = table.location || "other";
    if (!acc[loc]) acc[loc] = [];
    acc[loc].push(table);
    return acc;
  }, {});
};

const Reservation = ({ restaurantLayoutImage }) => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [hour, setHour] = useState("18:00");
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [error, setError] = useState("");

  const generateHours = () => {
    const times = [];
    for (let h = 0; h < 24; h++) {
      ["00", "30"].forEach((m) => {
        times.push(`${h.toString().padStart(2, "0")}:${m}`);
      });
    }
    return times;
  };

  const hours = generateHours();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const data = await getTablesByRestaurantId(restaurantId);
        setTables(data);
      } catch (err) {
        setError("Failed to load tables. Please try again later.");
      }
    };

    if (restaurantId) {
      fetchTables();
    }
  }, [restaurantId]);

  const groupedTables = groupTablesByLocation(tables);

  const handleBookNow = async () => {
  setError("");

  if (!name.trim()) {
    setError("Please enter your name.");
    return;
  }

  if (!selectedTable) {
    setError("Please select a table before booking.");
    return;
  }

  const isReserved =
    selectedTable.status === false ||
    selectedTable.status === 0 ||
    selectedTable.status === "reserved";

  if (isReserved) {
    setError("Selected table is already reserved. Please choose another.");
    return;
  }

  try {
    // أرسل البيانات إلى API
    await createCustomer({
      user_id: 1, // أو حسب ما بدك تعيّنه
      Name: name,
      notes: `Reservation for ${date} at ${hour}`,
      preferences: `Table ${selectedTable.number}`,
    });

    // انطلق لصفحة التأكيد
    navigate("/confirmed", {
      state: {
        name,
        date,
        hour,
        tableNumber: selectedTable.number,
        seating_capacity: selectedTable.seating_capacity,
      },
    });
  } catch (error) {
    console.error(error);
    setError("There was a problem processing your reservation. Please try again.");
  }
};

  return (
    <>
     <link
        href="https://fonts.googleapis.com/css2?family=Gendy:wght@300&display=swap"
        rel="stylesheet"
      />
      <style>{`
        * {
          font-family: 'Gendy', cursive;
          box-sizing: border-box;
        }
        body,html,#root {
          margin: 0; padding: 0; height: 100%;
          background-color: #f5f1ec;
        }
        .reservation-container {
          display: flex;
          flex-wrap: wrap;
          gap: 50px;
          max-width: 1200px;
          margin: 40px auto;
          padding: 0 20px 40px;
          justify-content: center;
          align-items: flex-start;
        }
        .left-section {
          flex: 1 1 400px;
          color: #3f1d0a;
          display: flex;
          flex-direction: column;
          min-width: 320px;
        }
        .left-section h1 {
          font-weight: 300;
          font-size: 48px;
          margin-bottom: 40px;
          letter-spacing: 2px;
          font-family: 'Gendy', cursive;
        }
        .input-row {
          display: flex;
          gap: 28px;
          margin-bottom: 45px;
          flex-wrap: wrap;
        }
        .input-group {
          background-color: #3f1d0a;
          padding: 18px 32px;
          border-radius: 8px;
          min-width: 140px;
          display: flex;
          flex-direction: column;
          color: white;
          user-select: none;
          box-shadow: 0 3px 10px rgba(63,29,10,0.4);
          transition: box-shadow 0.3s ease;
          font-family: Helvetica, Arial, sans-serif;
          font-weight: 300;
        }
        .input-group:hover, .input-group:focus-within {
          box-shadow: 0 6px 20px rgba(63,29,10,0.7);
        }
        .input-label {
          font-size: 12px;
          letter-spacing: 1.5px;
          opacity: 0.8;
          margin-bottom: 10px;
          user-select: none;
          font-weight: 300;
          font-family: Helvetica, Arial, sans-serif;
        }
        input[type="date"],
        select {
          background-color: transparent;
          border: none;
          color: white;
          font-weight: 300;
          font-size: 18px;
          cursor: pointer;
          padding: 5px 0;
          outline: none;
          border-radius: 4px;
          transition: background-color 0.3s ease;
          font-family: Helvetica, Arial, sans-serif;
        }
        input[type="date"]:hover,
        select:hover,
        input[type="date"]:focus,
        select:focus {
          background-color: rgba(255 255 255 / 0.15);
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }
        select option {
          color: black;
          font-family: Helvetica, Arial, sans-serif;
          font-weight: 300;
        }
        .tables-section {
          margin-bottom: 40px;
        }
        .tables-section h3 {
          color: #3f1d0a;
          font-weight: 300;
          margin-bottom: 18px;
          text-transform: capitalize;
          border-bottom: 3px solid #3f1d0a;
          padding-bottom: 6px;
          width: fit-content;
          font-size: 22px;
          letter-spacing: 1.2px;
          font-family: 'Gendy', cursive;
        }
        .tables-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px 30px;
        }
        .right-section {
          flex: 1 1 550px;
          min-width: 320px;
          border-radius: 12px;
          overflow: hidden;
          background-color: #fff;
        }
        .right-section img {
          width: 100%;
          display: block;
          user-select: none;
          pointer-events: none;
          height: auto;
          object-fit: contain;
          border: none !important;
          box-shadow: none !important;
        }
        .book-now-btn {
          background-color: #bd2031;
          color: white;
          font-weight: 900;
          text-transform: uppercase;
          font-size: 16px;
          border-radius: 8px;
          border: none;
          padding: 16px 32px;
          cursor: pointer;
          letter-spacing: 1.2px;
          user-select: none;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          align-self: flex-start;
          margin-top: 10px;
          width: fit-content;
        }
        .book-now-btn:hover {
          background-color: #a21a28;
          box-shadow: 0 6px 18px rgba(162, 26, 40, 0.8);
        }
        .error-message {
          margin-top: 10px;
          color: #D64545;
          font-weight: 700;
          font-family: Helvetica, Arial, sans-serif;
          user-select: none;
        }
        @media (max-width: 900px) {
          .reservation-container {
            flex-direction: column;
            align-items: center;
          }
          .left-section, .right-section {
            max-width: 100%;
            flex-basis: auto;
          }
          .right-section {
            width: 100%;
            max-width: 600px;
          }
        }
      `}</style>
      <div className="reservation-container" role="main">
        <section className="left-section" aria-label="Reservation controls">
          <h1>Reservation</h1>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="date-picker" className="input-label">DATE</label>
              <input
                id="date-picker"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                aria-describedby="dateHelp"
              />
            </div>
            <div className="input-group">
  <label htmlFor="name-input" className="input-label">NAME</label>
  <input
    id="name-input"
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Your Name"
    style={{
      color: 'white',
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '18px',
      outline: 'none'
    }}
  />
</div>

          </div>

          {Object.entries(groupTablesByLocation(tables)).map(
            ([location, tablesInLoc]) => (
              <section className="tables-section" key={location} aria-label={`${location} tables`}>
                <h3>{location}</h3>
                <div className="tables-list">
                  {tablesInLoc.map((table) => (
                    <TableBox
                      key={table.number}
                      table={table}
                      isSelected={selectedTable?.number === table.number}
                      onSelect={setSelectedTable}
                    />
                  ))}
                </div>
              </section>
            )
          )}

          {error && <div className="error-message">{error}</div>}

          <button
            className="book-now-btn"
            onClick={handleBookNow}
            aria-label="Book Now"
            type="button"
          >
            Book Now
          </button>
        </section>

        <aside className="right-section" aria-label="Restaurant layout">
          <img src={restaurantLayoutImage} alt="Restaurant layout" draggable={false} />
        </aside>
      </div>
    </>
  );
};

export default Reservation;
