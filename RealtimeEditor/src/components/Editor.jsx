import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import ACTIONS from '/Actions.js';

function Editor({ socketRef, roomId, onCodeChange }) {
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

                editorRef.current.on('change', (instance, changes) => {
                    //console.log(changes);

                    const { origin } = changes;
                    const code = instance.getValue();

                    onCodeChange(code);

                    if (origin !== 'setValue') {
                        console.log('working?', code);
                        socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                            roomId,
                            code,
                        });
                    }
                    console.log(code);
                });
            }
        }

        init();
    }, []);

    useEffect(() => {
        // listen for changes from other clients and set it's value onto our editor
        if (socketRef.current != null) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            socketRef.current?.off(ACTIONS.CODE_CHANGE);
        }

    }, [socketRef.current]);


    return (
        <textarea id="realtimeEditor" defaultValue="Realtime Code Editor"></textarea>
    )
}

export default Editor

