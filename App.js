import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Teacher from "./Teacher";

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Arial" }}>
      <h1>Attendance Management System</h1>

      <div style={{ marginTop: "30px" }}>
        <Link to="/teacher">
          <button style={btnStyle}>Teacher Login</button>
        </Link>
      </div>
    </div>
  );
}

const btnStyle = {
  margin: "10px",
  padding: "12px 20px",
  fontSize: "16px",
  cursor: "pointer"
};

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/teacher" element={<Teacher />} />
      </Routes>
    </Router>
  );
}

export default App;
