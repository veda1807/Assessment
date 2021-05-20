
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table,Row,Col} from 'react-bootstrap';
import TableScrollbar from 'react-table-scrollbar';
import { For } from 'react-loops';
import NewLine from '../utils/NewLine'

function Results(props) {
  return (
    <div className="my-instructions">
      <h2 className="text-center my-resultspg">Results</h2>
      <div className="report">
        <Row>
          <Col sm="6" className="text-center"><b>Score:</b></Col>
          <Col sm="6" className="text-center"><b>Time:{props.timeTaken}</b></Col>
        </Row>
        <Row>
          <Col sm="6" className="text-center"><b>Percentage</b>:</Col>
          <Col sm="6" className="text-center"><b>Status:</b></Col>
        </Row>
      </div>

      <div className="results">
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
            <For of={props.questions} as={question =>
              <tr>
                <td>{question.key}</td>
                <td><NewLine text={question.question}></NewLine></td>
                <td></td>
                <td></td>
              </tr>
              }/>
            </tbody>
          </Table>
        </TableScrollbar>
      </div>
    </div>
  );
}

export default Results;
