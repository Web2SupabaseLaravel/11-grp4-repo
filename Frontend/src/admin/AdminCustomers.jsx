import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { getAllCustomers, deleteCustomer } from "../services/customerInfo";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getAllCustomers();
      setCustomers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;
    try {
      await deleteCustomer(id);
      setSuccess("Customer deleted successfully");
      fetchCustomers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container" style={{ paddingBottom: 70, paddingTop: 20, fontFamily: "'Gendy', cursive" }}>
      <h3 className="mb-4">Manage Customers</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>User ID</th>
            <th>Notes</th>
            <th>Preferences</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.info_id}>
              <td>{c.Name}</td>
              <td>{c.user_id}</td>
              <td>{c.notes}</td>
              <td>{c.preferences}</td>
              <td>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c.info_id)}>
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

export default AdminCustomers;
