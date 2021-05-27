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
    // const url = getUrl(props.type);

    const {data, isLoading, reloadData} = FetchData({url: 'https://raw.githubusercontent.com/parayathamsreevidya/PublicRepository/main/Questionscode.json'});

    // function getUrl(type){
    //     let url = "";
        
    //     if( type == 'Fillup'){
    //         url = 'https://raw.githubusercontent.com/parayathamsreevidya/PublicRepository/main/Questions.json';
    //     }else if( type == "Editor"){
    //         url = 'https://raw.githubusercontent.com/parayathamsreevidya/PublicRepository/main/Questionscode.json';
    //     }
    //     return url;
    // }

    function acceptedInstructions(){
        setIsInstructions(false);
        setIsQuestions(true);
        setIsResults(false);
    }

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