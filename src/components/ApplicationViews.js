import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom"
import Home from "./Home";
import Login from "./auth/Login";
import ProfileForm from "./Form";

class ApplicationViews extends Component {

    render() {
        console.log("this.props", this.props)
        //If a user is logged in then render Home, otherwise render Login
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <Home />
                    }}
                />
                <Route exact path="/form" render={(props) => {
                    return <ProfileForm />
                    }}
                />
            </React.Fragment>
            )
        }
}
            
export default ApplicationViews