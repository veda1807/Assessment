import React, { useState } from "react";
import Editor from "./Editor.js";
import "./CodeQues.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ButtonGroup, ToggleButton, Row, Col} from 'react-bootstrap';

export default function CodeQues(props) {

    const [view, setView] = useState(null);
    const [result, setResult] = useState("");
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
    const [isQuestion, setIsQuestion] = useState(true);
    const [isEditor, setIsEditor] = useState(false);

    const radios = [
        { name: 'Question', value: '1' },
        { name: 'Editor', value: '2' }
      ];    

    const runCode = () => {
        if (view === null) return;
        const code = view.state.doc.toString();
        setResult(code);
    };

    const toggleState = (e) => {
        if( e.currentTarget.value == '1'){
            setIsQuestion(true);
            setIsEditor(false);
        }else{
            setIsEditor(true);
            setIsQuestion(false);
        }
        setRadioValue(e.currentTarget.value);
    }

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
                        {isQuestion && <div className = "coding-question">
                            {props.question} 
                            {/* <div className = "sample input">
                                sample input
                            </div>
                            <div className = "sample output">
                                sample output
                            </div>  */}
                        </div> }
                        {isEditor && <div className = "code">
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
                        </div>}
                    </div>
                </Col>
                <Col sm="4">
                    <div className="editor-question-btn">
                        <ButtonGroup toggle>
                            {radios.map((radio, idx) => (
                            <ToggleButton
                                className="editor-btn"
                                key={idx}
                                type="radio"
                                variant="secondary"
                                name="radio"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={toggleState}
                            >
                                {radio.name}
                            </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </div>
                    {isEditor && <div className="output">
                        <div className = "output-window">
                            <h6>Output:</h6>
                            <iframe
                                title = "output"
                                srcDoc = {result}
                                frameBorder = "1px"
                                width = "100%"
                                height = "85%"
                                overflow = "auto"
                            />
                        </div>                    
                    </div>}
                </Col>
            </Row>   
        </div>
    )
}
