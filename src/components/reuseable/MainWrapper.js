import React from 'react';

import './MainWrapper.css';
import Navbar from '../navbar/Navbar';

const MainWrapper = Component => {
  return class Layout extends React.Component {
    render() {
      return (
        <div className="MainWrapper">
          <Navbar {...this.props} />
          <div className="main-content">
            <Component {...this.props} />
          </div>
        </div>
      );
    }
  };
};

export default MainWrapper;
