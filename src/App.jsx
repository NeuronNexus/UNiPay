import { HashRouter as Router, Routes, Route } from "react-router-dom";
import {CollegeSelect} from "./pages/CollegeSelect";
import {StudentLogin} from "./pages/StudentLogin";
  import {StudentDashboard} from "./pages/StudentDashboard";
import {AdminDashboard} from "./pages/AdminDashboard";
import {GrievancePage} from "./pages/GrievencePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CollegeSelect />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/grievance" element={<GrievancePage />} />
      </Routes>
    </Router>
  );
}

export default App;
