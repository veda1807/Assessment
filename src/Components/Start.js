// author: Sreevidya
// Created a button to start the quiz.

import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button,Modal,Form} from 'react-bootstrap';


function Start() {

    return (
        <div class="flex-parent jc-center">
            <Link to="/quiz">
                <Button className="my-startbtn margin-right" variant="success" to="/quiz" > 
                    Start Quiz
                </Button>
            </Link>
        </div>
    );
  }
  
  export default Start;
