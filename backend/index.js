// IMPORTS
import express from "express";
import dotenv from 'dotenv';

// Initialisation of App
const app = express();

// For using .env for the Environment Variables
dotenv.config();

// PORT initialisation
const PORT = process.env.PORT || 8800;

// Main Init.
app.listen(PORT, ()=>{
  console.log(`PORT: ${PORT}`)
});