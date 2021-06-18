// Author:Sreeevidya

import React, { useEffect, useState } from "react";
import {
    useParams,
    Redirect,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col, Form, Modal } from 'react-bootstrap';
import NewLine from '../utils/NewLine';
import CodeQues from './CodeQues.js';
import Editor from './Editor';

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
    const startTime = quizUserData['startTime'];
    const showResult = quizUserData['result'];
        
    // url path
    const path = props.path; 
    const questions = props.questions;
    const backnav = props.config["backnav"];
    
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
        }, [quizUserData,studentResponse]
    );
    
    // For setting Editor view
    const [view, setView] = useState(null);
    
        
    // Getting the data from session.
    function quizData() {
        var sessionData = window.sessionStorage.getItem('quizData');
        if (sessionData === null) {
            sessionData =  {
            count: 1,
            studentAnswerList: {},
            result: false,
            instructions : false,
            startTime: new Date(),
            endTime : null
        }
    } else {
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
            studentAnswerList: studentAnswerList,
            result: false,
            instructions : false,
            startTime: startTime,
            endTime : null
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
        var nextQuesAns = ((parseInt(question) + 1) < questions.length && sesssionDetails &&  sesssionDetails.studentAnswerList && 
            sesssionDetails.studentAnswerList[parseInt(question) + 1]) || "";
        setStudentResponse(nextQuesAns);
        setDisplayResponse('');
        setQuizUserData({
            count: count+1,
            studentAnswerList: studentAnswerList,
            result: false,
            instructions : false,
            startTime: startTime,
            endTime : null
        });
        if (document.getElementById("output_frame"))
            clearIframe();
    }
    
    // This method is used to move to previous question on clicking on Back button -> Written by Pragya
    function onPrevious() {
        var prevQuesAns = ((parseInt(question) - 1) < questions.length && sesssionDetails &&  sesssionDetails.studentAnswerList && 
            sesssionDetails.studentAnswerList[parseInt(question) - 1]) || "";
        setStudentResponse(prevQuesAns);
        setDisplayResponse('');
        setQuizUserData({
            count: count-1,
            studentAnswerList: studentAnswerList,
            result: false,
            instructions : false,
            startTime: startTime,
            endTime : null
        });
        if (document.getElementById("output_frame"))
            clearIframe();
    }

    //This method is used to clear the output iframe in editor questions on navigation to next or previous question -> Written by Pragya
    function clearIframe() {
        var iframe = document.getElementById("output_frame")
        var html = ""
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(html);
        iframe.contentWindow.document.close();
    }
    
    // This method used to show results on clicking the Finish button. 
    function onFinish() {
        let params = {
            questions: questions, 
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
        // Last edited by : Pragya 
        <div>
            { !isValidQuestionNumber &&
                <Redirect to={`${path}/${count}`} /> }
            { showResult && 
                <Redirect to='/quiz/Results' />}
            <div className = "my-questionpg">
                <div className = "sidebar">
                    <div className = "details">
                        <Card className = "my-card">
                            <Card.Header className = "my-card-header">
                                <Row>                          
                                    <Col sm="6"><h4 className="text-left align-middle">Question {parseInt(question)}</h4></Col>
                                    <Col sm="6"><h5 className="text-right align-middle">Answered questions : {answeredQuestions}/{questions.length}</h5></Col>
                                </Row>
                            </Card.Header>

                        {/* For fillup type questions */}
                            {type === "Fillup" && 
                            <Card.Body className="my-cardbody-fillups">
                                <div className="question">
                                    <NewLine text={questions[effectiveQuestionNumber].question["problem"]} />
                                    <Editor 
                                        setView = {setView}
                                        language = {questions[effectiveQuestionNumber].question["language"]}
                                        content = {questions[effectiveQuestionNumber].question["snippet"]}
                                        editable = {false}
                                    />
                                </div>
                                <div className="fillups-text">
                                    <Form.Group controlId="exampleForm.ControlTextarea1" > 
                                        <h5> Answer </h5>
                                        <Form.Control as="textarea"  rows={5} className="my-input" value={studentResponse} onChange={studentInput}/>
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
                                {backnav && <Link to={`${path}/${parseInt(question) - 1}`} >
                                    {effectiveQuestionNumber === 0 ?
                                        <Button variant="primary" className="my-btn back" disabled>Back</Button> :
                                        <Button variant="primary" className="my-btn back" onClick={onPrevious}>Back</Button>
                                    }
                                </Link>}
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