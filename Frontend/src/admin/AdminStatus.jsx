import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminStatus = () => {
  return (
    <div style={{ paddingBottom: "70px", paddingTop: "20px", fontFamily: "'Gendy', cursive" }} className="container">
      <h3 className="mb-4">Restaurant Status</h3>
      <div className="card p-3">
        <h5>Nusr-Et Istanbul</h5>
        <p>Status: <span className="badge bg-success">Open</span></p>
        <button className="btn btn-outline-warning">Toggle Status</button>
      </div>
      <AdminNavbar />
    </div>
  );
};

export default AdminStatus;
