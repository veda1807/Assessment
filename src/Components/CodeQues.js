// Author : Pragya

// This file contains the design and functionality of the coding questions

import React, { useState } from "react";
import Editor from "./Editor.js";
import "./../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import NewLine from '../utils/NewLine';

export default function CodeQues(props) {

    const [view, setView] = useState(null);
    const [result, setResult] = useState("");
    const [open, setOpen] = useState(false);

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
        <div className = "row">
            <div className = {`col-md-${open ? '5' : '4'} col-sm-12`}>
                <div className = "coding-question">
                    <div className = "sec-title">
                        Question
                        <Button 
                            className="open-close-btn d-none d-md-block" 
                            onClick = {
                                () => setOpen(prevOpen => !prevOpen)
                            }
                        >
                            O/C
                        </Button> 
                    </div>
                    <NewLine text= {props.question} />                        
                </div>
            </div>
            <div className = {`col-md-${open ? '7' : '8'} col-sm-12`} >
                <div className = "editor" id = "editor">
                    <div className = "sec-title">
                        Editor
                        <Button 
                            className="open-close-btn d-none d-md-block" 
                            onClick = {
                                () => setOpen(prevOpen => !prevOpen)
                            }
                        >
                            O/C
                        </Button> 
                    </div>
                    <Editor 
                        setView = {setView}
                        language = "python"
                        content = ""
                    />
                    <Button className = "editor-btns run" size = "sm" onClick = {runCode}> Run </Button>
                    <Button className = "editor-btns submit" size = "sm" onClick = {submitCode}> Submit </Button>
                    <Button className = "editor-btns reset" size = "sm" onClick = {resetCode}> Reset </Button>
                    <iframe
                        title = "output"
                        srcDoc = {result}
                        frameBorder = "1px"
                        width = "100%"
                        height = "100px"
                    />                    
                </div>
            </div>
        </div>
    )
}