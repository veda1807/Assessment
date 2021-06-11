// Author:Sreeevidya

// This component is used to create nested route for every question.
// Sends question as a param to the question component.

import React from "react";    
import {    
  Switch,  
  Route,    
  Redirect,
  useRouteMatch  
} from "react-router-dom";
import Questions from "./Questions";

function Questionss(props) {  
  let { path} = useRouteMatch(); 

  return (  
    <div>
    <Switch>  
        <Route exact path={path}>  
          <Redirect to={`${path}/1`} />   
        </Route>  
        <Route path={`${path}/:question`}>  
          <Questions path={path} questions={props.questions} showResults={props.showResults} config = {props.config} />  
        </Route>  
    </Switch>  
    </div>  
  );
}
export default Questionss;