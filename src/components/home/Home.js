import React, { Component } from 'react';

import MainWrapper from '../reuseable/MainWrapper';
import asyncComponent from '../reuseable/AsyncComponent';

import './Home.css';
import './Loading.css';
import Options from '../options/Options';

const AsyncTable = asyncComponent(() => import('../table/Table.js'));

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      equalityType: 'like'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    // Prevent table from suddenly flashing on the screen (usually takes around a second and the flash is discomforting)
    setTimeout(() => this.setState({ loading: false }), 1500);
  }

  handleInputChange(value) {
    let equalityType;
    if(value === true) {
      equalityType = 'eq'
    } else {
      equalityType = 'like'
    }
    this.setState({
      checked: value,
      equalityType
    });
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
        <Options handleInputChange={this.handleInputChange} />
        {this.state.loading ? (
          <div className="loading-container">
            <div className="lds-ring">
              <div />
              <div />
            </div>
            <div>Table Loading...</div>
          </div>
        ) : (
          <AsyncTable equalityType={this.state.equalityType}/>
        )}
      </React.Fragment>
    );
  }
}

export default MainWrapper(Home);
