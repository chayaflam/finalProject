import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/login/Login';
import Parent from './components/parent/Parent';
import Teacher from './components/teacher/Teacher';
import Baby from './components/baby/Baby';
import Header from './components/header/Header';
import Class from './components/class/Class';
import withAuth from './withAuth.jsx';
import NoPage from "./components/NoPage/NoPage.jsx";
import HomePage from './components/homePage/HomePage.jsx';
import { UserContext } from "./main.jsx";
import { Outlet } from "react-router-dom";
import Calendar from "./components/calendar/Calendar.jsx";
const ProtectedParent = withAuth(Parent);
const ProtectedTeacher = withAuth(Teacher);

export default function App() {

  const [user, setUser] = useContext(UserContext)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} >
          <Route path="login" element={<Login />} />
          <Route path="calendar" element={<Calendar />} />
          {user && (
            <Route path="parent/:username" element={<ProtectedParent />} >
              <Route path="baby/:babyname" element={<Baby />} />
            </Route>)}
          {user && (
            <Route path="/teacher/:username" element={<Outlet />} >
            <Route index element={<ProtectedTeacher />} />
            <Route path="chatAll" element={<Class />} />
            <Route path="baby/:babyname" element={<Baby />} />
          </Route>)}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}




// //-----------------------------------------------------------------------------------------------------------------------------
// import React, { useContext, useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import Login from './components/login/Login';
// import Parent from './components/parent/Parent';
// import Teacher from './components/teacher/Teacher';
// import Baby from './components/baby/Baby';
// import Header from './components/header/Header';
// import Class from './components/class/Class';
// import withAuth from './withAuth.jsx';
// import NoPage from "./components/NoPage/NoPage.jsx";
// import HomePage from './components/homePage/HomePage.jsx';
// import { UserContext } from "./main.jsx";
// import { Outlet } from "react-router-dom";
// import Calendar from "./components/calendar/Calendar.jsx";
// const ProtectedParent = withAuth(Parent);
// const ProtectedTeacher = withAuth(Teacher);

// export default function App() {

//   const [user, setUser] = useContext(UserContext)

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Header />} >
//           <Route path="login" element={<Login />} />
//           <Route path="calendar" element={<Calendar />} />
//           {user && (
//             <Route path="parent/:username" element={<ProtectedParent />} >
//               <Route path="baby/:babyname" element={<Baby />} />
//             </Route>)}
//           {user && (
//             <Route path="/teacher/:username" element={<Outlet />} >
//             <Route index element={<ProtectedTeacher />} />
//             <Route path="chatAll" element={<Class />} />
//             <Route path="baby/:babyname" element={<Baby />} />
//           </Route>)}
//           <Route path="*" element={<NoPage />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }




// //-----------------------------------------------------------------------------------------------------------------------------


// //-----------------------------------------------------------------------------------------------------------------------------


// //-----------------------------------------------------------------------------------------------------------------------------
