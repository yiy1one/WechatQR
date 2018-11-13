import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './pages/Login'
import Index from './pages/Index'
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route path="/login" component={Login} />
            <Route path="/" component={Index} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
