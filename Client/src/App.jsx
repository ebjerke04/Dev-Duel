import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import RealTimeCodeEditor from './Core/SyntaxHighlighter';

function App() {
  /*
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost:5000/api/data')
      .then((response) => {
        setData(response.data.message);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>React-Node.js Integration</h1>
      {data ? <p>{data}</p> : <p>Loading...</p>}
    </div>
  );
  */

  const sampleCode = `
    function sayHello() {
      console.log("bruh");
    }

    sayHello();
  `;

  return (
    <div>
      <h1>Code highlighting example</h1>
      <RealTimeCodeEditor language="javascript"></RealTimeCodeEditor>
    </div>
  );
}

export default App;