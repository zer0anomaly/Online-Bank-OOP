const express = require('express');
const path = require('path');
require('dotenv').config();


const authRoutes = require('./routes/auth.routes');
const registerRoutes = require('./routes/register.routes');
conts balanceRoutes = require('./routes/userinfo/balance.routes') 

const app = express();
const frontEndPath = path.join(__dirname, '../front-end');


// Middleware
app.use(express.json());
app.use(express.static(frontEndPath));

// Routes
app.use('/auth', authRoutes);      
app.use('/register', registerRoutes);    
app.user('/userinfo/balance', balanceRoutes) 

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
