const express = require('express');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const registerRoutes = require('./routes/register.routes'); // 👈 ADD THIS

const app = express();
const frontEndPath = path.join(__dirname, '../front-end');

// Middleware
app.use(express.json());
app.use(express.static(frontEndPath));

// Routes
app.use('/auth', authRoutes);      // Handles /auth/login
app.use('/register', registerRoutes);      // Handles /register ✅

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
