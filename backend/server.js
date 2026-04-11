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

app.listen(PORT, () => {
  console.log(`UstaHub Backend running on http://localhost:${PORT}`);
});
