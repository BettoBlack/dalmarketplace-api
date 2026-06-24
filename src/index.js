require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const listingsRouter = require('./routes/listings');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check 
app.get('/', (req, res) => res.json({ status: 'DalMarketplace API running' }));

// Routes
app.use('/api/listings', listingsRouter);

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
