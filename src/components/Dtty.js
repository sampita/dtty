import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
// import withFirebaseAuth from 'react-with-firebase-auth'
// import * as firebase from 'firebase/app';
import 'firebase/auth';
// import firebaseConfig from '../config/FirebaseConfig';
import ApplicationViews from './ApplicationViews';
import Home from './Home';
import Login from './auth/Login';

class Dtty extends Component {

    // Sets initial state
    state = {
        user: false,
    }

    // isAuthenticated checks if credentials are in local storage
    // returns true/false
    isAuthenticated = () => localStorage.getItem("user") !== null

    setUser = (results) => {
        localStorage.setItem("user", results.id)
        this.setState({
            user: this.isAuthenticated()
        });
    }

    clearUser = () => {
        localStorage.removeItem("user")
        this.setState({ user: this.isAuthenticated() })
    }

    // Function that checks to see if user is logged in or not. If so, user id is stored to localStorage.
    /*     setUser = () => {
            firebase.initializeApp(firebaseConfig).auth().onAuthStateChanged((user) => {
                if (user) {
                    this.setState({ user });
                    localStorage.setItem("user", user.uid);
                } else {
                    this.setState({ user: null });
                    localStorage.removeItem("user");
                }
            });
        } */

    /*     signOutUser = () => {
        firebase.auth().signOut()
        } */

    /*     componentDidMount() {
            this.setUser(results)
        } */

    render() {
        return (
            <>
                {/* <Route exact path="/" render={props => {
                    if (this.state.user=true) {
                        return <ApplicationViews {...props} />
                    } else {
                        return <Login {...props}/>
                    }
                }} /> */}
                {/* {/* If a user is logged in, render Home, otherwise render Login */}
                {this.state.user=true ? (<ApplicationViews
                    user={this.state.user}
                    setUser={this.setUser}
                    clearUser={this.clearUser}
                    isAuthenticated={this.isAuthenticated} />) : (<Login />)}
            </>
        )
    }
}

export default Dtty;