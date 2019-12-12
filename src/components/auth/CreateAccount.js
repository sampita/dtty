import React, { Component } from "react";
import ApiManager from "../modules/ApiManager";
import { Link } from "react-router-dom"
import Logo from "../../images/logo.png"
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
                            // localStorage.setItem("user", results.id)
                            // console.log(results)
                            this.props.setUser(results)
                        });
                        
                    this.props.history.push("/")
                }
            })
    }

    handleFieldChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    render() {
        console.log("CreateAccount this.props", this.props)
        return (
            <>
              <img src={Logo} alt={"dtty logo"} className="smallLogo"/>
                <form className="userAuthForm">
                    <fieldset className="userAuthForm">
                        <h3>Create Account:</h3>
                        <div className="formgrid">
                            {/* <label htmlFor="inputFirstName">First Name:</label> */}
                            <input onChange={this.handleFieldChange} 
                                type="name"
                                name="firstName"
                                className="createAccountInput"
                                id="firstName"
                                placeholder="First name"
                                required="" />
                            {/* <label htmlFor="inputLastName">Last Name:</label> */}
                            <input onChange={this.handleFieldChange} 
                                type="name"
                                name="lastName"
                                className="createAccountInput"
                                id="lastName"
                                placeholder="Last name"
                                required="" />
                            {/* <label htmlFor="inputEmail">Email address: </label> */}
                            <input onChange={this.handleFieldChange} 
                                type="email"
                                name="email"
                                className="createAccountInput"
                                id="email"
                                placeholder="Email address"
                                required="" />
                            {/* <label htmlFor="inputPassword">Password: </label> */}
                            <input onChange={this.handleFieldChange} 
                                type="password"
                                name="password"
                                className="createAccountInput"
                                id="password"
                                placeholder="Password"
                                required="" />
                            {/* <label htmlFor="inputPassword">Confirm Password</label> */}
                            <input onChange={this.handleFieldChange} 
                                type="password"
                                name="confirmPassword"
                                className="createAccountInput"
                                id="confirmPassword"
                                placeholder="Confirm password"
                                required="" />

                        </div>
                        <button onClick={this.createNewUser} type="submit" className="button">
                            Register
                        </button>
                        <Link className="smallLink" to="/login">I already have an account</Link>
                    </fieldset>
                </form>
            </>
        )
    }

}

export default CreateAccount;