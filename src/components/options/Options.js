import React, { Component } from 'react';

import './Options.css';

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
    this.handleCheckChange = this.handleCheckChange.bind(this);
  }

  handleCheckChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      checked: value
    });
    this.props.handleInputChange(value);
  }

  render() {
    return (
      <div className="options-container container">
        <h4 className="h4">Options</h4>
        <div className="form-check">
          <input
            id="equality-type"
            name="equality-type"
            type="checkbox"
            className="form-check-input"
            checked={this.state.checked}
            onChange={this.handleCheckChange}
          />
          <label htmlFor="equality-type" className="form-check-label">
            Case Sensitive Language Search
          </label>
        </div>
      </div>
    );
  }
}

export default Options;
