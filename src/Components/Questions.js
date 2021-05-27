import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button,Row,Col,InputGroup,Form, Modal  } from 'react-bootstrap';
import isEmpty from '../utils/is-empty';
import NewLine from '../utils/NewLine';
import CodeQues from './CodeQues.js';
import {useDispatch} from 'react-redux';
import {next,results} from '../actions';
import { useStopwatch } from 'react-timer-hook';
            

function Questions(props) {

    const questions = props.questions;
    const [currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState(0);
    const [showQuitWarning, setShowQuitWarning] = useState(false);
    const [studentResponse, setStudentResponse] = useState('');
    const [studentAnswerList, setStudentAnswerList] = useState([]);
    const [displayResponse, setDisplayResponse] = useState('');
    const {seconds, minutes, hours, pause} = useStopwatch({ autoStart: true });
    const [displayFinish, setDisplayFinish] = useState(questions.length <= 1 ? true : false);

    const type = questions[currentQuestionIndex].type

    const dispatch = useDispatch();

    function studentInput(e){
        setStudentResponse(e.target.value);
    }

    function recordAnswer(e) {
        setStudentAnswerList([...studentAnswerList, studentResponse]);
        setDisplayResponse('Your response is recorded');
        setAnsweredQuestions(answeredQuestions + 1);
    }

    function onNext() {
        setStudentResponse('');
        setDisplayResponse('');
        if( currentQuestionIndex < questions.length - 2 ){
            setCurrentQuestionIndex( currentQuestionIndex + 1 );
        }else{
            setCurrentQuestionIndex( currentQuestionIndex + 1 );
            setDisplayFinish(true);
        }
        dispatch(next());
    }

    function handleClose() {
        setShowQuitWarning(false);
    }

    function handleShow() {
        setShowQuitWarning(true);
    }

    function onFinish() {
        let params = {
            questions: questions,
            timer:[hours, minutes, seconds],
            studentAnswerList: studentAnswerList
        }
        //to pause the timer
        pause();
        props.showResults(params);
        dispatch(results());
    }

    return (
        <div>  
            <div className="my-questionpg">
                <div  className="sidebar">
                    <div className="details">
                        <Row>
                            
                            <Col sm="6"><h5 className="text-center">Answered questions : {answeredQuestions}/{questions.length}</h5></Col>
                            <Col sm="6"><h3 className="text-center">{hours < 10 ? '0'+ hours : hours}:{minutes < 10 ? '0'+ minutes : minutes}:{seconds < 10 ? '0'+ seconds : seconds}</h3></Col>
                            
                            {/* <Col sm="4"><h5 className="text-right my-deadaline">Deadline : {details[0].Deadline}</h5></Col> */}
                        </Row>
                    </div>  
                </div>
                <div>
                    <Card className="my-card">
                        <Card.Header>
                            <Row>
                            <Col><h3 className="text-center">Question {currentQuestionIndex+1}</h3></Col>
                            {/* <Col sm="6"><label>No of attempts</label>
                            <ProgressBar className="my-ProgressBar" now={now} label={`${now}%`} /> </Col> */}
                            </Row>
                        </Card.Header>

                        {/* For fillup type quetions */}
                        {type === "Fillup" &&
                        <Card.Body className="my-cardbody-fillups">
                            <Card.Text><div className="question"><NewLine className="box" text={questions[currentQuestionIndex].question} /></div></Card.Text>
                            <Card.Text className="fillups-text">
                                <Form.Group controlId="exampleForm.ControlTextarea1" > 
                                    <h5>Answer</h5>
                                    <Form.Control as="textarea"  rows={3} className="my-input" value={studentResponse} onChange={studentInput}/>
                                </Form.Group>
                                <h6>{displayResponse}</h6>
                                <Button variant="success" onClick={recordAnswer}>Submit</Button> 
                            </Card.Text>
                        </Card.Body> }

                        {/* For editor type questions */}
                        {type === "Editor" &&
                        <Card.Body>
                            {/* <h5>{currentQuestion.question}</h5> */}
                            <CodeQues 
                                question = {questions[currentQuestionIndex].question}
                            />
                        </Card.Body> }

                        <Card.Footer>
                            {!displayFinish && <Button variant="primary"className="my-btn" onClick={onNext}>Next</Button>}
                            {displayFinish && <Button variant="primary" className="my-btn" onClick={onFinish}>Finish</Button>}
                            <Button variant="danger" className="my-btn" onClick={handleShow}>Quit</Button>
                            {/* Show Modal */}
                            <Modal
                                show={showQuitWarning}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                <Modal.Title className="text-center">Quit</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                Are you stuck in answering the questions? Quit and go back to learn.
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Link to="/">
                                    <Button variant="danger" >Quit</Button>
                                </Link>
                                </Modal.Footer>
                            </Modal>
                            {/* Modal closed */}
                        </Card.Footer>
                    </Card>
                </div>
            </div>
        </div>
    );
  }
  
  export default Questions;