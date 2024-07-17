// IMPORTS
import Income from "../models/Income.js";
import { createError } from "../error.js";

/* Controllers for Expenses:

    Sl.No     Method         Type
      1.    addIncome       CREATE
      2.    getIncomes      READ
      3.    editIncome      UPDATE
      4.    deleteIncome    DELETE
*/

// AddIncome --> To show an incoming Transaction
export const addIncome = async (req, res, next)=>{
  const {title, amount, transactionType, category, description, date} = req.body;

  // Referencing to the Income Schema
  const income = Income({
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
      // Async save to MongoDB
      await income.save();
      res.status(201).json({income})
    }
  }catch(err){
    next(createError(err.status, err.message))
  }
}

// GetIncomes --> To get a list of all the income transactions asunc from MongoDB
export const getIncomes = async (req, res, next)=>{
  try{
    const incomes = await Income.find({});
    res.status(200).json(incomes);
  }catch(err){
    next(createError(err))
  }
}

// EditIncome --> To edit an Income by ID
export const editIncome = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedIncome = await Income.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedIncome) {
      return next(createError(404, "Income not found"));
    }
    res.status(200).json(updatedIncome);
  } catch (err) {
    next(createError(500, err.message));
  }
};

// DeleteIncome --> To delete an Income by ID
export const deleteIncome = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedIncome = await Income.findByIdAndDelete(id);
    if (!deletedIncome) {
      return next(createError(404, "Income not found"));
    }
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (err) {
    next(createError(500, err.message));
  }
};