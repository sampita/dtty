import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom"
import Login from "./auth/Login";
import CreateAccount from "./auth/CreateAccount";
import Home from "./songs/SongCollection";
import SongView from "./songs/Song";

class ApplicationViews extends Component {


    render() {

        //If a user is logged in then render Home, otherwise render Login
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    if (this.props.isAuthenticated()) {
                        return <Home
                            {...this.props} {...props} />
                      } else {
                        return <Redirect to="/login" />
                      }
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
                    if (this.props.isAuthenticated()) {
                        return <SongView {...this.props} {...props} />
                      } else {
                        return <Redirect to="/login" />
                      }
                    }}
                />
            </React.Fragment>
            )
        }
}
            
export default ApplicationViews