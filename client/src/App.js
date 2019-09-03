import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";


// import components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/UserDashboard";

// redux store
import store from "./store";

//stylings
import './styles/App.css';
import './styles/Home.css';
import './styles/Timer.css';
import './styles/Helper.css';
import './styles/History.css';
import './styles/Auth.css';
import './styles/Navbar.css';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render () {
    return (
      
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="container-fluid" id="app-container-override">
              <div className="row">
                <div className="col-lg-12">
                  <Navbar />
                </div>
              </div>

              <Route exact path="/" component={Home}/>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
