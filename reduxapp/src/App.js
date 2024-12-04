import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Shop from './Shop';
// import Home from './Home';
// import LinkPage from './LinkPage';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Shop/>
      {/* {/* <Routes> */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/link" element={<LinkPage />} /> */}
      {/* </Routes>  */}
    </BrowserRouter>
  );
};

export default App;
