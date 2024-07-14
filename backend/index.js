// IMPORTS

// Library/Dependency Imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// Route Imports
import authRoutes from './routes/authRoute.js';
import incomeRoutes from './routes/incomeRoute.js';
import expenseRoutes from './routes/expenseRoute.js';
import userRoutes from './routes/userRoute.js';

// Load environment variables from .env file
dotenv.config();

// Initialisation of App
const app = express();

// PORT initialisation
const PORT = process.env.PORT || 8800;
const uri = "mongodb+srv://admin:QXowHEUAMTVWfBcP@financetrackerapp.pad0cng.mongodb.net/finance_tracker?retryWrites=true&w=majority&appName=FinanceTrackerApp";

// Pre-defined Middlewares
app.use(cookieParser()); // Enabling Cookie Parser
app.use(express.json()); // Enabling JSON Request
app.use(express.urlencoded({ extended: false })); // Enabling URL-encoded request
app.use(cors()); // Enabling Cross-Origin Resource Sharing

// MongoDB Init.
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connection is Established');
  } catch (err) {
    console.error('Error connecting to the database', err.message);
    process.exit(1); // Exit process with failure
  }
};

// User-defined Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/users', userRoutes);

// Controllers Error Handling
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Status: Error";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

// Main Init.
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on PORT: ${PORT}`);
});
