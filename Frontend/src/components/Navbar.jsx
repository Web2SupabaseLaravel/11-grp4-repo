import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {

    
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Gendy:wght@400&display=swap"
        rel="stylesheet"
      />

      <style>{`
        body {
          font-family: 'Gendy', cursive;
          background-color: #faf5eb;
          margin: 0;
          padding: 0;
        }
        .navbar-custom {
          background-color: #faf5eb;
          border-bottom: 1px solid #c7bfb7;
          padding-bottom: 8px; 
        }

        .navbar-brand{
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
        

        /* RISPONSIVE CSS */
         

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
          <a className="nav-link" href="#">
            About Us
          </a>
          <a className="nav-link" href="#">
            Food Menu
          </a>
          <a className="nav-link" href="#">
            Reservation
          </a>
          <a className="nav-link" href="#">
            Events
          </a>
        <Link to="/signup" className="btn btn-signup ms-3">Sign up</Link>
        </div>
      </nav>

     
    </>
  );
};

export default Navbar;
