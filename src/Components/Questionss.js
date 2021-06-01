import React from "react";    
import {  
  BrowserRouter as Router,  
  Switch,  
  Route,  
  Link,  
  useParams,  
  Redirect,
  useRouteMatch  
} from "react-router-dom";
import Questions from "./Questions";

function Questionss(props) {  
  let { path} = useRouteMatch(); 
  console.log(path);
  return (  
    <div>
    <Switch>  
        <Route exact path={path}>  
          <Redirect to={`${path}/0`} />   
        </Route>  
        <Route path={`${path}/:question`}>  
          <Questions path={path} questions={props.questions} showResults={props.showResults}/>  
        </Route>  
    </Switch>  
    </div>  
  );
}
export default Questionss;