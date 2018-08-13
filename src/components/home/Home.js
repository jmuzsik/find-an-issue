import React, { Component } from 'react'

import Table from '../table/Table'

import './Home.css'
import MainWrapper from '../reuseable/MainWrapper'

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    evt.preventDefault()
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
        <Table />
      </React.Fragment>
    )
  }
}

export default MainWrapper(Home)
