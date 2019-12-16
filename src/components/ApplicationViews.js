import React, { Component } from "react";
import { Route } from "react-router-dom"
import Login from "./auth/Login";
import ProfileForm from "./Form";
import CreateAccount from "./auth/CreateAccount";
import Home from "./songs/SongCollection";
import SongView from "./songs/Song";

class ApplicationViews extends Component {

    componentDidMount() {
    this.props.isAuthenticated()
    }


    render() {

        //If a user is logged in then render Home, otherwise render Login
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <Home {...this.props} {...props} />
                    }}
                />
                <Route exact path="/login" render={(props) => {
                    return <Login {...this.props} {...props} />
                    }}
                />
                <Route exact path="/signup" render={(props) => {
                    return <CreateAccount {...this.props} {...props} />
                    }}
                />
                <Route exact path="/songs/:songId(\d+)" render={(props) => {
                    return <SongView {...this.props} {...props} />
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