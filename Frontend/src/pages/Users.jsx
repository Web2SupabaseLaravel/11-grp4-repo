import React, { useState } from "react";
import { loginUser } from "../services/users";
import { useNavigate } from "react-router-dom"; 

const Users = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const data = await loginUser({ email, password });

      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userName", data.user.name);

      setSuccessMsg("Login successful!");
      console.log("Response data:", data);

      if (data.role === "admin") {
        navigate("/admin/users");
      } else {
        navigate("/home");
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };


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
       
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: calc(100vh - 56px);
          gap: 90px;
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .phone-img {
          width: 500px;
          position: relative;
          top: -7%;
          user-select: none;
          cursor: pointer;
        }
        .phone-img img {
          width: 100%;
        }
        .login-form {
          max-width: 420px;
          width: 100%;
          color: #3e1f12;
        }
        .login-form h1 {
          font-size: 56px;
          font-weight: 700;
          margin-bottom: 25px;
          letter-spacing: 0.02em;
        }
        .btn-google {
          background-color: #3e1f12;
          color: white;
          width: 100%;
          padding: 10px 0;
          font-weight: 600;
          font-size: 14px;
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          margin-bottom: 15px;
        }
        .btn-google:hover {
          background-color: #2e150c;
        }
        .separator {
          display: flex;
          align-items: center;
          text-align: center;
          font-size: 14px;
          margin: 15px 0 20px;
          color: #3e1f12;
        }
        .separator::before,
        .separator::after {
          content: "";
          flex: 1;
          border-bottom: 1px solid #3e1f12;
          margin: 0 10px;
        }
        .form-label {
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .form-control {
          border: 1px solid #c7bfb7;
          border-radius: 0;
          background-color: transparent;
          font-size: 14px;
          padding: 12px 15px;
          color: #3e1f12;
        }
        .form-control::placeholder {
          color: #6b584f;
        }
        .checkbox-label {
          font-size: 13px;
          color: #3e1f12;
          user-select: none;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
        }
        .forgot-password {
          color: #b82f38;
          font-size: 13px;
          float: right;
          cursor: pointer;
          user-select: none;
        }
        .btn-signin {
          background-color: #b82f38;
          border: none;
          width: 100%;
          padding: 14px 0;
          color: white;
          font-weight: 600;
          font-size: 16px;
          margin-top: 20px;
          cursor: pointer;
          border-radius: 0;
        }
        .btn-signin:hover {
          background-color: #8c2329;
        }
        .signup-text {
          margin-top: 18px;
          font-size: 12px;
          color: #3e1f12;
          text-align: center;
          user-select: none;
        }
        .signup-text a {
          color: #3e1f12;
          font-weight: 600;
          text-decoration: underline;
          cursor: pointer;
        }

        /* RISPONSIVE CSS */
        @media (max-width: 992px) {
          .login-container {
            flex-direction: column;
            height: auto;
            gap: 30px;
            padding: 20px 10px;
          }
          .phone-img {
            width: 300px;
            top: 0;
          }
          .login-form h1 {
            font-size: 42px;
            text-align: center;
          }
          .login-form {
            max-width: 100%;
          }
        }

        @media (max-width: 576px) {
          .phone-img {
            width: 220px;
          }
          .login-form h1 {
            font-size: 32px;
          }
          .btn-google {
            font-size: 12px;
            padding: 8px 0;
          }
          .form-control {
            font-size: 12px;
            padding: 10px 12px;
          }
          .btn-signin {
            font-size: 14px;
            padding: 12px 0;
          }
          .checkbox-label {
            font-size: 11px;
            gap: 4px;
          }
          .forgot-password {
            font-size: 11px;
          }
          .signup-text {
            font-size: 11px;
          }
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

      <main className="login-container">
        <div className="phone-img">
          <img src="/mobile.png" alt="Phone with app" draggable="false" />
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Sign in</h1>

          <button className="btn-google" type="button">
             <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: 20, height: 20 }}
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M21.805 10.023H21V10H12v4h5.735a4.91 4.91 0 01-2.11 3.22v2.664h3.42a8.092 8.092 0 002.485-6.053 8.121 8.121 0 00-.215-3.808z" />
              <path d="M12 22c2.7 0 4.962-.9 6.62-2.44l-3.42-2.665c-.9.6-2.04.96-3.2.96-2.46 0-4.54-1.66-5.28-3.89H3.16v2.44A9.994 9.994 0 0012 22z" />
              <path d="M6.72 14.52a5.98 5.98 0 010-3.04V9.04H3.16v2.44a6 6 0 000 4.88l3.56-2.04z" />
              <path d="M12 6.4c1.46 0 2.77.5 3.8 1.47l2.85-2.84C16.96 3.52 14.7 2.6 12 2.6a9.95 9.95 0 00-8.4 4.96l3.56 2.07A5.68 5.68 0 0112 6.4z" />
            </svg>
            Sign in with Google
          </button>

          <div className="separator">Or, sign in with your email</div>

          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email@gmail.com"
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="form-label" style={{ marginTop: "15px" }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div
            className="d-flex justify-content-between align-items-center"
            style={{ marginTop: "10px" }}
          >
            <label className="checkbox-label" htmlFor="keepSignedIn">
              <input type="checkbox" id="keepSignedIn" />
              Keep me sign in
            </label>
            <span
           className="forgot-password"
           style={{ cursor: "pointer", color: "#007bff", textDecoration: "underline" }}
           onClick={() => navigate("/reset-password")}
              >
            Forgot password?
            </span>

          </div>

          <button type="submit" className="btn-signin" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {errorMsg && <p style={{ color: "red", marginTop: "10px" }}>{errorMsg}</p>}
          {successMsg && <p style={{ color: "green", marginTop: "10px" }}>{successMsg}</p>}

          <p className="signup-text">
            Don’t have an account? <a href="#">Sign up now</a>
          </p>
        </form>
      </main>
    </>
  );
};

export default Users;
