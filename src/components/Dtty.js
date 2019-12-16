import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import withFirebaseAuth from 'react-with-firebase-auth'
// import * as firebase from 'firebase/app';
import 'firebase/auth';
// import firebaseConfig from '../config/FirebaseConfig';
import ApplicationViews from './ApplicationViews';
import Login from './auth/Login';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

library.add(faTrashAlt, faPlay, faEllipsisH, faPlusCircle, faEdit, faArrowAltCircleLeft)

class Dtty extends Component {

    // Sets initial state
    state = {
        user: false,
    }

    // isAuthenticated checks if credentials are in local storage
    // returns true/false
    isAuthenticated = () => localStorage.getItem("user") !== null

    setUser = (results) => {
        console.log(results)
        localStorage.setItem("user", results.id)
        localStorage.setItem("firstName", results.firstName)
        localStorage.setItem("lastName", results.lastName)
        this.setState({
            user: this.isAuthenticated()
        });
    }

    loginUser = (results) => {
        console.log(results)
        localStorage.setItem("user", results[0].id)
        localStorage.setItem("firstName", results[0].firstName)
        localStorage.setItem("lastName", results[0].lastName)
        this.setState({
            user: this.isAuthenticated()
        });
    }

    clearUser = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("firstName")
        localStorage.removeItem("lastName")

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

        componentDidMount() {
            this.setState({
                user: this.isAuthenticated()
            });
        }

    render() {
        return (
            <>
                <ApplicationViews 
                    isAuthenticated={this.isAuthenticated}
                    clearUser={this.clearUser}
                    user={this.state.user}
                    setUser={this.setUser}
                    loginUser={this.loginUser}
                />
                {/* <Route exact path="/" render={props => {
                    if (this.isAuthenticated()) {
                        return <ApplicationViews {...props}
                        isAuthenticated={this.isAuthenticated}
                        clearUser={this.clearUser}
                        user={this.state.user}
                        />
                    } else {
                        return <Login {...props}
                        setUser={this.setUser}/>
                    }
                }} /> */}
                {/* {/* If a user is logged in, render Home, otherwise render Login */}
                {/* {this.state.user ? (<ApplicationViews
                    user={this.state.user}
                    setUser={this.setUser}
                    clearUser={this.clearUser}
                    isAuthenticated={this.isAuthenticated} />) : (<Login setUser={this.setUser} />)} */}
            </>
        )
    }
}

export default Dtty;