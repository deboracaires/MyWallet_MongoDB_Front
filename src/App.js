import './styles/App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import SignInPage from './components/signIn/SignInPage.js';
import UserContext from './contexts/UserContext.js';
import SignUpPage from './components/signUp/SignUpPage';

function App() {
  const [user, setUser] = useState();

  return (
    <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
        <Routes>
          <Route path='/' element={<SignInPage/>} exact/>
          <Route path='/sign-up' element={<SignUpPage/>} exact/>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;