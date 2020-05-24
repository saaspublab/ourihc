import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import './App.sass'

import Header from './components/Header.js'
// import Home from './pages/Home.js'
import Nope from './pages/Nope.js'

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
          <p>© {new Date().getFullYear()} Jay Sella and SAAS Inter-House Council</p>
          <p>All Rights Reserved</p>
        </footer>
      </div>
    </Router>
  )
}

function NoMatch() {
  return (
    <>
      <h2>Error.</h2>
      <p><Link to="/" className="button button--primary button--bordered button--rounded button--has-shadow button--has-icon">Restart Site <span>&rarr;</span></Link></p>
    </>
  )
}