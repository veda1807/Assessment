import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button,Modal,Form} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { For } from 'react-loops';
import {useDispatch} from 'react-redux';
import {submit} from '../actions';

function Instructions(props) {
    var instructions = props.instructions;
    const [disabled, setDisabled] = useState(true);
    const dispatch = useDispatch();

    function onChange() {
        setDisabled(!disabled);
    }

    function onClick() {
        dispatch(submit())
    }
    
    return(
        <div className="my-instructions">
            <Card className="my-card">
                <Card.Header className="text-center">
                    <h3>Instructions</h3>
                </Card.Header>
                <Card.Body className="my-cardbody-instructions">
                    <Card.Text className="instructions-text">
                        <ul>
                            <li>Answer every question, unanswered and incomplete questions will not be awarded marks.</li>
                            <li>Clicking on next button moves to next question.</li>
                            <li>Clicking on finish button ends the test and shows them results page.</li>
                            <li>If you are stuck, you can quit, learn and come back to the quiz.</li>
                            <For of={instructions} as={item =>
                                <li>{item}</li>
                            }/>
                            <Form>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Check me out" onChange={onChange}/>
                                </Form.Group>
                            </Form>
                        </ul>
                    </Card.Text>
                </Card.Body> 
                <Card.Footer>
                    <Link to = "/quiz/Questions"> 
                        <Button to="/quiz/Questions" onClick={onClick} disabled={disabled} className="my-btn" variant="success btn-right">Submit</Button>
                    </Link> 
                </Card.Footer>
            </Card>
        </div>
    );
}

export default Instructions;