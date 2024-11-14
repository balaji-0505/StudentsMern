import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, List, ListItem, ListItemText } from '@mui/material';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const saveStudent = async () => {
    try {
      const studentData = { name, age, grade };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, studentData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, studentData);
      }

      setName('');
      setAge('');
      setGrade('');
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setAge(student.age);
    setGrade(student.grade);
  };

  return (
    <Container>
      <h2>Student List</h2>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Age"
        type="number"
        variant="outlined"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Grade"
        variant="outlined"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={saveStudent}
        style={{ marginTop: '20px' }}
      >
        {editingId ? "Update Student" : "Add Student"}
      </Button>

      <List>
        {students.map(student => (
          <ListItem key={student._id}>
            <ListItemText
              primary={`${student.name} - Age: ${student.age}, Grade: ${student.grade}`}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => editStudent(student)}
              style={{ marginLeft: '10px' }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => deleteStudent(student._id)}
              style={{ marginLeft: '10px' }}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default StudentList;
