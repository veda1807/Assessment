import React, { useState } from "react";
import Editor from "./Editor.js";
import "./CodeQues.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Nav} from 'react-bootstrap';
import NewLine from '../utils/NewLine';

export default function CodeQues(props) {

    const [view, setView] = useState(null);
    const [result, setResult] = useState("");
    const [showQuestion, setShowQuestion] = useState(true);
    const [showOutputBox, setShowOutputBox] = useState(false);
    // const [isQuestion, setIsQuestion] = useState(true);
    // const [isEditor, setIsEditor] = useState(false);

    const enableQuestion = () =>{
        setShowQuestion(true);
        setShowOutputBox(false);
    }

    const enableOutputBox = () =>{
        setShowQuestion(false);
        setShowOutputBox(true);
    }

    const runCode = () => {
        if (view === null) return;
        const code = view.state.doc.toString();
        setResult(code);
    };

    const submitCode = () => {
        setResult("Submission yet to be implemented");
    }

    const resetCode = () => {
        setResult("");
    }

    return (
        <div className="code-editor">
            <Row className="editor-grid">
                <Col>
                    <div className = "coding-assessment">
                        <div className = "code">
                            <div className = "editor" id = "editor">
                                <Editor 
                                    setView = {setView}
                                    language = "python"
                                    content = ""
                                />
                            </div>
                            <div className = "btns">
                                <button className = "btn run" onClick = {runCode}> Run </button>
                                <button className = "btn submit" onClick = {submitCode}> Submit </button>
                                <button className = "btn reset" onClick = {resetCode}> Reset </button>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col sm="4">
                    <Nav fill variant="tabs">
                        <Nav.Item>
                            <Nav.Link onClick={enableQuestion}><b>Question</b></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={enableOutputBox}><b>Output</b></Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {showOutputBox && <div className="output">
                        <div className = "output-window">
                            <h6>Output:</h6>
                            <iframe
                                title = "output"
                                srcDoc = {result}
                                frameBorder = "1px"
                                width = "100%"
                                height = "300px"
                                margin-top = "8%"
                                overflow = "auto"
                            />
                        </div>                    
                    </div>}
                    {showQuestion && <div className = "coding-question">
                        <NewLine  text= {props.question} />
                    </div>}
                </Col>
            </Row>   
        </div>
    )
}