import express from 'express';
import { getAllUsers, getCurrentUser } from '../../controller/user/userController';


const router = express.Router();

router.get('/admin/users',getAllUsers )
router.get('/user/me',getCurrentUser )

export default router;