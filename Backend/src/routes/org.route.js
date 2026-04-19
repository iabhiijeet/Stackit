import express from 'express'
import authMiddleware from '../middlewares/auth.js';
import { createOrg } from '../controllers/org.controller.js';

const app = express();

const router = express.Router();

router.post('/create-org', authMiddleware, createOrg);

export default router;