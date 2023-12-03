import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import EnterSchedules from './components/EnterSchedules';
import Header from './components/Header';
import Login from './components/Login';
import Subjects from './components/Subjects';
import Curriculum from './components/Curriculum';
import Record from './components/Record';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/enterschedules" element={<EnterSchedules />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/historial" element={<Record />}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;

