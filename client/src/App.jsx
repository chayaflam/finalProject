import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login'
import Parent from './components/parent/Parent';
import Teacher from './components/teacher/Teacher';
import Baby from './components/baby/Baby';
import Header from './components/header/Header';

export default function App() {
  return (
    <><Router>
      <Routes>
        <Route path="/" element={<Header />} >
          <Route path="/login" element={<Login />} />
          <Route path="/parent/:username" element={<Parent />} >
            <Route path="baby/:babyname" element={<Baby />} />
          </Route>
          <Route path='teacher/:username' element={<Teacher />} >
            <Route path="baby/:babyname" element={<Baby />} />
          </Route>
        </Route>
      </Routes>
    </Router>
    </>
  )
}

//https://www.freecodecamp.org/news/build-a-realtime-chat-app-with-react-express-socketio-and-harperdb/