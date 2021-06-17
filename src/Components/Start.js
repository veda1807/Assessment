// Author:Sreeevidya

// Created a button to start the quiz.

import React from "react";
import {
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

function Start() {
    
    return (
        <div className="flex-parent jc-center">
            <Link to="/quiz/Instructions">
                <Button className="my-startbtn margin-right" variant="success" to="/quiz/Instructions"> 
                    Start Quiz
                </Button>
            </Link>
        </div>
    );
  }
  
  export default Start;