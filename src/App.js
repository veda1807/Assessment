// Author:Sreeevidya

import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import Start  from "./Components/Start.js";
import Quiz  from "./Components/Quiz.js";

function App() {

  return (
    <div className="App">
      <Router forceRefresh>
        <Switch>
          <Route exact path="/">
            <Start />
          </Route>
          <Route exact path="/start">
            <Redirect to='/' />
          </Route>
          <Route path="/quiz">
            <Quiz />
          </Route> 
        </Switch>   
      </Router>
    </div>
  );
}

export default App;
