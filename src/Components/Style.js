// Author : Pragya

// This file contains styling of the code editor

import {EditorView} from "@codemirror/view"
import {tags, HighlightStyle} from "@codemirror/highlight"

export const myTheme = EditorView.theme({
    "&": {
      color: "white",
      backgroundColor: "#111",
      height: "300px",
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
      color: "orange"
    },
    {
        tag: tags.comment, 
        color: "gray", 
        fontStyle: "italic"
    },
    {
        tag: tags.string,
        color: "skyblue"
    },
    {
        tag: tags.name,
        color: "violet"
    },
    {
        tag: tags.bracket,
        color: "white"
    },
    {
        tag: tags.literal,
        color: "deepskyblue"
    },
    {
        tag: tags.arithmeticOperator,
        color: "orangered"
    },
    {
        tag: tags.operator,
        color: "orangered"
    },
    {
        tag: tags.variableName,
        color: "white"
    },
    ])