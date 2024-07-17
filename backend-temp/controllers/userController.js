// IMPORTS
import User from '../models/User.js';
import { createError } from '../error.js';
import bcrypt from 'bcryptjs';

/* Controllers for Users:

    Sl.No     Method         Type
      1.    createUser      CREATE
      2.    getAllUSers     READ
      3.    updateUser      UPDATE
      4.    deleteUser      DELETE
*/

// createUser --> to create a user account
export const createUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // To check if all required user-request fields are filled
        if (!name || !email || !password) {
            return next(createError(400, "Please provide name, email, and password"));
        }

        // Check if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(createError(400, "Email is already in use"));
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Initialising the new User according to the userController Schema
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        // Async save to MongoDB Atlas
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Get All Users --> To Get a list of all users.
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});

        // Destructuring the array to hide passwords in the response
        const safetyMesh = users.map(({_doc: {password, __v, ...others}})=>others);
        
        res.status(200).json(safetyMesh);
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Update User --> To Update the User data that already exists
export const updateUser = async (req, res, next) => {

    // Getting request.params.id using Array destructuring
    const { id } = req.params;
    try {
        // Async update to MongoDB
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        // Check in case user doesn't exist
        if (!updatedUser) {
            return next(createError(404, "User not found"));
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Delete User --> To completely delete a User account
export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        // Async delete from MongoDB
        const deletedUser = await User.findByIdAndDelete(id);
        // Check in case user doesn't exist
        if (!deletedUser) {
            return next(createError(404, "User not found"));
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        next(createError(500, err.message));
    }
};
