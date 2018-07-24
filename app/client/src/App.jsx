import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router ,Route} from 'react-router-dom';
import Login from './component/login/login';
import Signup from './component/signup/signup';
import Dashboard from './component/dashboard/dashboard';
import Home from './component/home/home';
class App extends Component {
  render() {
    return (
       <Router>
            <div>
              <Route exact path = "/" component = {Login} />
              <Route exact path = "/signup" component = {Signup} />
              <Route exact path = "/dashboard" component = {Dashboard} /> 
              <Route exact path = "/home" component ={Home} />
 
            </div>   
            
       </Router>
    );
  }
}

export default App;
