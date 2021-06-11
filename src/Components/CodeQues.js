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
    const [openQues, setOpenQues] = useState(true);
    const [openEditor, setOpenEditor] = useState(true);

    const runCode = () => {
        if (view === null) return;
        const code = view.state.doc.toString();
        setResult(code);
    };

    const submitCode = () => {
        setResult("Submission yet to be implemented");
    }

    if ((openQues && openEditor) || (!openQues && !openEditor)){
        return (
            <div className = "row">
                <div className = "col-md-5 col-sm-12">
                    <div className = "sec-title d-none d-md-block">
                        <Nav fill variant = "tabs">
                            <Nav.Item>
                            <Nav.Link
                                    onClick = {
                                        () => setOpenQues(prevOpen => !prevOpen)
                                    }
                                > 
                                    PROBLEM STATEMENT
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <div className = "coding-question">
                        <NewLine text= {props.question["problem"]} />                        
                        {props.question["sample"] != null && 
                            <div>
                                {props.question["sample"].map(sample => (
                                <div className = "sample-testcase" key = {sample.id}>
                                    <div className = "heading">
                                        Sample Input {sample.id}
                                    </div>
                                    <div className = "data">
                                        {<NewLine text = {sample.input}/>}
                                    </div>
                                    <div className = "heading">
                                        Sample Output {sample.id}
                                    </div>
                                    <div className = "data">
                                        {<NewLine text = {sample.output}/>}
                                    </div>
                                </div>
                                ))}
                                <div className = "explanation">
                                    <div className = "heading">Explanation</div>
                                    <NewLine text = {props.question["explanation"]} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className = "col-md-7 col-sm-12" >
                <div className = "sec-title d-none d-md-block">
                        <Nav fill variant = "tabs">
                            <Nav.Item>
                                <Nav.Link
                                    onClick = {
                                        () => setOpenEditor(prevOpen => !prevOpen)
                                    }
                                > 
                                    CODE EDITOR 
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <div className = "editor" id = "editor">
                        <Editor 
                            setView = {setView}
                            language = {props.question["language"]}
                            content = {props.question["snippet"]}
                        />
                        <Button variant="outline-success" className = "editor-btns submit" size = "sm" onClick = {submitCode}> Submit </Button>
                        <Button variant="outline-success" className = "editor-btns run" size = "sm" onClick = {runCode}> Run </Button>
                        {/* <Button variant="outline-primary" className = "editor-btns reset" size = "sm" onClick = {resetCode}> Reset </Button> */}
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

    else if (!openEditor){
        return (
            <div className = "row">
                <div className = "col-md-1 col-sm-12">
                    <div className = "sec-title">
                        <Nav fill variant = "tabs">
                            <Nav.Item>
                            <Nav.Link
                                    onClick = {
                                        () => setOpenQues(prevOpen => !prevOpen)
                                    }
                                > 
                                    P<br/>R<br/>O<br/>B<br/>L<br/>E<br/>M<br/> <br/>S<br/>T<br/>A<br/>T<br/>E<br/>M<br/>E<br/>N<br/>T
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>
                <div className = "col-md-11 col-sm-12" >
                <div className = "sec-title">
                        <Nav fill variant = "tabs">
                            <Nav.Item>
                                <Nav.Link
                                    onClick = {
                                        () => setOpenEditor(prevOpen => !prevOpen)
                                    }
                                > 
                                    CODE EDITOR 
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <div className = "editor" id = "editor">
                        <Editor 
                            setView = {setView}
                            language = {props.question["language"]}
                            content = {props.question["snippet"]}
                        />
                        <Button variant="outline-success" className = "editor-btns submit" size = "sm" onClick = {submitCode}> Submit </Button>
                        <Button variant="outline-success" className = "editor-btns run" size = "sm" onClick = {runCode}> Run </Button>
                        {/* <Button variant="outline-primary" className = "editor-btns reset" size = "sm" onClick = {resetCode}> Reset </Button> */}
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
    else if (!openQues){
        return (
            <div className = "row">
                <div className = "col-md-11 col-sm-12">
                    <div className = "sec-title">
                        <Nav fill variant = "tabs">
                            <Nav.Item>
                            <Nav.Link
                                    onClick = {
                                        () => setOpenQues(prevOpen => !prevOpen)
                                    }
                                > 
                                    PROBLEM STATEMENT
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <div className = "coding-question">
                            <NewLine text= {props.question["problem"]} />                        
                            {props.question["sample"] != null && 
                                <div>
                                    {props.question["sample"].map(sample => (
                                    <div className = "sample-testcase" key = {sample.id}>
                                        <div className = "heading">
                                            Sample Input {sample.id}
                                        </div>
                                        <div className = "data">
                                            {<NewLine text = {sample.input}/>}
                                        </div>
                                        <div className = "heading">
                                            Sample Output {sample.id}
                                        </div>
                                        <div className = "data">
                                            {<NewLine text = {sample.output}/>}
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            }
                            {props.question["explanation"] != null &&
                                <div className = "explanation">
                                    <div className = "heading">Explanation</div>
                                    <NewLine text = {props.question["explanation"]} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className = "col-md-1 col-sm-12" >
                <div className = "sec-title">
                        <Nav fill variant = "tabs"  className = "flex-column" >
                            <Nav.Item>
                                <Nav.Link
                                    onClick = {
                                        () => setOpenEditor(prevOpen => !prevOpen)
                                    }
                                > 
                                    C<br/>O<br/>D<br/>E<br/> <br/>E<br/>D<br/>I<br/>T<br/>O<br/>R 
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>
            </div>
        )
    }
}