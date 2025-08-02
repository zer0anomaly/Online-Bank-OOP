// server.js
const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth.routes');

const app = express();
const frontEndPath = path.join(__dirname, '../front-end');

// Middleware
app.use(express.json()); // parse JSON body
app.use(express.static(frontEndPath)); // serve HTML, CSS, JS files

// API routes
app.use('/auth', authRoutes); // e.g. POST /auth/login

// Start server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
