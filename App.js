import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade: '',
    email: '',
    extracurriculars: '',
    achievements: '',
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Transform extracurriculars and achievements to arrays
      const newStudent = {
        ...formData,
        extracurriculars: formData.extracurriculars.split(',').map((item) => item.trim()),
        achievements: formData.achievements.split(',').map((item) => item.trim()),
      };

      await axios.post('http://localhost:5000/api/students', newStudent);
      setFormData({ name: '', age: '', grade: '', email: '', extracurriculars: '', achievements: '' }); // Reset form
      fetchStudents(); // Refresh list
    } catch (error) {
      console.error('Error adding student:', error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Tracking System</h1>
        <form onSubmit={handleSubmit} className="student-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="grade"
            placeholder="Grade"
            value={formData.grade}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="extracurriculars"
            placeholder="Extracurriculars (comma-separated)"
            value={formData.extracurriculars}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="achievements"
            placeholder="Achievements (comma-separated)"
            value={formData.achievements}
            onChange={handleInputChange}
          />
          <button type="submit">Add Student</button>
        </form>

        <div className="student-list">
          {students.length > 0 ? (
            students.map((student) => (
              <div key={student._id} className="student-card">
                <h2>{student.name}</h2>
                <p>Age: {student.age}</p>
                <p>Grade: {student.grade}</p>
                <p>Email: {student.email}</p>
