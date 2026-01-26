const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",      // your MySQL username
  password: "",      // your MySQL password
  database: "college_attendance"
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    return;
  }
  console.log("Connected to MySQL database!");
});

// Get all teachers
app.get("/teachers", (req, res) => {
  db.query("SELECT * FROM teachers", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

// Get timetable for a teacher
app.get("/timetable/:teacherId", (req, res) => {
  const teacherId = req.params.teacherId;
  db.query(
    "SELECT * FROM timetable WHERE teacher_id = ?",
    [teacherId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database query failed" });
      }
      res.json(results);
    }
  );
});

// Get students for a subject
app.get("/students/:subject", (req, res) => {
  const subject = req.params.subject;
  db.query("SELECT * FROM students", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

// Post attendance
app.post("/attendance", (req, res) => {
  const { student_id, subject, date, status } = req.body;

  if (!student_id || !subject || !date || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.query(
    "INSERT INTO attendance (student_id, subject, date, status) VALUES (?, ?, ?, ?)",
    [student_id, subject, date, status],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to record attendance" });
      }
      res.json({ message: "Attendance recorded!" });
    }
  );
});


// Add a new teacher
app.post("/teachers", (req, res) => {
  const { name, subject } = req.body;
  if (!name || !subject) return res.status(400).json({ error: "All fields required" });

  db.query(
    "INSERT INTO teachers (name, subject) VALUES (?, ?)",
    [name, subject],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Failed to add teacher" });
      res.json({ message: "Teacher added!" });
    }
  );
});

// Add a new student
app.post("/students", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });

  db.query(
    "INSERT INTO students (name) VALUES (?)",
    [name],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Failed to add student" });
      res.json({ message: "Student added!" });
    }
  );
});

// Add a timetable entry
app.post("/timetable", (req, res) => {
  const { teacher_id, day, period, subject } = req.body;
  if (!teacher_id || !day || !period || !subject)
    return res.status(400).json({ error: "All fields required" });

  db.query(
    "INSERT INTO timetable (teacher_id, day, period, subject) VALUES (?, ?, ?, ?)",
    [teacher_id, day, period, subject],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Failed to add timetable entry" });
      res.json({ message: "Timetable entry added!" });
    }
  );
});


// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
