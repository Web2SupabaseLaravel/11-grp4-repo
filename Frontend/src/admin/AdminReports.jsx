import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaChartLine,
  FaUtensils,
  FaUsers,
  FaBan,
} from "react-icons/fa";

const AdminReports = () => {
  const cardStyle = {
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    padding: "20px",
    backgroundColor: "#fff",
    fontFamily: "'Helvetica', sans-serif",
  };

  const headingStyle = {
    fontFamily: "'Gendy', cursive",
    fontWeight: 700,
    fontSize: "24px",
  };

  const sectionTitle = {
    fontFamily: "'Gendy', cursive",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  return (
    <div
      className="container py-4"
      style={{ paddingBottom: "70px", backgroundColor: "#faf5eb" }}
    >
      <h3 className="mb-4" style={headingStyle}>
        Admin Dashboard & Reports
      </h3>

      <div className="row g-4">
        {/* Reservation Volume */}
        <div className="col-md-6">
          <div style={cardStyle}>
            <h5 style={sectionTitle}>
              <FaChartLine /> Reservation Volume
            </h5>
            <p className="text-muted">
              Track number of reservations by day/week/month.
            </p>
            <div className="bg-light border rounded p-3 text-center text-muted">
              [Chart: Reservations Over Time]
            </div>
          </div>
        </div>

        {/* Table Utilization */}
        <div className="col-md-6">
          <div style={cardStyle}>
            <h5 style={sectionTitle}>
              <FaUtensils /> Table Utilization
            </h5>
            <p className="text-muted">
              See occupancy rate and average seating time.
            </p>
            <div className="bg-light border rounded p-3 text-center text-muted">
              [Chart: Table Usage]
            </div>
          </div>
        </div>

        {/* Customer Demographics */}
        <div className="col-md-6">
          <div style={cardStyle}>
            <h5 style={sectionTitle}>
              <FaUsers /> Customer Demographics
            </h5>
            <p className="text-muted">
              Analyze customer location and age range.
            </p>
            <div className="bg-light border rounded p-3 text-center text-muted">
              [Chart: Age & Location Distribution]
            </div>
          </div>
        </div>

        {/* Cancellations & No-Shows */}
        <div className="col-md-6">
          <div style={cardStyle}>
            <h5 style={sectionTitle}>
              <FaBan /> Cancellations & No-Shows
            </h5>
            <p className="text-muted">
              Measure cancellation and no-show trends.
            </p>
            <div className="bg-light border rounded p-3 text-center text-muted">
              [Chart: Cancellation Rates]
            </div>
          </div>
        </div>
      </div>

      <AdminNavbar />
    </div>
  );
};

export default AdminReports;
