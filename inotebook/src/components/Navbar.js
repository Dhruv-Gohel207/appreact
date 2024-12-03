import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    let location = useLocation();
    
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"?"active": ""}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
               <Link className={`nav-link ${location.pathname==="/about"?"active": ""}`} to="/about">About</Link>
            </li>
          </ul>
          <div className="d-flex" style={{ marginLeft: "auto" }}>
            <Link className="btn btn-primary mx-1" to="/login">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup">Sign-Up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
