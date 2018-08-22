import React, { Component } from 'react';

import MainWrapper from '../reuseable/MainWrapper';
import asyncComponent from '../reuseable/AsyncComponent';

import './Home.css';
import './Loading.css';

const AsyncTable = asyncComponent(() => import('../table/Table.js'));

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    // Prevent table from suddenly flashing on the screen (usually takes around a second and the flash is discomforting)
    setTimeout(() => this.setState({ loading: false }), 2500);
  }

  render() {
    return (
      <React.Fragment>
        <div className="intro-container">
          <div className="intro">
            <h1 className="intro-h1">Find an Issue</h1>
            <p className="intro-p lead w-50">
              Github does not make it easy to find issues. This is a step
              towards a solution.
              <br />
            </p>
            <p className="intro-p intro-p-second">
              For more info, click the about link{' '}
              <span role="img" aria-label="pointing up emoji">
                ☝️
              </span>
              .
            </p>
          </div>
        </div>
        {this.state.loading ? (
          <div className="loading-container">
            <div className="lds-ring">
              <div />
              <div />
            </div>
            <div>Table Loading...</div>
          </div>
        ) : (
          <AsyncTable />
        )}
      </React.Fragment>
    );
  }
}

export default MainWrapper(Home);
