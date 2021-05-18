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
        <div className="my-startbtn">
            <Link to="/quiz">
                <Button variant="success" to="/quiz" > 
                    Start Quiz
                </Button>
            </Link>
        </div>
        
    );
  }
  
  export default Start;