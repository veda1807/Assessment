// Author:Sreeevidya

import React, {useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    useRouteMatch,
    Route
  } from "react-router-dom";
import Instructions from "./Instructions";
import QuestionsRoute from "./QuestionsRoute";
import Results from "./Results";
import FetchData from "../utils/FetchData"
import Start  from "./Start.js";

function Quiz() {
    let { path } = useRouteMatch();
    // const [timer, setTimer] = useState([]);
    const [studentAnswerList, setStudentAnswerList] = useState([])

    // Fetched instructions and questions data from JSON file using FetchData component. 
    const {data, isLoading} = FetchData({url: 'http://localhost:4000/assessment'});

    // This method is used to show the Results on completion of quiz.
    function showResult(childQuestionsstate){
        // setTimer(childQuestionsstate.timer);
        setStudentAnswerList(childQuestionsstate.studentAnswerList);
    }

    return (
            
        <div className="App">
            {isLoading && <div>Loading...</div>}
            <Router>
                <Switch>
                <Route exact path="/">
                   <Start />
                </Route>
                <Route  path={`${path}/Instructions`}>
                    {!isLoading && <Instructions instructions={data.instructions} />}
                </Route>
                <Route path={`${path}/Questions`}>
                {!isLoading  && <QuestionsRoute questions={data.questions} showResults = {showResult} config = {data.config}/>}
                </Route>
                <Route path={`${path}/Results`}>
                    {!isLoading && <Results questions={data.questions} studentAnswerList={studentAnswerList}/>}
                </Route>    
                </Switch>   
            </Router>
        </div>
    );
  }
  
  export default Quiz;