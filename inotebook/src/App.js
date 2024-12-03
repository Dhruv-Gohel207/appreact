import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';

import './App.css';
import Login from './components/Login';
import SignUp from './components/Signup';
import Alert from './components/Alert';

const App = () => {

  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert(null); // Clear alert after 3 seconds
    }, 3000);
  };
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
          <Routes>
           
            <Route path="/" element={<Home showAlert={showAlert}/>} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login showAlert={showAlert}/>} />
            <Route path="/signup" element={<SignUp showAlert={showAlert}/>} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
};

export default App;
