// IMPORTS
import express from 'express';
import { addIncome } from '../controllers/income.js';

// Routing Init.
const router = express.Router();

// Test Function 
router.get('/', (req, res)=>{
  res.status(201).json({"Status": "Successful"})
});

// CRUD Operations
router.post('/income', addIncome);

export default router;