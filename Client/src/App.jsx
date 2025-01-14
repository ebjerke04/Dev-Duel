import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

import Home from './Core/Home';
import MainMenu from './Core/MainMenu';
import RealTimeCodeEditor from './Core/CodeEditor';

import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost:5000/api')
      .then((response) => {
        setData(response.data.message);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/editor" element={
          <div style={{ top: "0", left: "0", height: "100%", position: "absolute", display: 'flex', flexDirection: 'row' }}>
            <MainMenu />
            <RealTimeCodeEditor language="javascript"></RealTimeCodeEditor>
          </div>
        }></Route>
      </Routes>
    </Router>
  );
}

export default App;