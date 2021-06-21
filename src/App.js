<<<<<<< HEAD
// Author:Sreeevidya

=======
// Author:Sreevidya

import logo from './logo.svg';
>>>>>>> a0ffd1108555b162d65a08e32762363909e4658e
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Start  from "./Components/Start.js";
import Quiz  from "./Components/Quiz.js";

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
<<<<<<< HEAD
          </Route> 
=======
          </Route>
>>>>>>> a0ffd1108555b162d65a08e32762363909e4658e
        </Switch>   
      </Router>
    </div>
  );
}

export default App;
