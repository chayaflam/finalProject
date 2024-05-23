
import React from 'react';
import { useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login'
import Parent from './components/parent/Parent';
import Teacher from './components/teacher/Teacher';
import Baby from './components/baby/Baby';
import ChatRoom from './components/chatRoom/ChatRoom';
//import UserProfile from './components/userProfile/UserProfile';
//import firebase from 'firebase/app';
//import 'firebase/auth';
import { io } from "socket.io-client";

const socket = io('http://localhost:8080');


// const firebaseConfig = {
//   // Your Firebase configuration goes here
// };

//firebase.initializeApp(firebaseConfig);

export default function App() {

  return (
    <><Router>

      <Routes>
        <Route path="/" element={<Baby />} />
        <Route path="/login" element={<Login />} />
        <Route path="/parent/:username" element={<Parent />} />
        <Route path='teacher/:username' element={<Teacher />} />
        <Route path='teacher/:username' element={<Teacher />} >
          <Route path="baby" element={<Baby />} />
        </Route>

        <Route path="/chat" component={<ChatRoom/>} />
      {/* <Route path="/profile" component={UserProfile} /> */}
      </Routes>

    </Router>
    </>
  )
}