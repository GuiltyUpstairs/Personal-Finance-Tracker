import Income from "../models/Income.js";
import { createError } from "../error.js";
//  Income Controllers

// AddIncome --> To show an incoming Transaction
export const addIncome = (req, res, next)=>{
  const {title, amount, transactionType, category, description, date} = req.body;

  const income = Income({
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
      res.status(201).json({income})
    }
  }catch(err){
    next(createError(err.status, err.message))
  }
}

// GetIncomes

export const getIncomes = (req, res, next)=>{
  try{
    res.status(201).json({"Status": "Success"})
  }catch(err){
    next(createError(err))
  }
}

export const editIncome = (req, res, next)=>{
  try{
    res.status(201).json({"Status": "Edited"})
  }catch(err){
    next(createError(err.status, err.message))
  }
}

export const deleteIncome = (req, res, next)=>{
  try{
    res.status(201).json({"Status": "Deleted"})
  }catch(err){
    next(createError(err));
  }
}