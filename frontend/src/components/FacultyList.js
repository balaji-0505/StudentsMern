import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, List, ListItem, ListItemText } from '@mui/material';

function FacultyList() {
  const [faculties, setFaculties] = useState([]);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [experience, setExperience] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get(`${API_URL}/faculties`); // Assuming /faculties endpoint
      setFaculties(response.data);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };

  const saveFaculty = async () => {
    try {
      const facultyData = { name, department, experience };

      if (editingId) {
        await axios.put(`${API_URL}/faculties/${editingId}`, facultyData);
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/faculties`, facultyData);
      }

      setName('');
      setDepartment('');
      setExperience('');
      fetchFaculties();
    } catch (error) {
      console.error("Error saving faculty:", error);
    }
  };

  const deleteFaculty = async (id) => {
    try {
      await axios.delete(`${API_URL}/faculties/${id}`);
      fetchFaculties();
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const editFaculty = (faculty) => {
    setEditingId(faculty._id);
    setName(faculty.name);
    setDepartment(faculty.department);
    setExperience(faculty.experience);
  };

  return (
    <Container>
      <h2>Faculty List</h2>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Department"
        variant="outlined"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Experience (Years)"
        type="number"
        variant="outlined"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={saveFaculty}
        style={{ marginTop: '20px' }}
      >
        {editingId ? "Update Faculty" : "Add Faculty"}
      </Button>

      <List>
        {faculties.map(faculty => (
          <ListItem key={faculty._id}>
            <ListItemText
              primary={`${faculty.name} - Department: ${faculty.department}, Experience: ${faculty.experience} years`}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => editFaculty(faculty)}
              style={{ marginLeft: '10px' }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => deleteFaculty(faculty._id)}
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

export default FacultyList;
