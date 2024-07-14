import express from 'express';
import { createUser, updateUser, deleteUser, getAllUsers } from '../controllers/userController.js';


const router = express.Router();

router.post('/register', createUser);
router.put('/update-user/:id', updateUser); // Update user by ID
router.delete('/delete-user/:id', deleteUser); // Delete user by ID
router.get('/get-users', getAllUsers); // Get all users

export default router;
