import React, { Component } from 'react';

import MainWrapper from '../reuseable/MainWrapper';

import './About.css';

class About extends Component {
  render() {
    return (
      <div className="about-container container">
        <div className="card">
          <h3 className="card-header">What is this site for?</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Github does not offer adequate searching based upon star count and
              language.
            </li>
            <li className="list-group-item">
              This app focuses on only displaying projects with a large amount
              of stars.
            </li>
            <li className="list-group-item">
              It aims to have a wider scope but it currently only handles the
              last 10 or so issues of 950 of the most popular repositories.
            </li>
            <li className="list-group-item">
              The table is simple. Search by repo, language, labels, or by the age 
              of the issue.
            </li>
            <li className="list-group-item">Hope you find an issue!</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default MainWrapper(About);
