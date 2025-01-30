const express = require('express');
const { NodeVM } = require('vm2');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define a simple route
app.post('/api/submit_code', (req, res) => {
  const receivedCode = req.body.code;

  const vm = new NodeVM({
    console: 'redirect',
    sandbox: {testNum: 35},
    timeout: 1000,
  });

  const outputBuffer = [];
  vm.on('console.log', (msg) => {
    outputBuffer.push(msg);
  })

  var programOutput;
  try {
    programOutput = vm.run(receivedCode);

    //console.log(programOutput);
    res.send(outputBuffer.join('\n'));
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
    console.error("Error: ", err.message);
  } 
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});