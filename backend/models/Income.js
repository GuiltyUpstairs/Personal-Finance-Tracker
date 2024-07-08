import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    maxLength: 50
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
    maxLength: 20
  },
  transactionType: {
    type: String,
    default: "income"
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    maxLength: 30,
    required: true
  }
},{timestamps: true})

export default mongoose.model("Income", IncomeSchema);