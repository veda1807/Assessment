// Author:Sreeevidya

import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button,Form} from 'react-bootstrap';
import {
    Link,
    Redirect
  } from "react-router-dom";
import { For } from 'react-loops';


function Instructions(props) {
    var instructions = props.instructions;
    const backnav = props.config.backnav;
    // fetching session data
    const sesssionDetails = quizData();
    const showInstructions = sesssionDetails['instructions'];
    
    const [disabled, setDisabled] = useState(true);

    // This method enables the submit button on clicking on check me out.
    function onChange() {
        setDisabled(!disabled);
    }

    // Getting the data from session.
  function quizData() {
    var sessionData = window.sessionStorage.getItem('quizData');
      if(sessionData === null){
          sessionData =  {
              count: 1,
              studentAnswerList: {},
              result: false,
              instructions : false
          }
      }else{
          sessionData = JSON.parse(sessionData);
      }
      return sessionData;
    }

    return(
        <div className="my-instructions">
            { showInstructions && 
                <Redirect to='/quiz/Results' />}
            <Card className="my-card">
                <Card.Header className="text-center">
                    <h3>Instructions</h3>
                </Card.Header>
                <Card.Body className="my-cardbody-instructions">
                    <div className="instructions-text">
                        <ul>
                            <li> Answer every question, unanswered and incomplete questions will not be awarded marks.</li>
                            <li> Click on <b>Submit</b> button to save your answers. </li>
                            <li> Click on <b>Next</b> button to moves to next question. </li>
                            {backnav && <li> Click on <b>Back</b> button to moves to previous question. </li>}
                            <li> Click on <b>Finish</b> button to end the test and see results page.</li>
                            <li> If you are stuck, you can quit by clicking on <b>Quit</b> button, study and come back to the quiz.</li>
                            <li> 
                                For Coding Questions:
                                <ul>
                                    <li> Click on <b>Submit</b> button to save your code. </li>
                                    <li> Click on <b>Run</b> button to execute you code. </li> 
                                </ul>
                            </li>                            
                            <For of={instructions} as={item =>
                                <li>{item}</li>
                            }/>
                            <Form>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Agree to the instructions" onChange={onChange}/>
                                </Form.Group>
                            </Form>
                        </ul>
                    </div>
                </Card.Body> 
                <Card.Footer>
                    <Link to = "/quiz/Questions"> 
                        <Button to="/quiz/Questions" disabled={disabled} className="my-btn" variant="success btn-right">Submit</Button>
                    </Link> 
                </Card.Footer>
            </Card>
        </div>
    );
}

export default Instructions;
