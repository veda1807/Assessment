import React, { useEffect, useState } from "react";
import Instructions from "./Instructions";
import Questions from "./Questions";
import FetchData from "../utils/FetchData"

function Quiz() {
    const [isInstructions, setIsInstructions] = useState(true);
    const [isQuestions, setIsQuestions] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [instructions, setInstructions] = useState([]);

    const {data, isLoading, reloadData} = FetchData({url: 'https://raw.githubusercontent.com/parayathamsreevidya/PublicRepository/main/Questionscode.json'});

    function acceptedInstructions(){
        setIsInstructions(false);
        setIsQuestions(true);
    }

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && isInstructions && <Instructions instructions={data.instructions} onAcceptedInstructions={acceptedInstructions}/>}
            {!isLoading && isQuestions && <Questions questions={data.questions}/>}
        </div>
        
    );
  }
  
  export default Quiz;