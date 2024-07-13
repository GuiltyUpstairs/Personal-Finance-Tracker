// IMPORTS

// Library/Dependency Imports
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';  

// Route Imports
import authRoutes from './routes/authRoute.js'
import incomeRoutes from './routes/incomeRoute.js';
import expenseRoutes from './routes/expenseRoute.js';
import userRoutes from './routes/userRoute.js';

// Initialisation of App
const app = express();

// For using .env for the Environment Variables>GPT
dotenv.config();

// PORT initialisation
const PORT = process.env.PORT || 8800;

// Pre-defined Middlewares
app.use(cookieParser()); // Enabling Cookie Parser
app.use(express.json()); // Enabling JSON Request
app.use(express.urlencoded({extended: false})); // Enabling URL-encoded request
app.use(cors()); // Enabling Cross-Origin Resource Sharing

// MongoDB Init.
const connectDB = ()=>{
  mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log('Connection is Established');
  })
  .catch((err) => {
    console.log('Error connecting to the database', err.message);
  });
}

// Controllers Error Handling
app.use((err, req, res, next)=>{
  const errorStatus = err.status || 501;
  const errorMessage = err.message || "Status: Error";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage
  });
});

// User-defined Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/users', userRoutes);

// Main Init.
app.listen(PORT, ()=>{
  connectDB()
  console.log(`PORT: ${PORT}`)
});