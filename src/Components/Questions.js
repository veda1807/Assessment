import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button,Row,Col,InputGroup,Form} from 'react-bootstrap';
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
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            time: 0,
            timer: '00:00:00',
            isFinish: false,
            intervalId: undefined,
            totalTimeTaken: ''
        };
    }

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
            //const answer = currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                isFinish
                //answer
            });
        }
    };

    displayNextQuestion = () => {
        let { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
        this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex + 1
        }), () => {
            this.displayQuestion(questions, currentQuestion, nextQuestion, previousQuestion);
        });
    };

    onFinish = () => {
        const{ intervalId, totalTimeTaken, timer} = this.state;
        clearInterval(intervalId);
        this.setState({
            intervalId: undefined
        });
        this.props.showResults(this.state);
        console.log(this.state.totalTimeTaken);
    }

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

    componentDidMount() {
    
        const {questions, currentQuestion, nextQuestion, previousQuestion} = this.state;
        this.displayQuestion(questions, currentQuestion, nextQuestion, previousQuestion);

        //set timer
        var newintervalId = setInterval(this.updateCountdown.bind(this), 1000);
        this.setState({intervalId: newintervalId});
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
                                
                                <Col sm="6"><h5 className="text-center">Answered questions : 0/{this.state.questions.length}</h5></Col>
                                <Col sm="6"><h3 className="text-center">{this.state.timer}</h3></Col>
                                
                                {/* <Col sm="4"><h5 className="text-right my-deadaline">Deadline : {details[0].Deadline}</h5></Col> */}
                            </Row>
                        </div>  
                    </div>
                    <div>
                        <Card className="my-card">
                            <Card.Header>
                                <Row>
                                <Col><h3 className="text-center">Question {this.state.currentQuestionIndex+1}</h3></Col>
                                {/* <Col sm="6"><label>No of attempts</label>
                                <ProgressBar className="my-ProgressBar" now={now} label={`${now}%`} /> </Col> */}
                                </Row>
                            </Card.Header>

                            {/* For fillup type quetions */}
                            {questionType === "Fillup" &&
                            <Card.Body className="my-cardbody-fillups">
                                <Card.Text><div className="question"><NewLine className="box" text={currentQuestion.question} /></div></Card.Text>
                                <Card.Text className="fillups-text">
                                    <Form.Group controlId="exampleForm.ControlTextarea1" > 
                                        <h5>Answer</h5>
                                        <Form.Control as="textarea" rows={3} className="my-input"/>
                                    </Form.Group>
                                    <Button variant="success">Submit</Button> 
                                </Card.Text>
                            </Card.Body> }

                            {/* For editor type questions */}
                            {questionType === "Editor" &&
                            <Card.Body>
                                <Card.Title></Card.Title>
                                <Card.Text>
                                    <h5>{currentQuestion.question}</h5>
                                    <CodeQues />
                                </Card.Text>
                                <Button variant="success">Submit</Button> 
                            </Card.Body> }

                            <Card.Footer>
                            {!this.state.isFinish && <Button variant="primary"className="my-btn" onClick={this.displayNextQuestion} >Next</Button>}
                            {this.state.isFinish && <Button variant="primary" className="my-btn" onClick={this.onFinish} >Finish</Button>}
                            <Link to="/">
                                <Button variant="danger" className="my-btn"  to="/">Quit</Button>
                            </Link>
                            </Card.Footer>
                        </Card>
                    </div>
                </div>
            </div>
    )};
  }
  
  export default Questions;