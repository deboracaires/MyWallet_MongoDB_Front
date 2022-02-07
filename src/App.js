import './styles/App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import SignInPage from './components/signIn/SignInPage.js';
import UserContext from './contexts/UserContext.js';
import SignUpPage from './components/signUp/SignUpPage.js';
import PrincipalPage from './components/principal/PrincipalPage.js';
import NewIncomePage from './components/registration/NewIncomePage.js';
import NewOutcomePage from './components/registration/NewOutcomePage.js';
import EditTransactionContext from './contexts/EditTransactionContext.js';
import EditIncomePage from './components/registration/EditIncomePage.js';
import EditOutcomePage from './components/registration/EditOutcomePage.js';

function App() {
  const [user, setUser] = useState();
  const [transaction, setTransaction] = useState();

  return (
    <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
        <EditTransactionContext.Provider value = {{transaction, setTransaction}}>
          <Routes>
            <Route path='/' element={<SignInPage/>} exact/>
            <Route path='/sign-up' element={<SignUpPage/>} exact/>
            <Route path='/principal' element={<PrincipalPage/>} exact/>
            <Route path='/new-income' element={<NewIncomePage/>} exact/>
            <Route path='/new-outcome' element={<NewOutcomePage/>} exact/>
            <Route path='/edit-income' element={<EditIncomePage/>} exact/>
            <Route path='/edit-outcome' element={<EditOutcomePage/>} exact/>
          </Routes>
        </EditTransactionContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;