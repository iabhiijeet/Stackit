import express from 'express'
import authMiddleware from '../middlewares/auth.js';
import { addMemberToOrg, createBoardInOrg, createOrg, deleteOrg, getBoardsInOrg, getOrganizations, removeMemberFromOrg } from '../controllers/org.controller.js';

const app = express();

const router = express.Router();

router.post('/create-org', authMiddleware, createOrg);
router.get('/', authMiddleware, getOrganizations);
router.post("/add-member-to-org", authMiddleware, addMemberToOrg)
router.delete('/delete-org', authMiddleware, deleteOrg);
router.delete("/member", authMiddleware, removeMemberFromOrg)
router.post("/board", authMiddleware, createBoardInOrg);
router.get("/board", authMiddleware, getBoardsInOrg);
// router.delete("/board", authMiddleware, deleteBoardInOrg);
// router.post("/issues", authMiddleware, createIssueInBoard);

export default router;