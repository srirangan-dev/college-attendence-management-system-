import React, { useState } from "react";
import { Link } from "react-router-dom";


function Teacher() {
  // Staff timetable data
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

  // Student data per subject
  const studentList = {
    "Mathematics": ["Rahul", "Anita", "Suresh", "Kiran"],
    "Physics": ["Priya", "Arjun", "Kavya", "Vinoth"],
    "Chemistry": ["Suresh", "Anita", "Ramesh", "Kiran"],
    "Computer Science": ["Priyanka", "Rahul", "Arjun", "Vinoth"]
  };

  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [attendance, setAttendance] = useState({}); // { studentName: "Present" | "Absent" }

  const handleStaffChange = (e) => {
    const staff = staffList.find(s => s.name === e.target.value);
    setSelectedStaff(staff);
    setSelectedSubject(null);
    setAttendance({});
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    const initialAttendance = {};
    studentList[subject].forEach(student => {
      initialAttendance[student] = "Absent";
    });
    setAttendance(initialAttendance);
  };

  const markAttendance = (student, status) => {
    setAttendance(prev => ({ ...prev, [student]: status }));
  };

  // Confirm attendance and show popup
  const confirmAttendance = () => {
    const presentCount = Object.values(attendance).filter(status => status === "Present").length;
    const absentCount = Object.values(attendance).filter(status => status === "Absent").length;
    alert(`Attendance Confirmed!\nPresent: ${presentCount}\nAbsent: ${absentCount}`);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center" }}>Staff Timetable</h2>

      {/* Staff selection */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label>Select Staff: </label>
        <select onChange={handleStaffChange} defaultValue="">
          <option value="" disabled>Select Staff</option>
          {staffList.map((s, i) => (
            <option key={i} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Timetable */}
      <table border="1" width="80%" align="center" cellPadding="10">
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>Day</th>
            {periods.map((p) => (
              <th key={p}>Period {p}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <td><b>{day}</b></td>
              {periods.map((p) => {
                const entry =
                  selectedStaff &&
                  selectedStaff.schedule.find(s => s.day === day && s.period === p);
                return (
                  <td
                    key={p}
                    style={{
                      backgroundColor: entry ? "#d1e7dd" : "#fff",
                      textAlign: "center",
                      cursor: entry ? "pointer" : "default"
                    }}
                    onClick={() => entry && handleSubjectClick(entry.subject)}
                  >
                    {entry ? entry.subject : "-"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Student Attendance Table */}
      {selectedSubject && (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <h3>Mark Attendance for {selectedSubject}</h3>
          <table border="1" width="50%" align="center" cellPadding="10">
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th>Student Name</th>
                <th>Status</th>
                <th>Mark</th>
              </tr>
            </thead>
            <tbody>
              {studentList[selectedSubject].map((student) => (
                <tr key={student}>
                  <td>{student}</td>
                  <td>{attendance[student]}</td>
                  <td>
                    <button
                      onClick={() => markAttendance(student, "Present")}
                      style={{ marginRight: "5px" }}
                    >
                      Present
                    </button>
                    <button onClick={() => markAttendance(student, "Absent")}>
                      Absent
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={confirmAttendance}
            style={{ marginTop: "15px", padding: "10px 20px" }}
          >
            Confirm Attendance
          </button>
        </div>
      )}

      {/* Back button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/">
          <button style={{ padding: "10px 20px" }}>Back to Home</button>
        </Link>
      </div>
    </div>
  );

}

export default Teacher;
