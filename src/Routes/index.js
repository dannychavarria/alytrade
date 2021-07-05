import React from 'react'
import { BrowserRouter as Router, Route,  Redirect } from 'react-router-dom';
import * as Containers from '../Containers'

const isLogged = () => {
  return localStorage.getItem('token') ? true : false
}

const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
            isLogged() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

const Routes = () => {
    return (<>
        <Router>
            <Route exact path="/" render={()=>{
              return (
                  isLogged ? <Redirect to="/dashboard"/> : <Redirect to="login"/>
              )
            }}
            />
            <Route path="/login">
                <Containers.LoginContainer/>
            </Route>
            <PrivateRoute path="/dashboard">
                <Containers.MainContainer/>
            </PrivateRoute>
        </Router>
    </>)
}

export default Routes
