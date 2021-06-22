// Author : Pragya

// This file is a copy of basicsetup provide in codemirror 6 edited as per the program requirements

import { highlightSpecialChars, drawSelection, highlightActiveLine, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { history, historyKeymap } from '@codemirror/history';
import { foldGutter, foldKeymap } from '@codemirror/fold';
import { indentOnInput } from '@codemirror/language';
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter';
import { defaultKeymap } from '@codemirror/commands';
import { bracketMatching } from '@codemirror/matchbrackets';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/closebrackets';
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { commentKeymap } from '@codemirror/comment';
import { rectangularSelection } from '@codemirror/rectangular-selection';
import { defaultHighlightStyle } from '@codemirror/highlight';
import { lintKeymap } from '@codemirror/lint';
import { myTheme, myHighlightStyle } from './Style';

export const setupNonEditable = [
    /*@__PURE__*/lineNumbers(),
    defaultHighlightStyle,
    /*@__PURE__*/keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...commentKeymap,
        ...completionKeymap,
        ...lintKeymap
    ])
];

export const setupEditable = [
    /*@__PURE__*/lineNumbers(),
    /*@__PURE__*/highlightActiveLineGutter(),
    /*@__PURE__*/highlightSpecialChars(),
    /*@__PURE__*/history(),
    /*@__PURE__*/foldGutter(),
    /*@__PURE__*/drawSelection(),
    /*@__PURE__*/EditorState.allowMultipleSelections.of(true),
    /*@__PURE__*/indentOnInput(),
    defaultHighlightStyle.fallback,
    /*@__PURE__*/bracketMatching(),
    /*@__PURE__*/closeBrackets(),
    /*@__PURE__*/autocompletion(),
    /*@__PURE__*/rectangularSelection(),
    /*@__PURE__*/highlightActiveLine(),
    /*@__PURE__*/highlightSelectionMatches(),
    /*@__PURE__*/keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...commentKeymap,
        ...completionKeymap,
        ...lintKeymap
    ]),
    myTheme,
    myHighlightStyle
];

