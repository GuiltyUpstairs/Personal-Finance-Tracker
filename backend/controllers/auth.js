import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { createError } from '../error.js';

export const authTest = (req, res, next)=>{
  try{
    res.status(201).json({
      "Status": "Successful Auth",
      "jwt":process.env.JWT
    })
  }catch(err){
    res.status(501).status({"Status": "Bad Auth."})
  }
}

export const signin = async (req, res, next)=>{
  try{
    const user = await User.findOne({
      name: req.body.name
    })
    if(!user){
      return(next(createError(401, "Incorrect Credentials")))
    }

    const token = jwt.sign({id: user._id}, process.env.JWT);

    const {password, __v, ...others} = user._doc;

    res.cookie("access_token", token,{
      httpOnly: true
    }).status(201).json(others);
  }catch(err){
    next(err)
  }
}