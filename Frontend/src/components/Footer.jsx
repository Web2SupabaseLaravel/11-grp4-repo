import React from "react";

const Footer = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Gendy:wght@400&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .footer {
          background-color: #ede8de;
          font-family: 'Gendy', cursive;
          color: #3f3f3f;
          padding: 50px 0 30px 0;
        }
        .footer h5 {
          font-weight: 700;
          margin-bottom: 20px;
          color: #3f3f3f;
        }
        .footer p, .footer a, .footer li {
          color: #3f3f3f;
          font-weight: 400;
          font-size: 0.9rem;
          text-decoration: none;
        }
        .footer a:hover {
          text-decoration: underline;
          color: #3f3f3f;
        }
        .footer .social-icons i {
          font-size: 1.4rem;
          margin-right: 15px;
          color: #3f3f3f;
          cursor: pointer;
        }
        .footer .social-icons i:hover {
          color: #000000;
        }
        .footer-bottom {
          border-top: 1px solid #d1cfc5;
          margin-top: 40px;
          padding-top: 15px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #3f3f3f;
          display: flex;
          justify-content: center;
          gap: 25px;
          flex-wrap: wrap;
        }
      `}</style>

      <footer className="footer">
        <div className="container">
          <div className="row text-start">
            <div className="col-md-3 mb-4">
              <h5>About Us</h5>
              <p>
                Our platform makes restaurant reservations easy and efficient for customers and staff.
                <br />
                Book your table in seconds and enjoy a seamless dining experience.
              </p>
            </div>
            <div className="col-md-3 mb-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div className="col-md-3 mb-4">
              <h5>Contact Information</h5>
              <p>Email: <a href="mailto:support@reservationsystem.com">support@reservationsystem.com</a></p>
              <p>Phone: +1 (234) 567–890</p>
              <p>Location: 123 Foodie Lane, Dine City, USA</p>
            </div>
            <div className="col-md-3 mb-4">
              <h5>Follow Us</h5>
              <div className="social-icons d-flex">
                <i className="bi bi-x-lg" title="X (Twitter alternative)"></i>
                <i className="bi bi-instagram" title="Instagram"></i>
                <i className="bi bi-youtube" title="YouTube"></i>
                <i className="bi bi-tiktok" title="TikTok"></i>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div>© 2025 Restaurant Reservation System. All rights reserved.</div>
            <a href="#terms">Terms & Conditions</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#no-sell">Do not sell my personal information</a>
            <a href="#cookies">Cookies</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
