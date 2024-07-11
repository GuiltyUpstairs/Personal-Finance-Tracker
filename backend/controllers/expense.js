// IMPORTS
import Expense from "../models/Expense.js";
import { createError } from "../error.js";

//  Expense Controllers
/* Controllers for Expenses:

    Sl.No     Method         Type
      1.    addExpense      CREATE
      2.    getExpenses     READ
      3.    editExpense     UPDATE
      4.    deleteExpense   DELETE
*/

// AddExpense --> To show an outgoing expenses
export const addExpense = async (req, res, next)=>{
  const {title, amount, transactionType, category, description, date} = req.body;

  // Referencing to the Expense Schema
  const expense = Expense({
    title,
    amount,
    transactionType,
    category,
    description,
    date
  })

  try{
    // To check if All required fields have been filled
    if(!title || !amount || !date || !category){
      return next(createError(400, "Status: Please Fill the required fields"))
    }
    // To prevent amount from being negative or zero
    if(amount < 0|| amount == 0){
      return next(createError(401, "Status: Incorrect Amount"))
    }
    else{
      await expense.save();
      res.status(201).json({expense});
    }
  }catch(err){
    next(createError(err.status, err.message))
  }
}

// GetExpense --> To get all the expenses made by user
export const getExpenses = async (req, res, next)=>{
  try{
    const expense = await Expense.find({});
    res.status(200).json(expense);
  }catch(err){
    next(createError(err))
  }
}

// EditExpense --> To Edit some paramters of an Expense transaction
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

// DeleteExpense --> To delete an expense transaction
export const deleteExpense = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);
    // Check if the expense specified doen't exist
    if (!deletedExpense) {
      return next(createError(404, "Expense not found"));
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    next(createError(500, err.message));
  }
}