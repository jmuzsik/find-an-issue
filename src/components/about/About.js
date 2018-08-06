import React, { Component } from 'react'

import MainWrapper from '../reuseable/MainWrapper'

import './About.css'

class About extends Component {
  handleChange(evt) {
    evt.preventDefault()
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <h3 className="card-header">About</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Github does not offer adequeate searching based upon star count
              and labels.
            </li>
            <li className="list-group-item">
              This app focuses on only displaying projects with a large amount
              of stars atm.
            </li>
            <li className="list-group-item">
              It aims to have a wider scope but it currently only handles the
              last 10 or so issues of 550 repositories. I am working on adding
              more repositories, but you have to manually select them. There are
              90 million repos on Github and no simple way to query repos by
              language or star count on the Github API.
            </li>
            <li className="list-group-item">
              Signing in is not useful atm (implemented it when the project was
              going in a different direction). Working on implementing giving a
              user the ability to query specific repositories and have issues
              given them when they are logged in.
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default MainWrapper(About)
