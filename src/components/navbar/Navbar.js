import React from 'react';
import { Link } from 'react-router-dom';

import githubImage from '../../githubmark.png';
import logo from '../../findanissuelogo.png';

import './Navbar.css';

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light border-bottom"
      aria-label="main navigation"
    >
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="logo of application" />
        Find An Issue
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarToggler">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item about active">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item active">
            <a
              className="nav-link"
              href="https://github.com/jMuzsik/find-an-issue"
            >
              <img alt="Github logo" className="invert" src={githubImage} />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
