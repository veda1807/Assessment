import React, { useState } from "react";
import Editor from "./Editor"

export default function CodeQues() {

    const [py, setPy] = useState("")

    return (
        <div className = "coding-question">
            <div className = "ques">
                question 1
            </div>
            <div className = "sample input">
                12345
            </div>
            <div className = "sample output">
                12345
            </div>
            <div className = "code-area">
                <div className = "editor-window">
                    <Editor
                    // language = "text/x-java"
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
                    width = "100%"
                    />
                </div>
            </div>
            {/* <div className = "result">
                2/5 testcases passed
            </div>
            <div className = "nav">
                <button>Next</button>
            </div> */}
        </div>
    )
}
