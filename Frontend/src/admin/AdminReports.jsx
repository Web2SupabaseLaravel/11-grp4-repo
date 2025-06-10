import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import { useEffect, useState } from 'react';
import { fetchReports ,deleteReport ,createReport} from '../services/admin';
import "bootstrap/dist/css/bootstrap.min.css";

import {
  FaChartLine,
  FaUtensils,
  FaUsers,
  FaBan,
} from "react-icons/fa";

function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  const handleDelete = async (id) => {
  if (!window.confirm("هل أنت متأكد أنك تريد حذف هذا التقرير؟")) return;

  try {
    await deleteReport(id);
  
    const res = await fetchReports(); 
    setReports(res.reports || res.data?.reports || []); 
  } catch (error) {
    console.error("❌ خطأ في حذف التقرير:", error);
  }
};
   const cardStyle = {
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    padding: "20px",
    backgroundColor: "#f9f5ec",
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

  

  const reportOptions = [
    'reservation_volume',
    'today_reservations',
    'table_utilization',
    'weekly_reservations',
    'reservation_by_time',
    'empty_tables',
    'user_role_active_report',
    'cancelled_reservations_by_day',
    'cancelled_reservations_total',
    'Confirmed_reservations_total',
    'cancelled_reservations_today',
  ];
useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await fetchReports();
        setReports(data.reports); 
      } catch (error) {
        console.error("خطأ أثناء جلب التقارير:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);
  if (loading) return <p>Loading...</p>;
 const handleCreate = async (type) => {
  if (!type) return;

  const payload = {
    report_type: type
  };

  try {
  console.log(" إرسال البيانات إلى API...");
  await createReport(payload);
  console.log(" تم إنشاء التقرير");

  const res = await fetchReports();
  console.log(" تم جلب التقارير:", res.data);

  setReports(res.data.reports);
  setSelectedType('');
  setShowOptions(false);
} catch (error) {
  console.error(" خطأ:", error);
}
};

  

  return (
    
      

     
    
      <div
      className="container py-4"
      style={{ paddingBottom: "70px", backgroundColor: "#ffffff" }}
    >
      <h3 className="mb-4" style={headingStyle}>
        Admin Dashboard & Reports
      </h3>
      <div className="row g-4">
       {/* زر عرض الخيارات */}
      <div>
      <button onClick={() => setShowOptions(!showOptions)} style={{ marginTop: '10px',marginBottom:"10px" }} className="btn btn-success">
        {showOptions ? 'Hidden Option ' :'Add new Report '}
      </button></div>

      {/* قائمة الخيارات */}
      {showOptions && (
        <div style={{ marginTop: '0px' }} className="col-md-6">
          
          <select className="form-select form-select-sm" aria-label=".form-select-sm example"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="" selected>Choce Report Type </option>
            {reportOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button onClick={() => handleCreate(selectedType)} disabled={!selectedType} className="btn btn-success"style={{ marginTop: '10px',marginBottom:"10px" }}>
    Creat
  </button>
        </div>
      )}</div>

      <div className="row g-4">
        {/* Reservation Volume */}
     
        <div className="col-md-6" >
  <div style={cardStyle}>
    <h5 style={sectionTitle}>
      <FaChartLine /> Reservation Volume
    </h5>
    <p className="text-muted">
      Track number of reservations by day/week/month.
    </p>
    <div className="bg-light border rounded p-3 text-center text-muted">
      {Array.isArray(reports) && reports.length > 0 ? (
        reports
          .filter((report) => report.report_type === 'reservation_volume' ||  report.report_type=='today_reservations'||report.report_type=='weekly_reservations'||report.report_type=='reservation_by_time')
          .map((report) => (
           
            <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Report Type</th>
            <th>Content</th>
           
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{report.report_type}</td>
            <td>{report.content}</td>
          
            <td>
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(report.report_id)}>Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>
          ))
      ) : (
        <li>No reports found.</li>
      )}
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
              {Array.isArray(reports) && reports.length > 0 ? (
        reports
          .filter((report) => report.report_type ==='table_utilization' ||  report.report_type=='empty_tables')
          .map((report) => (
           
            <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Report Type</th>
            <th>Content</th>
           
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{report.report_type}</td>
            <td>{report.content}</td>
          
            <td>
              <button className="btn btn-sm btn-outline-danger">Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>
          ))
      ) : (
        <li>No reports found.</li>
      )}
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
              Analyze customer Role.
            </p>
            <div className="bg-light border rounded p-3 text-center text-muted">
               {Array.isArray(reports) && reports.length > 0 ? (
        reports
          .filter((report) => report.report_type ==='user_role_active_report' )
          .map((report) => (
           
            <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Report Type</th>
            <th>Content</th>
           
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{report.report_type}</td>
            <td>{report.content}</td>
          
            <td>
              <button className="btn btn-sm btn-outline-danger">Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>
          ))
      ) : (
        <li>No reports found.</li>
      )}
            </div>
          </div>
        </div>

        {/* Cancellations & No-Shows   */}
        <div className="col-md-6">
          <div style={cardStyle}>
            <h5 style={sectionTitle}>
              <FaBan /> Cancellations & No-Shows
            </h5>
            <p className="text-muted">
              Measure cancellation and no-show trends.
            </p>
            <div className="bg-light border rounded p-3 text-center text-muted">
              {Array.isArray(reports) && reports.length > 0 ? (
        reports
          .filter((report) => report.report_type ==='cancelled_reservations_by_day'||  report.report_type=='cancelled_reservations_total' ||  report.report_type== 'Confirmed_reservations_total' ||  report.report_type=='cancelled_reservations_today')
          .map((report) => (
           
            <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Report Type</th>
            <th>Content</th>
           
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{report.report_type}</td>
            <td>{report.content}</td>
          
            <td>
              <button className="btn btn-sm btn-outline-danger">Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>
          ))
      ) : (
        <li>No reports found.</li>
      )}
            </div>
          </div>
        </div>
      </div>

      <AdminNavbar />
    </div>);
   
};

export default ReportsPage;