import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StudentLogin.css";
import { Link, useLocation, useNavigate } from "react-router-dom";


export function StudentLogin() {
  const location = useLocation();
  const college = location.state?.college || {
    name: "Your College",
    logo: null,
  };
  const navigate = useNavigate();


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="login-box shadow p-4 p-sm-5 bg-white rounded-4" style={{ width: "100%", maxWidth: "400px" }}>
        
        {/* Logo & College Name */}
        <div className="text-center mb-4">
          {college.logo ? (
            <img
              src={college.logo}
              alt={`${college.name} Logo`}
              className="mx-auto mb-3"
              style={{ height: "60px", width: "60px", borderRadius: "50%", objectFit: "contain" }}
            />
          ) : (
            <div
              className="mx-auto mb-3 bg-secondary text-white d-flex align-items-center justify-content-center"
              style={{ height: "60px", width: "60px", borderRadius: "50%" }}
            >
              ?
            </div>
          )}
          <h4 className="fw-bold mb-1">{college.name}</h4>
          <p className="text-muted small">Student Verification</p>
        </div>

        {/* Student ID Input */}
        <div className="mb-3">
          <label htmlFor="studentId" className="form-label fw-semibold">Student ID</label>
          <input
            type="text"
            id="studentId"
            className="form-control"
            placeholder="e.g., 20BCS101"
          />
        </div>

        {/* Password / DOB Input */}
        <div className="mb-4">
          <label htmlFor="password" className="form-label fw-semibold">Password / DOB</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="••••••••"
          />
        </div>

        {/* Login Button */}
        <button className="btn btn-primary w-100 fw-bold mb-3"
         onClick={() => {
    // Temporarily skipping actual login check
    localStorage.setItem("collegeName", college.name);
    localStorage.setItem("sessionId", "SESSION-" + Math.floor(Math.random() * 100000)); // example session
        navigate("/dashboard");
  }}
>
          Verify & Login
        </button>

        {/* Back Link */}
        <div className="text-center">
          <Link to="/" className="text-decoration-none text-primary">
            ← Back to college selection
          </Link>
        </div>
      </div>
    </div>
  );
}
