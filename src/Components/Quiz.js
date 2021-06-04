// Author:Sreeevidya

import React, {useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Instructions from "./Instructions";
import Questionss from "./Questionss";
import Results from "./Results";
import FetchData from "../utils/FetchData"
import Start  from "./Start.js";

function Quiz() {
    const [timer, setTimer] = useState([]);
    const [studentAnswerList, setStudentAnswerList] = useState([])

    // Fetched instructions and questions data from JSON file using FetchData component. 
    const {data, isLoading} = FetchData({url: 'https://raw.githubusercontent.com/parayathamsreevidya/PublicRepository/main/Questionscode.json'});

    // This method is used to show the Results on completion of quiz.
    function showResult(childQuestionsstate){
        setTimer(childQuestionsstate.timer);
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
                <Route exact path="/quiz/Instructions">
                    {!isLoading && <Instructions instructions={data.instructions} />}
                </Route>
                <Route path="/quiz/Questions">
                    {!isLoading  && <Questionss questions={data.questions} showResults = {showResult}/>}
                </Route>
                <Route path="/quiz/Results">
                    {!isLoading && <Results questions={data.questions}  timer={timer} studentAnswerList={studentAnswerList}/>}
                </Route>    
                </Switch>   
            </Router>
        </div>
    );
  }
  
  export default Quiz;