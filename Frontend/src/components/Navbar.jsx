import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const userRole = localStorage.getItem("userRole");
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  // ✅ إضافة الخط إلى <head> عند أول تحميل
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Gendy:wght@400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // ✅ تسجيل الخروج
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <style>{`
        .navbar-custom {
          background-color: #faf5eb;
          border-bottom: 1px solid #c7bfb7;
          padding-bottom: 8px; 
          font-family: 'Gendy', cursive;
        }

        .navbar-brand {
          margin: 0 1%;
        }

        .navbar-nav {
          display: flex;
          gap: 30px;
          justify-content: flex-start; 
          padding-left: 0;
        }

        .nav-link {
          margin: 0; 
          padding-left: 0;
          padding-right: 0;
        }

        .navbar-custom .nav-link,
        .navbar-custom .navbar-brand {
          color: #3e1f12;
          font-weight: 100;
          font-size: 16px;
        }

        .navbar-custom .btn-signup {
          background-color: #b82f38;
          color: white;
          font-weight: 100;
          padding: 6px 16px;
          border-radius: 0;
          border: none;
        }

        .navbar-custom .btn-signup:hover {
          background-color: #8c2329;
          color: white;
        }

        @media (max-width: 576px) {
          .navbar-custom .nav-link,
          .navbar-custom .navbar-brand {
            font-size: 14px;
          }
          .navbar-custom .btn-signup {
            padding: 5px 12px;
            font-size: 14px;
          }
        }
      `}</style>

      <nav className="navbar navbar-expand navbar-custom px-4">
        <Link className="navbar-brand" to="/">
          <img
            src="/logo.png"
            alt="Resto Logo"
            style={{ height: 30, objectFit: "contain" }}
          />
        </Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link" to="/home">Home</Link>
          <Link className="nav-link" to="/reservation">Reservation</Link>
          <Link className="nav-link" to="/#">Food Menu</Link>
          <Link className="nav-link" to="/#">Events</Link>

          {/* ✅ إظهار اسم المستخدم إذا مسجل */}
          {userName && (
            <span className="nav-link" style={{ fontWeight: "bold" }}>
              Hi, {userName}
            </span>
          )}

          {/* ✅ زر تسجيل الخروج */}
          {userRole ? (
            <button onClick={handleLogout} className="btn btn-signup ms-3">
              Logout
            </button>
          ) : (
            <Link to="/signup" className="btn btn-signup ms-3">
              Sign up
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
