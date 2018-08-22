import React from 'react';

import './MainWrapper.css';
import Navbar from '../navbar/Navbar';

const MainWrapper = (Component) => {
  return props => {
    return (
      <div className="MainWrapper">
        <Navbar {...props} />
        <div className="main-content">
          <Component {...props} />
        </div>
      </div>
    );
  };
};

export default MainWrapper;