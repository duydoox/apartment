import './App.css';
import AuthProvider from './contexts/AuthContext';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './components/Home';
import Auth from './components/auth/Auth';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<Home/>} />
            <Route path='/login' element={<Auth/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
