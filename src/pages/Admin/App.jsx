import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Admin from './pages/mainPageAdmin/Admin';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/recording" element={<Recording />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
