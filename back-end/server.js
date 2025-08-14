const express = require('express');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const registerRoutes = require('./routes/register.routes');
const balanceRoutes = require('./routes/userinfo/balance.route');
const transferRoutes = require('./routes/transfer.routes');

const app = express();
const frontEndPath = path.join(__dirname, '../front-end');

// Middleware
app.use(express.json());
app.use(express.static(frontEndPath));

// Routes
app.use('/auth', authRoutes);      
app.use('/register', registerRoutes); 
app.use('/userinfo', balanceRoutes);
app.use('/main/transfer', transferRoutes);  // ✅ fixed

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
