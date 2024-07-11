import User from '../models/User.js';
import { createError } from '../error.js';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
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

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Update User
export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return next(createError(404, "User not found"));
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Delete User
export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return next(createError(404, "User not found"));
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Get All Users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        next(createError(500, err.message));
    }
};