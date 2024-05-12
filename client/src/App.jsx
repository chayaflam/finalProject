
import React from 'react';
import './App.css'
import { BrowserRouter as  Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login'
import Parent from './components/parent/Parent';
import Teacher from './components/teacher/Teacher';


export default function App() {

  return (
    <><Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/parent" element={<Parent />} />
          <Route path="/teacher" element={<Teacher />} />
        </Routes>
      </div>
    </Router>
    </>
  )
}