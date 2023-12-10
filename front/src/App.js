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
import Teacher from './components/Teacher';
import MySchedule from './components/MySchedule';


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
          <Route path="/docente" element={<Teacher />}/>
          <Route path="/" element={<Login />} />
          <Route path="/schedule" element={<MySchedule />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

