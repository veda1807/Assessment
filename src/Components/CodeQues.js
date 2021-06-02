// This file was created by Pragya

// This file sets up the code-editor, output-window and coding question taking question from Questions.js file
import React, { useState } from "react";
import Editor from "./Editor.js";
import "./CodeQues.css"

export default function CodeQues(props) {

    const [view, setView] = useState(null);
    const [result, setResult] = useState("");

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
        <div>
            <div className = "coding-assessment">
                <div className = "question">
                    {props.question}
                    {/* <div className = "sample input">
                        sample input
                    </div>
                    <div className = "sample output">
                        sample output
                    </div> */}
                </div>
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

                    <div className = "output-window">
                        <iframe
                            title = "output"
                            srcDoc = {result}
                            frameBorder = "1px"
                            width = "100%"
                            height = "75px"
                        />
                    </div>                    
                </div>
            </div>
        </div>
    )
}
