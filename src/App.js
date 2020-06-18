import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.sass';

import Header from './components/Header';
// import Home from './pages/Home.js'
import Nope from './pages/Nope';

export default function App() {
  return (
    <Router>
      <div className="wrapper">
        <Header className="header" />

        <main className="bodyContent">
          <Switch>
            <Route exact path="/">
              <Nope />
            </Route>
            {/* <Route exact path="/">
              <Home />
            </Route> */}
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </main>

        <footer className="footer">
          <p>
            © {new Date().getFullYear()} Jay Sella and SAAS Inter-House Council
          </p>
          <p>All Rights Reserved</p>
        </footer>
      </div>
    </Router>
  );
}

function NoMatch() {
  return (
    <>
      <h2>Well, well, well...</h2>
      <p>
        You see, you're trying to find some hidden treasure. Much to your
        dismay, you're not getting anything at this location...
      </p>
      <p>
        <Link
          to="/"
          className="button button--primary button--bordered button--rounded button--has-shadow button--has-icon"
        >
          Go home <span>&rarr;</span>
        </Link>
      </p>
    </>
  );
}
