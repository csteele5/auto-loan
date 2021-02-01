import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import StartPage from "./components/start-page.component";
import DisqualifiedPage from "./components/disqualified-page.component";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container mt-3">
          <div className="header-text">
            <h2>Welcome to Billy Bob's Car Loans</h2>
          </div>
          <Switch>
            <Route exact path="/" component={StartPage} />
            <Route exact path="/disqualified" component={DisqualifiedPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
