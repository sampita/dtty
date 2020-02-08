import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Login from './auth/Login'
import { CreateAccount } from './auth/CreateAccount'
import Home from './songs/SongCollection'
import SongView from './songs/Song'

const ApplicationViews = ({ isAuthenticated, setUser, ...props }) => (
  //If a user is logged in then render Home, otherwise render Login
  <Fragment>
    <Route
      exact
      path="/"
      render={props => (isAuthenticated() ? <Home {...props} /> : <Redirect to="/login" />)}
    />
    <Route exact path="/login" render={props => <Login {...props} />} />
    <Route exact path="/signup" render={props => <CreateAccount setUser={setUser} {...props} />} />
    <Route
      exact
      path="/songs/:songId(\d+)"
      render={props => (isAuthenticated() ? <SongView {...props} /> : <Redirect to="/login" />)}
    />
  </Fragment>
)

export default ApplicationViews
