import express from 'express';
import { login, registerUser } from '../controllers/usersController.js';

const router = express.Router()
router.post('/register', registerUser)
router.post('/login', login)

export default router;