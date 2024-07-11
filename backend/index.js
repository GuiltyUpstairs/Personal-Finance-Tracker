// IMPORTS

// Library/Dependency Imports
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';  
// import { read, readdirSync } from "fs";
const url = `mongodb+srv://admin:QXowHEUAMTVWfBcP@financetrackerapp.pad0cng.mongodb.net/finance_tracker?retryWrites=true&w=majority&appName=FinanceTrackerApp`;
// Route Imports
import incomeRoutes from './routes/incomeRoute.js';
import expenseRoutes from './routes/expenseRoute.js';

// Initialisation of App
const app = express();

// For using .env for the Environment Variables>GPT
dotenv.config();

// PORT initialisation
const PORT = process.env.PORT || 8800;

// Pre-defined Middlewares
app.use(express.json()); // Enabling JSON Request
app.use(express.urlencoded({extended: false})); // Enabling URL-encoded request
app.use(cors()); // Enabling Cross-Origin Resource Sharing

// MongoDB Init.
mongoose.connect(url)
  .then(() => {
    console.log('Connection is Established');
  })
  .catch((err) => {
    console.log('Error connecting to the database', err.message);
  });

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
app.use('/api/income', incomeRoutes);
app.use('/api/expense', expenseRoutes);

// Main Init.
app.listen(PORT, ()=>{
  console.log(`PORT: ${PORT}`)
});