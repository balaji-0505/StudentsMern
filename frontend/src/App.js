import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import FacultyList from './components/FacultyList';  // Import FacultyList
import StudentList from './components/StudentList';  // Import StudentList

function App() {
  return (
    <Router>
      <MenuBar />
      <Routes>
        <Route path="/faculties" element={<FacultyList />} />
        <Route path="/students" element={<StudentList />} />
      </Routes>
    </Router>
  );
}

export default App;
