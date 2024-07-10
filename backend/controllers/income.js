//  Income Controllers

// AddIncome --> To show an incoming Transaction
export const addIncome = (req, res, next)=>{
  try{
    const {title, amount, category, description, date} = req.body;

    res.status(201).json({
      "Status": "Income Added",
      "Title": title,
      "amount": amount,
      "category": category,
      "description": description,
      "date": date
    })
  }catch(err){
    next(err)
  }
}