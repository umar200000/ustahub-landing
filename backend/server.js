const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const contentRoutes = require('./routes/content');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Public API routes
app.use('/api', contentRoutes);

// Admin API routes
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'UstaHub API is running' });
});

// Global error handler — returns real error message instead of empty 500
app.use((err, req, res, next) => {
  console.error(`Error on ${req.method} ${req.path}:`, err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`UstaHub Backend running on http://localhost:${PORT}`);
});
