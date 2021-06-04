// Author:Sreeevidya

// Created a button to start the quiz.

import React from "react";
import {
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

function Start() {

    // useEffect(){
    // window.location.reload(false);
    // }

    // useEffect(()=> {
    //     window.location.reload(false);
    // },[]);
    
    // useEffect(() => {
    //     if(reloadCount < 2) {
    //       sessionStorage.setItem('reloadCount', String(reloadCount + 1));
    //       window.location.reload();
    //     } else {
    //       sessionStorage.removeItem('reloadCount');
    //     }
    //   }, []);

    // useEffect(() => {
    //     window.location.reload();
    //   }, []);
    
    
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