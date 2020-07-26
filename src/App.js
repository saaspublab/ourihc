import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.sass';

import Header from './components/Header';
// import Home from './pages/Home';
// import Points from './pages/Points';
import Nope from './pages/Nope';
import Press from './pages/Press';
import Discord from './pages/Discord';

// Lunch assignment pages
import Lunch from './pages/Lunch';
import LunchCurrent from './pages/lunch/Current';
import LunchNew from './pages/lunch/New';

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
            <Route exact path="/points">
              <Nope />
            </Route>
            <Route exact path="/press">
              <Press />
            </Route>
            <Route exact path="/discord">
              <Discord />
            </Route>
            <Route exact path="/lunch">
              <Lunch />
            </Route>
            <Route exact path="/lunch/current">
              <LunchCurrent />
            </Route>
            <Route exact path="/lunch/new">
              <LunchNew />
            </Route>
            {/* <Route exact path="/home">
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
        <Link to="/" className="button primary hollow round has-icon">
          Go home <span>&rarr;</span>
        </Link>
      </p>
    </>
  );
}
