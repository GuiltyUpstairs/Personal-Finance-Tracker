
// IMPORTS
import Expense from "../models/Expense.js";
import { createError } from "../error.js";

//  Expense Controllers
// AddExpense --> To show an incoming Transaction
export const addExpense = async (req, res, next)=>{
  const {title, amount, transactionType, category, description, date} = req.body;

  const expense = Expense({
    title,
    amount,
    transactionType,
    category,
    description,
    date
  })

  try{
    if(!title || !amount || !date || !category){
      return next(createError(400, "Status: Please Fill the required fields"))
    }
    if(amount < 0|| amount == 0){
      return next(createError(401, "Status: Incorrect Amount"))
    }
    else{
      await expense.save();
      res.status(201).json({expense})
    }
  }catch(err){
    next(createError(err.status, err.message))
  }
}

// GetExpense

export const getExpenses = async (req, res, next)=>{
  try{
    const expense = await Expense.find({});
    res.status(200).json(expense);
  }catch(err){
    next(createError(err))
  }
}

// EditExpense
export const editExpense = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    if (!updateExpense) {
      return next(createError(404, "Expense not found"));
    }
    res.status(200).json(updateExpense);
  } catch (err) {
    next(createError(500, err.message));
  }
}

// DeleteExpense
export const deleteExpense = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return next(createError(404, "Expense not found"));
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    next(createError(500, err.message));
  }
}