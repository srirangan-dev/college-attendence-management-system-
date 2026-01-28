import React, { useState } from "react";
import { Link } from "react-router-dom";

function Teacher() {

  const staffList = [
    {
      name: "Mr. Arjun",
      schedule: [
        { day: "Monday", period: "1", subject: "Mathematics" },
        { day: "Tuesday", period: "2", subject: "Mathematics" },
        { day: "Wednesday", period: "1", subject: "Mathematics" }
      ]
    },
    {
      name: "Mrs. Kavya",
      schedule: [
        { day: "Monday", period: "2", subject: "Physics" },
        { day: "Tuesday", period: "3", subject: "Physics" },
        { day: "Thursday", period: "1", subject: "Physics" }
      ]
    },
    {
      name: "Dr. Suresh",
      schedule: [
        { day: "Wednesday", period: "2", subject: "Chemistry" },
        { day: "Thursday", period: "3", subject: "Chemistry" },
        { day: "Friday", period: "1", subject: "Chemistry" }
      ]
    },
    {
      name: "Ms. Priyanka",
      schedule: [
        { day: "Monday", period: "3", subject: "Computer Science" },
        { day: "Thursday", period: "4", subject: "Computer Science" },
        { day: "Friday", period: "2", subject: "Computer Science" }
      ]
    }
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const periods = ["1", "2", "3", "4", "5"];

  const studentList = {
    Mathematics: ["Rahul", "Anita", "Suresh", "Kiran"],
    Physics: ["Priya", "Arjun", "Kavya", "Vinoth"],
    Chemistry: ["Suresh", "Anita", "Ramesh", "Kiran"],
    "Computer Science": ["Priyanka", "Rahul", "Arjun", "Vinoth"]
  };

  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  const handleStaffChange = (e) => {
    const staff = staffList.find(s => s.name === e.target.value);
    setSelectedStaff(staff);
    setSelectedSubject(null);
    setAttendance({});
    setConfirmed(false);
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setConfirmed(false);
    const init = {};
    studentList[subject].forEach(s => init[s] = "Absent");
    setAttendance(init);
  };

  const markAttendance = (student, status) => {
    setAttendance(prev => ({ ...prev, [student]: status }));
  };

  const presentCount = Object.values(attendance).filter(s => s === "Present").length;
  const absentCount = Object.values(attendance).filter(s => s === "Absent").length;

  return (
    <div style={page}>
      <h2>Staff Timetable</h2>

      {/* Staff Select */}
      <select onChange={handleStaffChange} defaultValue="" style={select}>
        <option value="" disabled>Select Staff</option>
        {staffList.map((s, i) => (
          <option key={i} value={s.name}>{s.name}</option>
        ))}
      </select>

      {/* Timetable */}
      <table border="1" cellPadding="10" style={table}>
        <thead>
          <tr>
            <th>Day</th>
            {periods.map(p => <th key={p}>P{p}</th>)}
          </tr>
        </thead>
        <tbody>
          {days.map(day => (
            <tr key={day}>
              <td><b>{day}</b></td>
              {periods.map(p => {
                const entry = selectedStaff?.schedule.find(
                  s => s.day === day && s.period === p
                );
                return (
                  <td
                    key={p}
                    onClick={() => entry && handleSubjectClick(entry.subject)}
                    style={{
                      background: entry
                        ? entry.subject === selectedSubject
                          ? "#ffd966"
                          : "#d1e7dd"
                        : "#fff",
                      cursor: entry ? "pointer" : "default"
                    }}
                  >
                    {entry ? entry.subject : "-"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Attendance */}
      {selectedSubject && (
        <>
          <h3>Attendance – {selectedSubject}</h3>

          <table border="1" cellPadding="10" style={tableSmall}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {studentList[selectedSubject].map(student => (
                <tr key={student}>
                  <td>{student}</td>
                  <td style={{ color: attendance[student] === "Present" ? "green" : "red" }}>
                    {attendance[student]}
                  </td>
                  <td>
                    <button onClick={() => markAttendance(student, "Present")}>Present</button>
                    <button onClick={() => markAttendance(student, "Absent")} style={{ marginLeft: "5px" }}>
                      Absent
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p><b>Present:</b> {presentCount} | <b>Absent:</b> {absentCount}</p>
        </>
      )}

      <Link to="/">
        <button style={{ marginTop: "20px" }}>Back to Home</button>
      </Link>
    </div>
  );
}

export default Teacher;

/* styles */
const page = {
  textAlign: "center",
  padding: "40px",
  fontFamily: "Arial"
};

const table = {
  margin: "20px auto",
  width: "80%"
};

const tableSmall = {
  margin: "15px auto",
  width: "50%"
};

const select = {
  padding: "8px",
  fontSize: "16px",
  marginBottom: "20px"
};
