import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './component/Navbar';
import Shop from './Shop';
// import Home from './Home';
// import LinkPage from './LinkPage';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Shop/>
    </BrowserRouter>
  );
};

export default App;
