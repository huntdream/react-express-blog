import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../App.css';
import VisibleHeader from '../containers/VisibleHeader';
import ShowPost from '../containers/ShowPost';
import VisibleDrawer from '../containers/VisibleDrawer';
import NewPost from './NewPost.js';
import 'draft-js/dist/Draft.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <VisibleHeader />
          <VisibleDrawer />
          <div className="page-container">
            <div className="page-outer">
              <div role="main" className="content-main">
                <Route exact path="/" component={ShowPost} />
                <Route
                  path="/moments"
                  render={() => (
                    <h1 align="center">
                      Current component is under construction
                    </h1>
                  )}
                />
                <Route path="/newpost" component={NewPost} />
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;