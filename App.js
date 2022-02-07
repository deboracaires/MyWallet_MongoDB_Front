import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';

import SignInPage from './components/signIn/SignInPage.js';

function App() {
    
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<SignInPage/>} exact/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;