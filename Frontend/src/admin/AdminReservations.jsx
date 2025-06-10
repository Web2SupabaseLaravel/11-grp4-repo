import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminReservations = () => {
  return (
    <div style={{ paddingBottom: "70px", paddingTop: "20px", fontFamily: "'Gendy', cursive" }} className="container">
      <h3 className="mb-4">Manage Reservations</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>User</th>
            <th>Restaurant</th>
            <th>Date</th>
            <th>Guests</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ali Ahmad</td>
            <td>Nusr-Et</td>
            <td>2025-06-10</td>
            <td>4</td>
            <td>
              <button className="btn btn-sm btn-outline-secondary me-2">Modify</button>
              <button className="btn btn-sm btn-outline-danger">Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>
      <AdminNavbar />
    </div>
  );
};

export default AdminReservations;
