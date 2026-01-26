import axios from "axios";

const API_URL = "http://localhost:5000";

export const getTeachers = () => axios.get(`${API_URL}/teachers`);
export const submitAttendance = (student_id, subject, date, status) =>
  axios.post(`${API_URL}/attendance`, { student_id, subject, date, status });
