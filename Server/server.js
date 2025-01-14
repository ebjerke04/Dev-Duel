const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define a simple route
app.get('/api', (req, res) => {
  res.json({message: 'Hello from backend'});
});

//app.use(express.static(path.join(__dirname, 'dist')));

//app.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, 'dist/index.html'));
//});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});