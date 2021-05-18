import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button,Modal,Form} from 'react-bootstrap';
import { For } from 'react-loops';

function Instructions(props) {
    var instructions = props.instructions;
    const [disabled, setDisabled] = useState(true);

    function onChange() {
        setDisabled(!disabled);
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
                            <li>Clicking on next button redirects to next question.</li>
                            <li>Clicking on finish button redirects to results page.</li>
                            <li>Marks will be awarded if you attempt the quiz before the deadline.</li>
                            <li>Navigating to other tabs is considered as malpractice.</li>
                            <li>If you are stuck at any question you can quit the quiz and reattempt it later.</li>
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
                <Button disabled={disabled} onClick={props.onAcceptedInstructions} className="my-btn" variant="success btn-right">Submit</Button>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default Instructions;