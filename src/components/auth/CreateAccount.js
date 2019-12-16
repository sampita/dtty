import React, { Component } from "react";
import ApiManager from "../modules/ApiManager";
import { Link } from "react-router-dom"
import Logo from "../../images/logo.png"
import Cassette from "../../images/cassette.png"
import "./Auth.css";
// import withFirebaseAuth from 'react-with-firebase-auth'
// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import firebaseConfig from "../../config/FirebaseConfig";

class CreateAccount extends Component {
    // Sets initial state
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    createNewUser = e => {
        e.preventDefault();
        ApiManager.getAll("users")
            .then(users => {
                if (users.find(user => user.email.toLowerCase() === this.state.email.toLowerCase())) {
                    alert("This email is already taken")
                } else if (this.state.password !== this.state.confirmPassword) {
                    alert("Your passwords do not match")
                } else if (this.state.email === "" || this.state.password === "" || this.state.confirmPassword === "") {
                    alert("Please fill out all fields")
                } else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))) {
                    alert("Please enter a valid email address")
                } else {
                    const user = {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        email: this.state.email,
                        password: this.state.password
                    };

                    // Create the user and redirect user to home
                    ApiManager.createNew("users", user)
                        .then(results => {
                            this.props.setUser(results)
                        })
                        .then(() => {this.props.history.push("/")
                    })
                }})
    }

    handleFieldChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    render() {
        return (
            <>
                <img src={Logo} alt={"dtty logo"} className="smallLogo" />
                <form className="userAuthForm">
                    <fieldset className="userAuthForm" id="signup">
                        <h3>Sign Up:</h3>
                        <div className="formgrid">
                            <input onChange={this.handleFieldChange}
                                type="name"
                                name="firstName"
                                className="createAccountInput"
                                id="firstName"
                                placeholder="First name"
                                required="" />
                            <input onChange={this.handleFieldChange}
                                type="name"
                                name="lastName"
                                className="createAccountInput"
                                id="lastName"
                                placeholder="Last name"
                                required="" />
                            <input onChange={this.handleFieldChange}
                                type="email"
                                name="email"
                                className="createAccountInput"
                                id="email"
                                placeholder="Email address"
                                required="" />
                            <input onChange={this.handleFieldChange}
                                type="password"
                                name="password"
                                className="createAccountInput"
                                id="password"
                                placeholder="Password"
                                required="" />
                            <input onChange={this.handleFieldChange}
                                type="password"
                                name="confirmPassword"
                                className="createAccountInput"
                                id="confirmPassword"
                                placeholder="Confirm password"
                                required="" />

                        </div>
                        <button onClick={this.createNewUser} type="submit" className="button" id="signupButton">
                            Register
                        </button>
                        <Link className="smallLink" to="/login">I already have an account</Link>
                    <picture>
                        <img src={Cassette} alt="cassette tape drawing" id="cassetteImage"/>
                    </picture>
                    </fieldset>
                </form>
            </>
        )
    }

}

export default CreateAccount;