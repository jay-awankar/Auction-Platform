import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
// const bcrypt = require('bcryptjs');
import pkg from 'jsonwebtoken';
const { verify } = pkg
// const jwt = require('jsonwebtoken');
import dotenv from 'dotenv'
dotenv.config()

import { userSignIn, userSignUp } from './routes/User.routes.js';
import { deleteAuctionItemById, getAllAuctionItems, postAuctionItem } from './routes/Auction.routes.js';
import { setBid } from './routes/Bid.route.js';

const app = express();
app.use(json());
//cors will help server to accept requests from multiple domains
app.use(cors());

const SECRET_KEY = 'my_super_secret_123!';

connect(process.env.MONGO_URI);

// Start the server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });

// Middleware to verify token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.user = user;
    next();
  });
};


// Signup Route
app.post('/Signup', userSignUp);

// Signin Route
app.post('/signin', userSignIn);

// Create Auction Item (Protected)
app.post('/auction', authenticate, postAuctionItem);

// Get all auction items
app.get('/auctions', getAllAuctionItems);

// Get a single auction item by ID
app.get('/auctions/:id', );

// Bidding on an item (Protected)
app.post('/bid/:id', authenticate, setBid);

// Deleting an Item (Protected)
app.delete('/auction/:id', authenticate, deleteAuctionItemById)