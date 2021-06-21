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
  const [quizUserData, setQuizUserData] = useState(sesssionDetails);

  const [showResults, setShowResults] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isFillupExist, setIsFillupExist] = useState(false);
  var score = 0;

  // Fetching the answer data.
  const {data,isLoading} = FetchData({url: 'https://raw.githubusercontent.com/parayathamsreevidya/PublicRepository/main/Answers.json'});
  const answers = []
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
    var studentanswers = null;
    if(sessionData === null){
        sessionData =  {
            count: 1,
            studentAnswerList: {},
            result: false,
            instructions : false,
            score : 0
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
          question: props.questions[i].question,
          answer: data.answers[i].answer,
          correctness: quizData().studentAnswerList[i+1] === data.answers[i].answer ? 'correct' : 'no score awarded',//contributed by Yash
          score: quizData().studentAnswerList[i+1] === data.answers[i].answer ? score = score + 1 : score = score, 
          // totalQuestions: data.answers.length,
          // verdict: (score/totalQuestions) >= 0.8 ? 'pass' : 'fail',  
          // percentageMarks : score/totalQuestions
        }
        tableData.push(tdData);
      }
    } 
    setTableData(tableData);
    setShowResults(true);
  }


  return (
    <div className="my-instructions">
      
    {showResults &&
      <div>
        <h2 className="text-center my-resultspg">Results</h2>
        <div className="report">
          <Row>
            <Col sm="6" className="text-center"><b>Score :</b> {studentScore()[0]}/{studentScore()[1]}</Col>
            <Col sm="6" className="text-center"><b>Time :</b> {}</Col>
          </Row>
          <Row>
            <Col sm="6" className="text-center"><b>Percentage :</b> {Math.ceil(studentScore()[0]/studentScore()[1]*100)}</Col>
            <Col sm="6" className="text-center"><b>Status :</b> {Math.ceil(studentScore()[0]/studentScore()[1]*100)>= 80 ? 'Pass' :'Fail' }</Col>
          </Row>
        </div>

        {isFillupExist &&<div className="results">
        <TableScrollbar  height="406px">
            <Table striped bordered hover variant="light" className="results-table">
              <thead className="results-thead">
                <tr>
                  <th>#</th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Verdict</th>
                </tr>
              </thead>
              <tbody className="results-tbody">
                <For of={tableData} as={tdData =>
                <tr>
                  <td>{tdData.key}</td>
                  <td><NewLine text={tdData.question}/></td>
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
