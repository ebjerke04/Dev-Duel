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

  const handleKeyDown = (e) => {
    if (e.key == 'Tab') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const newValue = input.substring(0, selectionStart) + '  ' + input.substring(selectionEnd);
      setInput(newValue);
      
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 2; // Move cursor after the two spaces
      }, 0);
    } else if (e.key == '{') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const newValue = input.substring(0, selectionStart) + '{}' + input.substring(selectionEnd);
      setInput(newValue);

      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
      }, 0);
    } else if (e.key == 'Enter') {
      e.preventDefault();

      const { selectionStart, selectionEnd } = e.target;

      const currentLineStart = input.lastIndexOf('\n', selectionStart - 1) + 1;
      const currentLine = input.substring(currentLineStart, selectionStart);
      const leadingSpaces = currentLine.match(/^\s*/)?.[0] ?? '';

      const previousChar = input[selectionStart - 1];
      const currentChar = input[selectionStart];

      if (previousChar == '{' && currentChar == '}') {
        const newValue = input.substring(0, selectionStart) + '\n' + leadingSpaces + '  \n' + leadingSpaces + input.substring(selectionEnd);
        setInput(newValue);

        setTimeout(() => {
          e.target.selectionStart = e.target.selectionEnd = selectionStart + 3 + leadingSpaces.length;
        }, 0);
      } else if (previousChar == '{') {
        const newValue = input.substring(0, selectionStart) + '\n  ' + leadingSpaces + input.substring(selectionEnd);
        setInput(newValue);
        
        setTimeout(() => {
          e.target.selectionStart = e.target.selectionEnd = selectionStart + 3 + leadingSpaces.length;
        });
      } else {
        const newValue = input.substring(0, selectionStart) + '\n' + leadingSpaces + input.substring(selectionEnd);
        setInput(newValue);

        setTimeout(() => {
          e.target.selectionStart = e.target.selectionEnd = selectionStart + 1 + leadingSpaces.length;
        }, 0);
      }
    }
  }

  useEffect(() => {
    if (highlightRef.current) {
      highlightRef.current.innerHTML = hljs.highlight(input, { language }).value;
    }
  }, [input, language]);

  return (
    <div className="code-editor-container">
      <pre ref={highlightRef} className="highlighted-code"></pre>

      <textarea value={input} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="Type your code here..." className="code-editor-textarea"/>
    </div>
  );
};

export default RealTimeCodeEditor;