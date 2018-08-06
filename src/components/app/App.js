import React, { Component } from 'react'
import { Switch } from 'react-router-dom'
import AppliedRoute from '../reuseable/AppliedRoute'
import Home from '../home/Home'

import './App.css'
import firebase from 'firebase'
import 'firebase/firestore/dist/index.cjs'
import 'firebase/auth/dist/index.cjs'
import 'firebase/database/dist/index.cjs'
import About from '../about/About';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }
  // thank you alex v.
  componentDidMount() {
    firebase
      .auth()
      .getRedirectResult()
      .then(result => {
        if (result.user) {
          console.log('Successful Redirect', result)
          firebase
            .firestore()
            .collection('users')
            .doc(result.user.uid)
            .set({
              uid: result.user.uid,
              email: result.user.email,
              githubToken: result.credential.accessToken,
              githubUsername: result.additionalUserInfo.username
            })
        }
      })
      .catch(err => {
        console.error('Sign in error:', err)
      })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              this.setState({ user: doc.data() })
            } else {
              console.warn('Error at App cdm, firestore user')
            }
          })
          .catch(console.error)
      } else {
        this.setState({ user: {} })
      }
    })
  }
  render() {
    const childProps = {
      user: this.state.user
    }
    return (
      <div className="App">
        <Switch>
          <AppliedRoute exact path="/" component={Home} props={childProps} />
          <AppliedRoute exact path="/about" component={About} props={childProps} />
        </Switch>
      </div>
    )
  }
}

export default App
