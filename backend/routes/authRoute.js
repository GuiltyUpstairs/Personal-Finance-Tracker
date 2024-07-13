import express from 'express';
import { authTest, signin } from '../controllers/auth.js';


const router = express.Router();

// CRUD Routes
router.get('/test', authTest);

router.post('/signin', signin);

export default router;