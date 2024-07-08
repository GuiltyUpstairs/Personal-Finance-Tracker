// IMPORTS

// Library/Dependency Imports
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';


// Initialisation of App
const app = express();

// For using .env for the Environment Variables>GPT
dotenv.config();

// PORT initialisation
const PORT = process.env.PORT || 8800;

// Pre-defined Middlewares
app.use(express.json()); // Enabling JSON Request
app.use(express.urlencoded({extended: false})); // Enabling URL-encoded request
app.use(cors());

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

// Main Init.
app.listen(PORT, ()=>{
  console.log(`PORT: ${PORT}`)
});