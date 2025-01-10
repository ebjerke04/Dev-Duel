import React, { useEffect, useState, useRef } from 'react';

import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css';

import './../Styling/syntax_style.css'

const RealTimeCodeEditor = ({ language }) => {
  const [input, setInput] = useState('');
  const highlightRef = useRef(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (highlightRef.current) {
      highlightRef.current.innerHTML = hljs.highlight(input, { language }).value;
    }
  }, [input, language]); // Update highlighting when input or language changes

  return (
    <div class="code-editor-container">
      {/* Highlighted Code */}
      <pre ref={highlightRef} class="highlighted-code"></pre>

      <textarea value={input} onChange={handleInputChange} placeholder="Type your code here..." class="code-editor-textarea"/>
    </div>
  );
};

export default RealTimeCodeEditor;