import express from 'express';
import { getAllUsers, getCurrentUser } from '../../controller/user/userController';
import { authenticate } from '../../middlewares/authMiddelware';


const router = express.Router();

router.get('/admin/users',getAllUsers )
router.get('/user/me',authenticate, getCurrentUser )

export default router;