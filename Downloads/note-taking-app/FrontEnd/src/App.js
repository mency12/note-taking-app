import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import { HomePage } from './components/HomePage';
import TextEditor from './components/TextEditor';
import AllNotes from './components/AllNotes';
import OTPVerification from './components/OTPVerification';

function App() {
  return (
    <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/texteditor" element={<TextEditor />} />
        <Route path="/allnotes" element={<AllNotes />} />
        <Route path="/otpValidate" element={<OTPVerification />} />
      </Routes>
    </Router>
     <ToastContainer /> 
  </React.StrictMode>
  );
}

export default App;
