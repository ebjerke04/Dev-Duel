import React, { useEffect, useState, useRef } from 'react';

import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css';

import axios from 'axios';

import MainMenu from './MainMenu';

import './../Styling/syntax_style.css'
import './../Styling/main_style.css';

const RealTimeCodeEditor = ({ language }) => {
  const [input, setInput] = useState('');
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Functionality of code editor
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
    } else if (e.key == '(') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const newValue = input.substring(0, selectionStart) + '()' + input.substring(selectionEnd);
      setInput(newValue);

      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
      }, 0);
    } else if (e.key == ')') {
      const { selectionStart, selectionEnd } = e.target;
      const previousChar = input[selectionStart - 1];
      const currentChar = input[selectionStart];

      if (previousChar == '(' && currentChar == ')')
      {
        e.preventDefault();

        setTimeout(() => {
          e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
        }, 0);
      }
    } else if (e.key == '"') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const newValue = input.substring(0, selectionStart) + '""' + input.substring(selectionEnd);
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
  
  // Perform syntax highlighting
  const highlightRef = useRef(null);
  useEffect(() => {
    if (highlightRef.current) {
      highlightRef.current.innerHTML = hljs.highlight(input, { language }).value;
    }
  }, [input, language]);

  // Use Axios to send post request to server containing user's code
  const [isLoading, setIsLoading] = useState(false);
  const [codeOutput, setOutput] = useState("");
  const uploadCodeToServer = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/submit_code", {
        code: input,
      });
      console.log(response.data);
      setOutput(response.data);
    } catch (err) {
      console.error('Error: ', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-container">
      <MainMenu />
      <div className="test">
        <div className="code-editor-container" style={{ width: "800px", height: "600px" }}>
          <pre ref={highlightRef} className="highlighted-code"></pre>

          <textarea value={input} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="Type your code here..." className="code-editor-textarea"/>
        </div>

        <button onClick={uploadCodeToServer} disabled={isLoading}>Submit: {isLoading ? 'Sending...' : 'Send Request'}</button>
        <h1>{codeOutput}</h1>
      </div>
      
    </div>
  );
};

export default RealTimeCodeEditor;