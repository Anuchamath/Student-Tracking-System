import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', age: '', grade: '', email: '', extracurriculars: '', achievements: '' });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get('http://localhost:5000/api/students');
    setStudents(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/students', formData);
    fetchStudents();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Tracking System</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={handleInputChange} required />
          <input type="number" name="age" placeholder="Age" onChange={handleInputChange} required />
          <input type="text" name="grade" placeholder="Grade" onChange={handleInputChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
          <input type="text" name="extracurriculars" placeholder="Extracurriculars (comma-separated)" onChange={handleInputChange} />
          <input type="text" name="achievements" placeholder="Achievements (comma-separated)" onChange={handleInputChange} />
          <button type="submit">Add Student</button>
        </form>

        <div className="student-list">
          {students.map((student) => (
            <div key={student._id} className="student-card">
              <h2>{student.name}</h2>
              <p>Age: {student.age}</p>
              <p>Grade: {student.grade}</p>
              <p>Email: {student.email}</p>
              <p>Extracurriculars: {student.extracurriculars.join(', ')}</p>
              <p>Achievements: {student.achievements.join(', ')}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;