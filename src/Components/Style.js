// This file was created Pragya

// 

import {EditorView} from "@codemirror/view"
import {tags, HighlightStyle} from "@codemirror/highlight"

export const myTheme = EditorView.theme({
    "&": {
      color: "white",
      backgroundColor: "#111",
      height: "200px",
      width: "100%",
      fontSize: "large"
    },
    ".cm-content": {
      caretColor: "#000",
      margin: 0
    },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: "#fff"
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "#034"
    },
    ".cm-gutters": {
      backgroundColor: "#333",
      color: "#eee",
      border: "none"
    },
    ".cm-lineWrapping": {
        whiteSpace: "break-spaces",
        overflowWrap: "word-break"
    },
  }, {dark: true})

export const myHighlightStyle = HighlightStyle.define([
    {
      tag: tags.keyword, 
      color: "#E6B0AA"
    },
    {
        tag: tags.comment, 
        color: "#aaa", 
        fontStyle: "italic"
    },
    {
        tag: tags.string,
        color: "#D2B4DE"
    },
    {
        tag: tags.name,
        color: "#F5CBA7"
    },
    {
        tag: tags.bracket,
        color: "#F5CBA7"
    },
    {
        tag: tags.literal,
        color: "#A9CCE3"
    }
    ])
