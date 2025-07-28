// back-end/server.js
const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, '../front-end')));

// Sample backend API route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Your login logic here
  res.json({ success: true, message: 'Logged in!' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
