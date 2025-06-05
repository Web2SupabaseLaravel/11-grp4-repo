import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminRestaurants = () => {
  return (
    <div style={{ paddingBottom: "70px", paddingTop: "20px", fontFamily: "'Gendy', cursive" }} className="container">
      <h3 className="mb-4">Manage Restaurants</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nusr-Et</td>
            <td>Istanbul</td>
            <td>4.8</td>
            <td>
              <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
              <button className="btn btn-sm btn-outline-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <AdminNavbar />
    </div>
  );
};

export default AdminRestaurants;
