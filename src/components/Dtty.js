import React, { Component } from 'react'
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../config/FirebaseConfig';
import ApplicationViews from './ApplicationViews';
import Home from './Home';
import Login from './auth/Login';

class Dtty extends Component {

    // Sets initial state
    state = {
        user: {},
    }


    // Function that checks to see if user is logged in or not. If so, user id is stored to localStorage.
    setUser = () => {
        firebase.initializeApp(firebaseConfig).auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
                localStorage.setItem("user", user.uid);
            } else {
                this.setState({ user: null });
                localStorage.removeItem("user");
            }
        });
    }

    signOutUser = () => {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
    }

    componentDidMount(){
        this.setUser()
    }

    render() {
        return (
            <>
                {/* If a user is logged in, render Home, otherwise render Login */}
                {this.state.user ? (<ApplicationViews
                    user={this.state.user}
                    setUser={this.setUser} />) : (<Login />)}
            </>
        )
    }
}

export default Dtty;