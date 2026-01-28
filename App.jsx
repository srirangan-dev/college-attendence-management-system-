import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Teacher from "./Teacher";

function Home() {
  return (
    <div style={container}>
      <h1>Attendance Management System</h1>
      <p>Manage student attendance easily</p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/teacher">
          <button style={btnStyle}>Teacher Login</button>
        </Link>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <div style={navStyle}>
      <Link to="/" style={navLink}>Home</Link>
      <Link to="/teacher" style={navLink}>Teacher</Link>
    </div>
  );
}

function Footer() {
  return (
    <div style={footerStyle}>
      <p>© 2026 Attendance System</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher" element={<Teacher />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;

/* styles */
const container = {
  textAlign: "center",
  padding: "60px",
  fontFamily: "Arial"
};

const btnStyle = {
  margin: "10px",
  padding: "12px 25px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px"
};

const navStyle = {
  padding: "15px",
  backgroundColor: "#222",
  textAlign: "center"
};

const navLink = {
  color: "white",
  margin: "0 15px",
  textDecoration: "none",
  fontSize: "18px"
};

const footerStyle = {
  marginTop: "40px",
  padding: "10px",
  textAlign: "center",
  backgroundColor: "#f1f1f1"
};

