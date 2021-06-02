// author:Sreevidya

import React, { useEffect, useState } from "react";
import Instructions from "./Instructions";
import Questions from "./Questions";
import Results from "./Results";
import FetchData from "../utils/FetchData"

function Quiz() {
    const [isInstructions, setIsInstructions] = useState(true);
    const [isQuestions, setIsQuestions] = useState(false);
    const [isResults, setIsResults] =useState(false);
    const [questions, setQuestions] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [answers, setAnswer] = useState([]);
    const [timeTaken, setTimeTaken] = useState("00:00:00");
    
//    Fetched instructions and questions data from JSON file using FetchData component. 
    const {data, isLoading, reloadData} = FetchData({url: 'https://raw.githubusercontent.com/parayathamsreevidya/PublicRepository/main/Questionscode.json'});

//     This method is used to show the questions on accepting instructions.
    function acceptedInstructions(){
        setIsInstructions(false);
        setIsQuestions(true);
        setIsResults(false);
    }

//     This method is used to show the Results on completion of quiz.
    function showResult(childQuestionsstate){
        setTimeTaken(childQuestionsstate.timer);
        setIsInstructions(false);
        setIsQuestions(false);
        setIsResults(true);
    }

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && isInstructions && <Instructions instructions={data.instructions} onAcceptedInstructions={acceptedInstructions}/>}
            {!isLoading && isQuestions && <Questions questions={data.questions} showResults = {showResult}/>}
            {!isLoading && isResults && <Results questions={data.questions} type={data.questions[0].type} timeTaken={timeTaken}/>}
        </div>
    );
  }
  
  export default Quiz;
