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
        <div>
            <Link to="/quiz">
                <Button className="my-startbtn" variant="success" to="/quiz" > 
                    Start
                </Button>
            </Link>
        </div>
        
    );
  }
  
  export default Start;