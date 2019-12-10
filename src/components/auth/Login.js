import React, { Component } from "react";
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from "../../config/FirebaseConfig";

class Login extends Component {
     // Sets initial state
     state = {
        email: "",
        password: "",
    }

/*     createAccount = (evt) => {
        evt.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
    } */

    login = (evt) => {
        evt.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
    }

    handleFieldChange = (evt) => {
        this.setState({
                [evt.target.name]: evt.target.value
            })
    }

    render() {
        return (
            <div className="col-md-6">
                <form>
                    <div className="form-group">
                        <label htmlFor="userEmailInput">Email address</label>
                        <input value={this.state.email} onChange={this.handleFieldChange} type="email" name="email" className="form-control" id="userEmailInput" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userPasswordInput">Password</label>
                        <input value={this.state.password} onChange={this.handleFieldChange} type="password" name="password" className="form-control" id="userPasswordInput" />
                    </div>
                    <button type="submit" onClick={this.login} className="btn btn-primary">Login</button>
                    <button onClick={this.signup} style={{marginLeft: "25px"}} className="btn btn-success">Signup</button>
                </form>

            </div>
        )
    }
}
export default Login;