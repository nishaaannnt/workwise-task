import React, { useEffect } from 'react';
import AppRouter from './router/Router'; 
import { setAuthToken } from './service/services';


function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);
  
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
