import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

import Home from './Core/Home';
import RealTimeCodeEditor from './Core/CodeEditor';

import './App.css';

function App() {
  const [data, setData] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/editor" element={<RealTimeCodeEditor language="javascript" />}></Route>
      </Routes>
    </Router>
  );
}

export default App;