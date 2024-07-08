export const addIncome = (req, res, next)=>{
  try{
    res.status(201).json({"Status": "Income Added"})
  }catch(err){
    next(err)
  }
}