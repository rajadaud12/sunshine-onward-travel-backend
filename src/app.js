// backend/src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./features/auth/auth.routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

// Add other feature routes here later (e.g., booking, chat)

module.exports = app;