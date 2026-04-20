import express from 'express'
import authMiddleware from '../middlewares/auth.js';
import { addMemberToOrg, createOrg, getOrganizations, removeMemberFromOrg } from '../controllers/org.controller.js';

const app = express();

const router = express.Router();

router.post('/create-org', authMiddleware, createOrg);
router.get('/', authMiddleware, getOrganizations);
router.post("/add-member-to-org", authMiddleware, addMemberToOrg)
router.delete("/delete-member", authMiddleware, removeMemberFromOrg)

export default router;