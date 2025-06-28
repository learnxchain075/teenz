import express from 'express';
import { getAllUsers, getCurrentUser, updateUserProfile } from '../../controller/user/userController';
import { authenticate } from '../../middlewares/authMiddelware';
import multer from 'multer';

const upload = multer();


const router = express.Router();

router.get('/admin/users',getAllUsers )
router.get('/user/me',authenticate, getCurrentUser )
router.put('/user/profile', authenticate, upload.single('profilePicture'), updateUserProfile)

export default router;