import React from "react";
import { useLocation } from "react-router-dom";

const ReservationConfirmed = () => {
  const { state } = useLocation();

  const {
    name = "Guest",
    date = "Not Set",
    hour = "Not Set",
    tableNumber = "N/A",
    seating_capacity = "N/A",
  } = state || {};

  const bookingNumber = Math.floor(10000 + Math.random() * 90000); // Random number for now

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Gendy:wght@400&display=swap"
        rel="stylesheet"
      />
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          height: "100vh",
          backgroundColor: "#f6f0e8",
          fontFamily: "'Gendy', cursive",
          color: "#4b2e1e",
          padding: "0 20px",
        }}
      >
        <h1 style={{ fontWeight: "bold", fontSize: "3.5rem", marginBottom: "1.5rem" }}>
          Reservation Confirmed
        </h1>
        <div
          className="d-flex justify-content-center flex-wrap"
          style={{ fontWeight: "600", fontSize: "1.1rem", gap: "3rem", marginBottom: "1.5rem" }}
        >
          <span>NAME: {name}</span>
          <span>DATE: {date}</span>
          <span>HOUR: {hour}</span>
          <span>TABLE: {tableNumber}</span>
          <span>SEATS: {seating_capacity}</span>
        </div>
        <p
          style={{
            fontWeight: "400",
            fontSize: "0.9rem",
            maxWidth: "400px",
            lineHeight: 1.3,
            opacity: 0.5,
          }}
        >
          PLEASE CHECK YOUR EMAIL IF YOU WANT TO MODIFY YOUR RESERVATION
          <br />
          BOOKING NUMBER:
          <br />
          <strong>#{bookingNumber}</strong>
        </p>
      </div>
    </>
  );
};

export default ReservationConfirmed;