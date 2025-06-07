import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { getAllTables, deleteTable, updateTable } from "../services/diningTable";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminTables = () => {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const data = await getAllTables();
      setTables(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this table?")) return;
    try {
      await deleteTable(id);
      setSuccess("Table deleted successfully");
      fetchTables();
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleStatus = async (table) => {
    try {
      const updatedStatus = table.status ? 0 : 1; // 1 = available, 0 = occupied
      await updateTable(table.table_id, { status: updatedStatus });
      setSuccess(`Table ${table.number} is now ${updatedStatus ? "available" : "occupied"}`);
      fetchTables();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container" style={{ paddingBottom: 70, paddingTop: 20, fontFamily: "'Gendy', cursive" }}>
      <h3 className="mb-4">Manage Tables</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Number</th>
            <th>Seats</th>
            <th>Location</th>
            <th>Status</th>
            <th>Restaurant ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((t) => (
            <tr key={t.table_id}>
              <td>{t.number}</td>
              <td>{t.seating_capacity}</td>
              <td>{t.location || "-"}</td>
              <td>
                <span
                  className={`badge ${t.status ? "bg-success" : "bg-danger"}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleStatus(t)}
                >
                  {t.status ? "Available" : "Occupied"}
                </span>
              </td>
              <td>{t.restaurant_id}</td>
              <td>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(t.table_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AdminNavbar />
    </div>
  );
};

export default AdminTables;
