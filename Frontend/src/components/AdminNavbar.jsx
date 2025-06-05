import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUsers, FaUtensils, FaCalendarAlt, FaStore } from "react-icons/fa";

const AdminNavbar = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Gendy:wght@400&display=swap"
        rel="stylesheet"
      />
      <div
        className="d-flex justify-content-around align-items-center border-top"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#faf5eb",
          padding: "12px 0",
          fontFamily: "'Gendy', cursive",
          zIndex: 1000,
        }}
      >
        <NavLink
          to="/admin/users"
          className="text-dark text-decoration-none text-center"
        >
          <FaUsers size={18} />
          <div style={{ fontSize: "12px" }}>Users</div>
        </NavLink>
        <NavLink
          to="/admin/restaurants"
          className="text-dark text-decoration-none text-center"
        >
          <FaUtensils size={18} />
          <div style={{ fontSize: "12px" }}>Restaurants</div>
        </NavLink>
        <NavLink
          to="/admin/reservations"
          className="text-dark text-decoration-none text-center"
        >
          <FaCalendarAlt size={18} />
          <div style={{ fontSize: "12px" }}>Reservations</div>
        </NavLink>
        <NavLink
          to="/admin/status"
          className="text-dark text-decoration-none text-center"
        >
          <FaStore size={18} />
          <div style={{ fontSize: "12px" }}>Status</div>
        </NavLink>
      </div>
    </>
  );
};

export default AdminNavbar;
