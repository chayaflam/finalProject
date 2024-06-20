
import React, { createContext, useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useLocation } from 'react-router-dom';

export const UserContext = createContext();

const RootComponent = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [baby, setBaby] = useState();
 
  return (
    <React.StrictMode>
      <PrimeReactProvider>
        <UserContext.Provider value={[user, setUser]} >
          <App />
        </UserContext.Provider>
      </PrimeReactProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<RootComponent />);
