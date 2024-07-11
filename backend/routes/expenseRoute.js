
import express from 'express';
import { addExpense, deleteExpense, editExpense, getExpenses } from '../controllers/expense.js';

// Routing Init.
const router = express.Router();

// Test Function 
router.get('/', (req, res)=>{
    res.status(201).json({"Status": "Successful"})
  });
  
// CRUD Operations - Expense
router.post('/add-expense', addExpense);

router.get('/get-expenses', getExpenses);

router.put('/edit-expense/:id', editExpense);

router.delete('/delete-expense/:id', deleteExpense);

export default router;
