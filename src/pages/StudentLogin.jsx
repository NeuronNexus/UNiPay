import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom"; // Import Link
import "./StudentLogin.css"; // Using the updated CSS file

export function StudentLogin() {
  const location = useLocation();
  const navigate = useNavigate();

  // Dummy college name (can be passed via location.state if coming from a college selection page)
  const college = location.state?.college || {
    name: "IIT Patna", // Default college name
    logo: "https://placehold.co/60x60/a855f7/ffffff?text=IIT" // Dummy logo URL
  };

  // State for selected user role
  const [userRole, setUserRole] = useState(""); // 'student', 'admin', 'vendor'

  // States for login form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Determine login subtitle based on selected role
  const loginSubtitle = userRole ? `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Login` : "Select your role";

  // Handle role selection
  const handleRoleSelect = (role) => {
    setUserRole(role);
    setEmail(""); // Clear inputs on role change
    setPassword("");
    setError("");
  };

  // Handle login attempt
  const handleLogin = () => {
    setError(""); // Clear previous errors

    // Dummy validation: just check if email and password are not empty
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    // Simulate login and redirect based on role
    // In a real application, you'd perform actual authentication here
    switch (userRole) {
      case "student":
        localStorage.setItem("collegeName", college.name);
        localStorage.setItem("sessionId", "SESSION-" + Math.floor(Math.random() * 100000));
        navigate("/dashboard");
        break;
      case "admin":
        navigate("/admin");
        break;
      case "vendor":
        navigate("/vendor");
        break;
      default:
        setError("Please select a valid role.");
    }
  };

  // Check if login button should be disabled
  const isLoginDisabled = !email.trim() || !password.trim();

  return (
    <div className="login-page-container">
      {/* Role Selection Box */}
      {!userRole && (
        <div className="role-selection-box card-shadow">
          <div className="text-center mb-4">
            {college.logo ? (
              <img src={college.logo} alt={`${college.name} Logo`} className="logo-img" />
            ) : (
              <div className="logo-placeholder">?</div>
            )}
            <h4 className="college-name">{college.name}</h4>
            <p className="role-prompt">Who are you?</p>
          </div>
          <div className="role-options">
            <button className="role-button" onClick={() => handleRoleSelect("student")}>
              Student
            </button>
            <button className="role-button" onClick={() => handleRoleSelect("admin")}>
              Admin
            </button>
            <button className="role-button" onClick={() => handleRoleSelect("vendor")}>
              Vendor
            </button>
          </div>
        </div>
      )}

      {/* Login Box (conditionally rendered after role selection) */}
      {userRole && (
        <div className="login-box card-shadow">
          <div className="text-center mb-4">
            {college.logo ? (
              <img src={college.logo} alt={`${college.name} Logo`} className="logo-img" />
            ) : (
              <div className="logo-placeholder">?</div>
            )}
            <h4 className="college-name">{college.name}</h4>
            <p className="login-subtitle">{loginSubtitle}</p>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="error-message-box">{error}</div>
          )}

          <button
            className="login-button"
            onClick={handleLogin}
            disabled={isLoginDisabled}
          >
            Login
          </button>

          <div className="login-links-container">
            <Link to="/" className="back-link">
              ← Back
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
