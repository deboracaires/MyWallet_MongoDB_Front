import './styles/App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import SignInPage from './components/signIn/SignInPage.js';
import UserContext from './contexts/UserContext.js';

function App() {
  const [user, setUser] = useState();

  return (
    <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
        <Routes>
          <Route path='/' element={<SignInPage/>} exact/>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;