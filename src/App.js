import logo from './logo.svg';
import './App.css';
// import  './index.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Start  from "./Components/Start.js";
import FillupResults  from "./Components/Results.js";
import Quiz  from "./Components/Quiz.js";
// import Programs from './Components/Programs';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Start />
          </Route>
          <Route path="/quiz">
            <Quiz />
          </Route>
          {/* <Route path="/programs">
            <Programs />
          </Route>   */}
        </Switch>   
      </Router>
    </div>
  );
}

export default App;
