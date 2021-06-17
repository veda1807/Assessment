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
  const {data,isLoading} = FetchData({url: 'https://raw.githubusercontent.com/parayathamsreevidya/PublicRepository/main/Answers.json'});
 
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
            studentAnswerList: {},
            result: false,
            instructions : false
        }
    }else{
        sessionData = JSON.parse(sessionData);
    }
    return sessionData;
  }


  // This code is used to prepare result data to display in the table.
  if(!isLoading && !showResults){
    let tableData = [];
    for(let i =0; i < props.questions.length; i++){
      if(props.questions[i].type === "Fillup" ){
        setIsFillupExist(true);
        let tdData = {
          key: props.questions[i].key,
          question: props.questions[i].question,
          answer: data.answers[i].answer
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

    difference += (hours == 0 ? '00:' : hours < 10 ? `0${hours}:` : `${hours}:`);

    difference += (minutes == 0 ? '00:' : minutes < 10 ? `0${minutes}:` : `${minutes}:`); 

    difference += (seconds == 0 ? '00:' : seconds < 10 ? `0${seconds}` : `${seconds}`);  

    return difference;
  }


  return (
    <div className="my-instructions">
      
    {showResults &&
      <div>
        <h2 className="text-center my-resultspg">Results</h2>
        <div className="report">
          <Row>
            <Col sm="6" className="text-center"><b>Score:</b></Col>
            <Col sm="6" className="text-center"><b>Time:{diffTime}</b></Col>
          </Row>
          <Row>
            <Col sm="6" className="text-center"><b>Percentage</b>:</Col>
            <Col sm="6" className="text-center"><b>Status:</b></Col>
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
                  <th>Correctness</th>
                </tr>
              </thead>
              <tbody className="results-tbody">
                <For of={tableData} as={tdData =>
                <tr>
                  <td>{tdData.key}</td>
                  <td><NewLine text={tdData.question}></NewLine></td>
                  <td>{tdData.answer}</td>
                  <td></td>
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
