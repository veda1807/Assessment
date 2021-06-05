// Author:Sreeevidya

import React, { useEffect, useState } from "react";
import {
    useParams,
    Redirect,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button,Row,Col,Form, Modal  } from 'react-bootstrap';
import NewLine from '../utils/NewLine';
import CodeQues from './CodeQues.js';
import Timer from './Timer';

function Questions(props) {

    //search params
    var { question } = useParams();
    const effectiveQuestionNumber = parseInt(question) - 1;

    // Getting session data
    const sesssionDetails = quizData();
    const [quizUserData, setQuizUserData] = useState(sesssionDetails);
    const studentAnsSessionList = ( sesssionDetails &&  sesssionDetails.studentAnswerList ) || {};
    const studentResponceIfExist = ( sesssionDetails &&  sesssionDetails.studentAnswerList && 
        sesssionDetails.studentAnswerList[question]) || "";
    const count = quizUserData['count'];

    // url path
    const path = props.path; 
    const questions = props.questions;

    // Checking for finish button visibility
    const displayFinish = questions.length === 0 || effectiveQuestionNumber === (questions.length - 1);

    // Checking whether the question number is valid or not
    const isValidQuestionNumber = parseInt(question) === count;

    // Checking the type of the question
    const type = isValidQuestionNumber ? questions[effectiveQuestionNumber].type : 'no-type';

    // State variables
    const [showQuitWarning, setShowQuitWarning] = useState(false);
    const [studentResponse, setStudentResponse] = useState(studentResponceIfExist);
    const [displayResponse, setDisplayResponse] = useState('');
    const [studentAnswerList, setStudentAnswerList] = useState(studentAnsSessionList); 
    const [answeredQuestions, setAnsweredQuestions] = useState(Object.keys(studentAnswerList).length);

    useEffect(() => {
            window.sessionStorage.setItem('quizData', JSON.stringify(quizUserData));
        }, [quizUserData]
    );

    // Getting the data from session.
    function quizData() {
        var sessionData = window.sessionStorage.getItem('quizData');
        if(sessionData === null){
            sessionData =  {
                count: 1,
                studentAnswerList: {}
            }
        }else{
            sessionData = JSON.parse(sessionData);
        }
        return sessionData;
    }
    
    function studentInput(e){
        setStudentResponse(e.target.value);
    }

    function recordAnswer() {
        studentAnswerList[question] = studentResponse; 
        setQuizUserData({
            count: count,
            studentAnswerList: studentAnswerList
        });
        setStudentAnswerList(studentAnswerList);
        setTimeout(() => {
            setDisplayResponse('')
          }, 3000);
        setDisplayResponse('Your response is recorded');
        setAnsweredQuestions(Object.keys(studentAnswerList).length);
    }

    // This method is used to move to next question on clicking on Next button.
    function onNext() {
        setStudentResponse('');
        setDisplayResponse('');
        setQuizUserData({
            count: count+1,
            studentAnswerList: studentAnswerList
        });
    }

    // This method used to show results on clicking the Finish button. 
    function onFinish() {

        let timeString = document.getElementsByClassName("timer")[0].innerText.split(':');
        // console.log(timeString);
        let params = {
            questions: questions,
            timer:[parseInt(timeString[0]), parseInt(timeString[1]), parseInt(timeString[2])],
            studentAnswerList: studentAnswerList
        }
        props.showResults(params);
    }

    // This method is used to close the quit modal.
    function handleClose() {
        setShowQuitWarning(false);
    }

    // This method is used to show the quit modal on clicking on quit button.
    function handleShow() {
        setShowQuitWarning(true);
    }

    return (
        <div>
            { !isValidQuestionNumber &&
                <Redirect to={`${path}/${count}`} /> }
            <div className = "my-questionpg">
                <div className = "sidebar">
                    <div className = "details">
                        <Card className = "my-card">
                            <Card.Header className = "my-card-header">
                                <Row>                          
                                    <Col sm="4"><h5 className="text-left align-middle">Answered questions : {answeredQuestions}/{questions.length}</h5></Col>
                                    <Col sm="4"><h4 className="text-center align-middle">Question {parseInt(question)}</h4></Col>
                                    <Col sm="4"><h5 className="timer text-right align-middle"><Timer /></h5></Col>
                                </Row>
                            </Card.Header>

                        {/* For fillup type questions */}
                            {type === "Fillup" && 
                            <Card.Body className="my-cardbody-fillups">
                                <div className="question">
                                    <NewLine className="box" text={questions[effectiveQuestionNumber].question}/>
                                </div>
                                <div className="fillups-text">
                                    <Form.Group controlId="exampleForm.ControlTextarea1" > 
                                        <h5> Answer </h5>
                                        <Form.Control as="textarea"  rows={3} className="my-input" value={studentResponse} onChange={studentInput}/>
                                    </Form.Group>                               
                                    <Button variant="success" onClick={recordAnswer}>Submit</Button> 
                                    <span className="answer_status"><b>{displayResponse}</b></span>
                                </div>
                             </Card.Body> }

                        {/* For editor type questions */}
                        {type === "Editor" &&
                        <Card.Body>
                            <CodeQues 
                                question = {questions[effectiveQuestionNumber].question}
                            />
                        </Card.Body> }

                            <Card.Footer className = "my-card-footer">
                                <Link to={`${path}/${parseInt(question) + 1}`} >
                                    {!displayFinish && <Button variant="primary" className="my-btn" onClick={onNext}>Next</Button>}
                                </Link>
                                <Link to="/quiz/Results" >
                                    {displayFinish && <Button to="/quiz/Results" variant="primary" className="my-btn" onClick={onFinish}>Finish</Button>}
                                </Link>
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
        </div>
    )
}
  
export default Questions;