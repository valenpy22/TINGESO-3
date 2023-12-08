import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import EnterSchedules from './components/EnterSchedules';
import Login from './components/Login';
import Subjects from './components/Subjects';
import Curriculum from './components/Curriculum';
import Record from './components/Record';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Student from './components/Student';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/enterschedules" element={<EnterSchedules />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/historial" element={<Record />}/>
          <Route path="/estudiante" element={<Student />}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;

