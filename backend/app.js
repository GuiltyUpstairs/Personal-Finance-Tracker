const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const app = express();


//Connecting to MongoDB
mongoose.connect('mongodb+srv://guiltyupstairs:sherlock007@tracker.oqyfsxc.mongodb.net/').then(() => console.log("Connected to MongoDB")).catch(err => console.log(err))

const corsOptions = {
    origin: ["http://localhost:5173"],
}
app.use(cors(corsOptions));
//Middlewares
app.use(express.json()); //?Pass incoming json data
//Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);
//Error
app.use(errorHandler);

//Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
    console.log(`Server is running on this port... ${PORT} `)
);

