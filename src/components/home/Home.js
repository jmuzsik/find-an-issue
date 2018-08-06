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
        <div className="jumbotron mx-auto my-4 w-50">
          <h1 className="display-4 my-0">
            <strong>Find an Issue</strong>
          </h1>
          <br />
          <p className="lead w-50 m-auto">
            <span className="wave" role="img" aria-label="hand wave emoji">
              👋
            </span>{' '}
            <br />Github does not make it easy to find issues. This is a step
            towards a solution. <br />
            <br />
          </p>
          <p>
            For more info, click the about link{' '}
            <span role="img" aria-label="pointing up emoji">
              ☝️
            </span>.
          </p>
        </div>
        <Table />
      </React.Fragment>
    )
  }
}

export default MainWrapper(Home)
