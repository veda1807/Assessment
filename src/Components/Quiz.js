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

function Quiz() {
    const [isInstructions, setIsInstructions] = useState(true);
    const [isQuestions, setIsQuestions] = useState(false);
    const [isResults, setIsResults] =useState(false);
    const [questions, setQuestions] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [answers, setAnswer] = useState([]);
    const [timer, setTimer] = useState([]);
    const [studentAnswerList, setStudentAnswerList] = useState([])

    // Fetched instructions and questions data from JSON file using FetchData component. 
    const {data, isLoading, reloadData} = FetchData({url: 'https://raw.githubusercontent.com/parayathamsreevidya/PublicRepository/main/Questions.json'});

    // This method is used to show the questions on accepting instructions.
    function acceptedInstructions(){
        setIsInstructions(false);
        setIsQuestions(true);
        setIsResults(false);
    }

    // This method is used to show the Results on completion of quiz.
    function showResult(childQuestionsstate){
        setTimer(childQuestionsstate.timer);
        setStudentAnswerList(childQuestionsstate.studentAnswerList)
        setIsInstructions(false);
        setIsQuestions(false);
        setIsResults(true);
    }

    return (
            
        <div className="App">
            {isLoading && <p>Loading...</p>}
            <Router>
                <Switch>
                <Route exact path="/quiz/Instructions">
                    {!isLoading && <Instructions instructions={data.instructions} onAcceptedInstructions={acceptedInstructions}/>}
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