import express from 'express';
import { getAllUsers } from '../../controller/user/userController';


const router = express.Router();

router.get('/admin/users',getAllUsers )

export default router;