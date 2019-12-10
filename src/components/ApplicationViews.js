import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom"
import Home from "./Home";
import Login from "./auth/Login";
import ProfileForm from "./Form";
import CreateAccount from "./auth/CreateAccount";

class ApplicationViews extends Component {
    // Sets initial state
    state = {
        user: true,
    }


    render() {
        console.log("AppViews this.props", this.props)
        //If a user is logged in then render Home, otherwise render Login
        return (
            <React.Fragment>
                <Route exact path="/home" render={(props) => {
                    return <Home {...this.props} {...props} />
                    }}
                />
                <Route exact path="/login" render={(props) => {
                    return <Login {...this.props} {...props} />
                    }}
                />
                <Route exact path="/createaccount" render={(props) => {
                    return <CreateAccount {...this.props} {...props} />
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