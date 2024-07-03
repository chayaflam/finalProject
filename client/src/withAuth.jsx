import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from './main';
import Cookies from 'js-cookie';

const withAuth = (Component) => {
  const AuthRoute = (props) => {
    const [user, setUser] = useContext(UserContext);
    const userFromCookie = JSON.parse(Cookies.get('user'));
    const token = Cookies.get('token');
    console.log(user, token);
    const usernameFromUrl = location.pathname.split('/')[2];
    if (!user || (usernameFromUrl !== userFromCookie.username)) {
      const cookies = Object.keys(Cookies.get());
      cookies.forEach(cookie => {
        Cookies.remove(cookie);
      });
      setUser(null)
      return <Navigate to="/login" replace />;
    }
    return <Component {...props} />;
  };

  return AuthRoute;
};
export default withAuth;