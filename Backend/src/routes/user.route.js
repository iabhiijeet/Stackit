import express from 'express';
import { loginUser, registrUser } from '../controllers/user.controller.js';
const router = express.Router();

router.post('/register', registrUser);
router.post('/login', loginUser);

export default router;