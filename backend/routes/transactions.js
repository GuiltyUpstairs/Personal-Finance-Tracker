// IMPORTS
import express from 'express';
import { addIncome, getIncomes, editIncome, deleteIncome } from '../controllers/income.js';

// Routing Init.
const router = express.Router();

// Test Function 
router.get('/', (req, res)=>{
  res.status(201).json({"Status": "Successful"})
});

// CRUD Operations
router.post('/add-income', addIncome);

router.get('/get-incomes', getIncomes);

router.put('/edit-income', editIncome);

router.delete('/delete-income/:id', deleteIncome);
export default router;