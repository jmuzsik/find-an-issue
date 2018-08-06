import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import 'firebase/firestore/dist/index.cjs'
import githubImage from '../../githubmark.png'

import './Navbar.css'

const provider = new firebase.auth.GithubAuthProvider()
provider.addScope('repo')

const attemptSignIn = event => {
  event.preventDefault()
  firebase.auth().signInWithRedirect(provider)
}

class Navbar extends Component {
  render() {
    const username = this.props.user.githubUsername
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light border-bottom"
        aria-label="main navigation"
      >
        <Link className="navbar-brand" to="/">
          <strong>
            Find
            <span role="img" aria-label="pointing up emoji">
              🤔
            </span>an
            <span role="img" aria-label="pointing up emoji">
              💡
            </span>Issue
          </strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item about active">
              <Link className="nav-link" to="/about">
                <strong>About</strong>
              </Link>
            </li>
            <li className="nav-item active">
              <a
                className="nav-link"
                href="https://github.com/jMuzsik/find-an-issue"
              >
                <img aria-label="github mark image"  title="contrast" className="contrast" src={githubImage} />
              </a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {username ? (
            <React.Fragment>
              <p>Hey, {username}</p>
              <Link
                to="/"
                className="nav-link"
                onClick={() =>
                  firebase
                    .auth()
                    .signOut()
                    .catch(console.error)
                }
              >
                Logout
              </Link>
            </React.Fragment>
          ) : (
            <form className="form-inline my-2 my-lg-0">
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                onClick={attemptSignIn}
              >
                <span>Sign In</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    )
  }
}

export default Navbar
