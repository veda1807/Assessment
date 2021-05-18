import React, { useState } from "react";
import Editor from "./Editor.js";

export default function CodeQues() {

    const [py, setPy] = useState("")

    return (
        <div className = "coding-question">
            <div className = "code-area">
                <div className = "editor-window">
                    <Editor
                    language = "python"
                    displayName = "Code-Editor"
                    value = {py}
                    onChange = {setPy}
                    />
                </div>
                <div className = "output-window">
                    <iframe
                    srcDoc = {py}
                    title = "output"
                    sandbox = "allow-scripts"
                    frameBorder = "0"
                    height = "100%"
                    width = "50%"
                    
                    />
                </div>
            </div>
            <div className = "result">
                2/5 testcases passed
            </div>
            <div className = "nav">
                <button type="button" class="btn btn-info">Next</button>
            </div>
        </div>
    )
}
