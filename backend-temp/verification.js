import jwt from 'jsonwebtoken';
import { createError } from "./error.js";

export const verification = (req, res, next)=>{
  const token = req.cookies.access_token;

  if(!token){
    res.status(404).json({"token": "Not Found"})
  }

  jwt.verify(token, process.env.JWT, (err, user)=>{
    if(err){
      return next(createError(403, "Invalid Verification Token"))
    }
    req.user = user;
    next();
  })
}