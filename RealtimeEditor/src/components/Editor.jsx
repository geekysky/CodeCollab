import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';

function Editor() {
    const editorRef = useRef(null);

    useEffect(() => {
        async function init() {
            if (!editorRef.current) {
                editorRef.current = CodeMirror.fromTextArea(document.getElementById('realtimeEditor'), {
                    mode: { name: 'javascript', json: true },
                    theme: 'dracula',
                    lineNumbers: true,
                    autoCloseBrackets: true,
                    autoCloseTags: true,
                });
            }
        }
        
        init();
    }, []);

    return (
        <textarea id="realtimeEditor">Realtime Code Editor</textarea>
    )
}

export default Editor

