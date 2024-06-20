import React, { useContext ,useEffect} from 'react';
import { Navigate,useLocation,useNavigate } from 'react-router-dom';
import { UserContext } from './main';

const withAuth = (Component) => {
  const AuthRoute = (props) => {
    const [user,setUser] = useContext(UserContext);
    
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const usernameFromUrl = location.pathname.split('/')[2];

    if (!user || (usernameFromUrl !== storedUser.username)) {
        localStorage.clear()
        setUser(null)
      return <Navigate to="/login" replace />;
    }
    return <Component {...props} />;
  };

  return AuthRoute;
};

export default withAuth;