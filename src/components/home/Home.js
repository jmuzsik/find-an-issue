import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
        <div className="jumbotron w-75 mx-auto my-4">
          <h1 className="display-4">
            <strong>Find an Issue</strong>
          </h1>
          <p className="lead w-75 m-auto">
            👋 <br />Github does not make it easy to find issues. This is a step
            towards a solution. <br />For more info, click the about ☝️.
          </p>
        </div>
        <Table />
      </React.Fragment>
    )
  }
}

export default MainWrapper(Home)
