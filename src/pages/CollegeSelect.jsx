import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CollegeSelect.css";
import { useNavigate } from "react-router-dom";

export function CollegeSelect() {
  const navigate = useNavigate();
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");

  useEffect(() => {
    // Fetch college list from public folder
    fetch("/colleges.json")
      .then((res) => res.json())
      .then((data) => setColleges(data))
      .catch((err) => console.error("Failed to fetch colleges:", err));
  }, []);

  const handleContinue = () => {
    if (selectedCollege) {
      const collegeObj = colleges.find((c) => c.name === selectedCollege);
      navigate("/login", { state: { college: collegeObj } });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="college-box shadow-lg p-5 custom-hover">
        <h1 className="box-heading text-center">Select Your College</h1>

        <select
          className="form-select mb-4"
          value={selectedCollege}
          onChange={(e) => setSelectedCollege(e.target.value)}
        >
          <option value="">Select a College</option>
          {colleges.map((college, idx) => (
            <option key={idx} value={college.name}>
              {college.name}
            </option>
          ))}
        </select>

        <button
          className="btn custom-btn h-30 w-100"
          onClick={handleContinue}
          disabled={!selectedCollege}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
