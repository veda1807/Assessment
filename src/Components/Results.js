// Author:Sreeevidya

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table,Row,Col} from 'react-bootstrap';
import TableScrollbar from 'react-table-scrollbar';
import { For } from 'react-loops';
import NewLine from '../utils/NewLine';
import FetchData from "../utils/FetchData";

function Results(props) {

  // fetching session data
  const sesssionDetails = quizData();
  sesssionDetails['result'] = true;
  sesssionDetails['instructions'] = true;
  const endTime = sesssionDetails['endTime'];
  if(endTime === null){
    sesssionDetails['endTime'] = new Date();
  } 
  const [quizUserData] = useState(sesssionDetails);

  const startTime = sesssionDetails['startTime'];

  const [showResults, setShowResults] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isFillupExist, setIsFillupExist] = useState(false);

  const diffTime = timeDiffCalc(new Date(startTime), new Date(endTime));

  // Fetching the answer data.

  const {data,isLoading} = FetchData({url: 'http://localhost:4000/answerkey'});

  const studentData = {
    "attemptedQuestions" : props.studentAnswerList.length,
    "studentResponses" : props.studentAnswerList,
    "timeTaken" : diffTime
  }

  fetch("http://localhost:4000/answers", {
    method : "POST",
    body : JSON.stringify(studentData),
    headers : {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
  
  useEffect(() => { 
      window.sessionStorage.setItem('quizData', JSON.stringify(quizUserData));
    }, [quizUserData]
  );

  function studentScore() {
    var score = 0;
    var totalFillupQuestion = 0;
    for(let i =0; i < props.questions.length; i++){
      if(props.questions[i].type === "Fillup" ){
        totalFillupQuestion =  totalFillupQuestion + 1
        if (props.questions[i].key === data.answers[i].key){
          if (data.answers[i].answer === quizData().studentAnswerList[i+1]){
            score = score + 1
          }
        }
      }
    }
    return [score,totalFillupQuestion]
  }
  // Getting the data from session.
  function quizData() {
    var sessionData = window.sessionStorage.getItem('quizData');
    if(sessionData === null){
        sessionData =  {
            count: 1,
            studentAnswerList: {},
            result: false,
            instructions : false,
        }
    }else{
        sessionData = JSON.parse(sessionData);
    }
    return sessionData;
  }


  let tdData = {}
  // This code is used to prepare result data to display in the table.
  if(!isLoading && !showResults){
    let tableData = [];
    for(let i =0; i < props.questions.length; i++){
      if(props.questions[i].type === "Fillup" ){
        setIsFillupExist(true);         
        tdData = {
          key: props.questions[i].key,
          // question: props.questions[i].question.problem +"\n"+ props.questions[i].question.snippet,
          stuans: quizData().studentAnswerList[i+1],
          answer: data.answers[i].answer,
        // Edited by Yash
          correctness: quizData().studentAnswerList[i+1] === data.answers[i].answer ? 'correct' : 'no score awarded'
        }
        tableData.push(tdData);
      }
    } 
    setTableData(tableData);
    setShowResults(true);
  }

  function timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    // calculate seconds
    const seconds = Math.floor(diffInMilliSeconds) % 60;

    let difference = '';
    if (days > 0) {
      difference += (days === 1) ? `${days}` : `${days} `;
    }

    difference += (hours === 0 ? '00:' : hours < 10 ? `0${hours}:` : `${hours}:`);

    difference += (minutes === 0 ? '00:' : minutes < 10 ? `0${minutes}:` : `${minutes}:`); 

    difference += (seconds === 0 ? '00:' : seconds < 10 ? `0${seconds}` : `${seconds}`);  

    return difference;
  }

  return (
    <div className="my-instructions">
      
    {showResults &&
      <div>
        <h2 className="text-center my-resultspg">Results</h2>
        <div className="report">
          <Row>
            <Col sm="6" className="text-left header"><b>Score :</b> {studentScore()[0]}/{studentScore()[1]}</Col>
            <Col sm="6" className="text-left header"><b>Time :</b> {diffTime}</Col>
          </Row>
          <Row>
            <Col sm="6" className="text-left header"><b>Percentage :</b> {Math.ceil(studentScore()[0]/studentScore()[1]*100)}</Col>
            <Col sm="6" className="text-left header"><b>Status :</b> {Math.ceil(studentScore()[0]/studentScore()[1]*100)>= 80 ? 'Pass' :'Fail' }</Col>         
          </Row>
        </div>

        {isFillupExist &&<div className="results">
        <TableScrollbar  height="406px">
            <Table striped bordered hover variant="light" className="results-table">
              <thead className="results-thead">
                <tr>
                  <th>#</th>
                  <th>Your Answer</th>
                  <th>Correct Answer</th>
                  <th>Verdict</th>
                </tr>
              </thead>
              <tbody className="results-tbody">
                <For of={tableData} as={tdData =>
                <tr>
                  <td>{tdData.key}</td>
                  <td><NewLine text={tdData.stuans}/></td>
                  <td><NewLine text={tdData.answer}/></td>
                  {/* Edited by yash */}
                  <td>{tdData.correctness}</td>
                </tr>
               }/>
              </tbody>
            </Table>
          </TableScrollbar>
        </div>}
      </div>}
    </div>
  );
}

export default Results;
