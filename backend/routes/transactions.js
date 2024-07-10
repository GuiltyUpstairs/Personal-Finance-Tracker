// IMPORTS
import express from 'express';
import { addIncome, getIncomes, editIncome, deleteIncome } from '../controllers/income.js';
import { addExpense, deleteExpense, editExpense, getExpenses } from '../controllers/expense.js';

// Routing Init.
const router = express.Router();

// Test Function 
router.get('/', (req, res)=>{
  res.status(201).json({"Status": "Successful"})
});

// CRUD Operations- INCOME
router.post('/add-income', addIncome);

router.get('/get-incomes', getIncomes);

router.put('/edit-income/:id', editIncome);

router.delete('/delete-income/:id', deleteIncome);

// CRUD Operations - Expense
router.post('/add-expense', addExpense);

router.get('/get-expenses', getExpenses);

router.put('/edit-expense/:id', editExpense);

router.delete('/delete-expense/:id', deleteExpense);

export default router;