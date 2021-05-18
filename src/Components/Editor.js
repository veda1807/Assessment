import React, { useEffect, useRef } from 'react'
import { basicSetup, EditorState, EditorView } from '@codemirror/basic-setup';
import { python } from '@codemirror/lang-python';
// import  './index.css';

export default function Editor() {
    const editor = useRef();

    useEffect(() => {
        const state = EditorState.create({
            doc: '',
            extensions: [
                basicSetup, 
                python(),
            ],
        });

        const view = new EditorView({
            state,
            parent: editor.current
        });
                
        return () => {
            view.destroy();
        }
    }, [])

    return (
        <div classname = "editor" ref = {editor}></div>
    )
}