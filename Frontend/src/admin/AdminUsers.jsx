import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllUsers, updateUser, deleteUser } from "../services/users";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(userId);
      setSuccessMsg("User deleted successfully.");
      fetchUsers();
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUser(userId, { roletype: newRole });
      setSuccessMsg("Role updated successfully.");
      fetchUsers();
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div
      style={{ paddingBottom: "70px", paddingTop: "20px", fontFamily: "'Gendy', cursive" }}
      className="container"
    >
      <h3 className="mb-4">Manage Users</h3>

      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.email}</td>
              <td>
                <select
                  className="form-select form-select-sm"
                  value={user.roletype}
                  onChange={(e) => handleRoleChange(user.user_id, e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="customer">Customer</option>
                </select>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(user.user_id)}
                >
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

export default AdminUsers;