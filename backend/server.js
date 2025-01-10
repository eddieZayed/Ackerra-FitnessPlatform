// server.js

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const supplementRoutes = require('./routes/supplementRoutes');
const sportsRoutes = require('./routes/sportsRoutes');
const chatRoutes = require('./routes/chatRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const trainingRoutes = require('./routes/trainingRoutes');
const storeRoutes = require('./routes/storeRoutes');
const productRoutes = require('./routes/productRoutes'); 
const cartRoutes = require('./routes/cartRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', //frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Serve images from "public/images"
app.use('/images', express.static('public/images'));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/supplements', supplementRoutes);
app.use('/api/sports', sportsRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/products', productRoutes); 
app.use('/api/cart', cartRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
