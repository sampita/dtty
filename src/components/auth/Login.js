import React, { Component } from 'react'
import ApiManager from '../modules/ApiManager'
import { Link, withRouter } from 'react-router-dom'
import Logo from '../../images/logo.png'
import Microphone from '../../images/microphone.png'
import './Auth.css'

class Login extends Component {
  // Sets initial state
  state = {
    email: '',
    password: '',
  }

  //Firebase auth
  /* login = (evt) => {
        evt.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
    } */

  handleFieldChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleLogin = e => {
    e.preventDefault()
    ApiManager.checkUser(this.state.email, this.state.password).then(results => {
      if (results.length > 0) {
        this.props.loginUser(results)
        console.log('results', results)
        this.props.history.push('/')
      } else {
        alert('Incorrect email or password')
      }
    })
  }

  render() {
    return (
      <>
        <img src={Logo} alt={'dtty logo'} className="smallLogo" />
        <form className="userAuthForm">
          <fieldset className="userAuthForm">
            <h3>Login:</h3>
            <div className="formgrid" id="loginForm">
              {/* <label htmlFor="inputEmail">Email address: </label> */}
              <input
                onChange={this.handleFieldChange}
                type="email"
                name="email"
                className="loginInput"
                id="email"
                placeholder="Email address"
                required=""
              />
              {/* <label htmlFor="inputPassword">Password: </label> */}
              <input
                onChange={this.handleFieldChange}
                type="password"
                name="password"
                className="loginInput"
                id="password"
                placeholder="Password"
                required=""
              />
            </div>
            <button onClick={this.handleLogin} type="submit" className="button" id="loginButton">
              Log In
            </button>
            <Link className="smallLink" to="/signup">
              or create an account
            </Link>
          </fieldset>
        </form>
        <picture>
          <img
            src={Microphone}
            alt="rewind, record, play, and fast-forward buttons on recorder"
            id="microphoneImage"
          />
        </picture>
      </>
    )
  }
}
export default withRouter(Login)
