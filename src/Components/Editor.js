// Author : Pragya

// This file creates a code editor using codemirror 6

import React, { useEffect, useRef } from 'react'
import { EditorState, EditorView } from '@codemirror/basic-setup';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { setupNonEditable, setupEditable } from './Setup';

export default function Editor(props) {
    
    const {
        setView,
        language,
        content,
        editable
    } = props;
    
    const editor = useRef();
    
    useEffect(() => {
        let lang;
        if (language === "python") {
            lang = python()
        }
        else if (language === "java") {
            lang = java()
        }

        let setup;
        if (editable) {
            setup = setupEditable
        }
        else {
            setup = setupNonEditable
        }

        const state = EditorState.create({
            doc: content,
            extensions: [
                EditorView.contentAttributes.of({ contenteditable : editable }),
                setup,
                lang
            ],
        });

        const view = new EditorView({
            state: state,
            parent: editor.current
        });

        setView(view);
                
        return () => {
            view.destroy();
            setView(null);
        }
    }, [language, content, setView, editable])

    return (
        <div className="editor-box" ref = {editor}/>
    )
}
