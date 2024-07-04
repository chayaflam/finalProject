import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Parent from './components/parent/Parent';
import Teacher from './components/teacher/Teacher';
import Child from './components/child/Child.jsx';
import Header from './components/header/Header';
import Class from './components/class/Class';
import withAuth from './withAuth.jsx';
import NoPage from "./components/NoPage/NoPage.jsx";
import { UserContext } from "./main.jsx";
import { Outlet } from "react-router-dom";
import Calendar from "./components/calendar/Calendar.jsx";

export default function App() {

  const ProtectedParent = withAuth(Parent);
  const ProtectedTeacher = withAuth(Teacher);

  const [user, setUser] = useContext(UserContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} >
          <Route path="login" element={<Login />} />
          <Route path="calendar" element={<Calendar />} />
          {user && (
            <Route path="parent/:username" element={<ProtectedParent />} >
              <Route path="child/:childname" element={<Child />} />
            </Route>)}
          {user && (
            <Route path="/teacher/:username" element={<Outlet />} >
            <Route index element={<ProtectedTeacher />} />
            <Route path="chatAll" element={<Class />} />
            <Route path="child/:childname" element={<Child />} />
          </Route>)}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

