// Author:Sreevidya

import React, { Component } from "react";
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
            
class Questions extends Component{
    constructor(props){
        super(props);
        this.state ={
            loading: true,
            questions: props.questions,
            currentQuestion: [],
            nextQuestion: [],
            previousQuestion: [],
            answer: [],
            numberOfQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            time: 0,
            timer: '00:00:00',
            isFinish: false,
            intervalId: undefined,
            totalTimeTaken: '',
            text: '',
            studentAnswerList: [], 
            studentResponse: '', 
            // displayResponse: '',
            answeredQuestions: 0
        };
    }
   
// This method is used to close the quit modal.
    studentInput = (e) =>{
        this.setState({
            studentResponse: e.target.value 
        });
    }
    recordAnswer = (e) =>{
        this.setState({
            studentAnswerList: [...this.state.studentAnswerList, this.state.studentResponse],
            // studentResponse: '',
            displayResponse: 'Your response is recorded',
            answeredQuestions: this.state.answeredQuestions + 1
        });
    }
    handleClose(){
        this.setState({show: false});
    }
    
// This method is used to show the quit modal on clicking on quit button.
    handleShow(){
        this.setState({show: true});
    }

//     This method is used to display the question.
    displayQuestion = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
      let { currentQuestionIndex, isFinish } = this.state;
        if( !isEmpty(this.state.questions) ){
            if(currentQuestionIndex >= questions.length - 1){
                isFinish = true;
            }
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                isFinish
            });
        }
    };
    
//     This method is used to move to next question on clicking on Next button.
    displayNextQuestion = () => {
        let { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
        this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            // text: ''
            studentResponse: ''
        }), () => {
            this.displayQuestion(questions, currentQuestion, nextQuestion, previousQuestion);
        });
    };

//    This method used to show results on clicking the Finish button. 
    onFinish = () => {
        const{ intervalId, totalTimeTaken, timer} = this.state;
        clearInterval(intervalId);
        this.setState({
            intervalId: undefined
        });
        this.props.showResults(this.state);
        console.log(this.state.totalTimeTaken);
    }

//     This method is used show the timer.
    updateCountdown(){
        let { time } = this.state;
        time++;
        let minutes = Math.floor(time / 60);
        let hours = Math.floor(minutes / 60);
        let actMinutes = minutes % 60;
        let seconds = time % 60;
      
        seconds = seconds < 10 ? '0' + seconds : seconds; 
        actMinutes = actMinutes < 10 ? actMinutes < 1 ? '00' : '0' + actMinutes : actMinutes;
        hours = hours < 10 ? hours < 1 ? '00' : '0' + hours : hours;

        let timer = ""+hours+":"+actMinutes+":"+seconds;
      
        this.setState({
            time: time,
            timer: timer
        });
    }

//     This method is used to display the first qestion and start the timer.
    componentDidMount() {
    
        const {questions, currentQuestion, nextQuestion, previousQuestion} = this.state;
        this.displayQuestion(questions, currentQuestion, nextQuestion, previousQuestion);

        //set timer
        var newintervalId = setInterval(this.updateCountdown.bind(this), 1000);
        this.setState({intervalId: newintervalId});
    }

//     This method used to store the answer textarea value in to the state.
    onChangeTeaxtarea = (ele) =>{
        this.setState({text:ele.target.value});
    }

    render(){

        const { currentQuestion } = this.state;
        const questionType = currentQuestion.type;

        return (
            <div>  
                <div className="my-questionpg">
                    <div  className="sidebar">
                        <div className="details">
                            <Row>                                
                                <Col sm="6"><h5 className="text-center">Answered questions : {this.state.answeredQuestions}/{this.state.questions.length}</h5></Col>
                                <Col sm="6"><h3 className="text-center">{this.state.timer}</h3></Col>
                            </Row>
                        </div>  
                    </div>
                    <div>
                        <Card className="my-card">
                            <Card.Header>
                                <Row>
                                <Col><h3 className="text-center">Question {this.state.currentQuestionIndex+1}</h3></Col>
                                </Row>
                            </Card.Header>

                            {/* For fillup type quetions */}
                            {questionType === "Fillup" &&
                            <Card.Body className="my-cardbody-fillups">
                                <Card.Text><div className="question"><NewLine className="box" text={currentQuestion.question} /></div></Card.Text>
                                <Card.Text className="fillups-text">
                                    <Form.Group controlId="exampleForm.ControlTextarea1" > 
                                        <h5>Answer</h5>
                                        <Form.Control as="textarea" value={this.state.studentResponse}  rows={3} onChange={this.studentInput} className="my-input"/>
                                    </Form.Group>
                                    <h6>{this.state.displayResponse}</h6>
                                    <Button variant="success" onClick={this.recordAnswer}>Submit</Button> 
                                </Card.Text>
                            </Card.Body> }

                            {/* For editor type questions */}
                            {questionType === "Editor" &&
                            <Card.Body>
                                <Card.Title></Card.Title>
                                <Card.Text>
                                // This was edited by Pragya
                                // The question was sent to CodeQues component as prop
                                    <CodeQues 
                                        question = {currentQuestion.question}
                                    />
                                </Card.Text>

                            </Card.Body> }

                            <Card.Footer>
                                {!this.state.isFinish && <Button variant="primary"className="my-btn" onClick={this.displayNextQuestion}>Next</Button>}
                                {this.state.isFinish && <Button variant="primary" className="my-btn" onClick={this.onFinish} >Finish</Button>}
                                <Button variant="danger" className="my-btn"  onClick={this.handleShow.bind(this)}>Quit</Button>
                                {/* Show Modal */}
                                <Modal
                                    show={this.state.show}
                                    onHide={this.handleClose.bind(this)}
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
                                    <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                                        Close
                                    </Button>
                                    <Link to="/">
                                        <Button variant="danger">Quit</Button>
                                    </Link>
                                    </Modal.Footer>
                                </Modal>
                                {/* Modal closed */}
                            </Card.Footer>
                        </Card>
                    </div>
                </div>
            </div>
    )};
  }
  
  export default Questions;
