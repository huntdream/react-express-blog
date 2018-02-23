import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../App.css';
import HiHeader from '../containers/HiHeader';
import Posts from '../containers/Posts';
import HiDrawer from '../containers/HiDrawer';
import NewPost from './NewPost.js';
import Sign from './Sign';

const Signin = (props) => <Sign label="Sign In" path="signin" {...props}/>;
const Signup = (props) => <Sign label="Sign Up" path="signup" {...props}/>;

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <HiHeader />
          <HiDrawer />
          <div className="page-container">
            <div className="page-outer">
              <div role="main" className="content-main">
                <Route exact path="/" component={Posts} />
                <Route
                  path="/moments"
                  render={() => (
                    <h1 align="center">
                      Current component is under construction
                    </h1>
                  )}
                />
                <Route path="/newpost" component={NewPost} />
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
