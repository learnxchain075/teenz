import express from 'express';
import { createContactMessage, getAllContactMessages } from '../../controller/contact/contactController';


const router = express.Router();

router.post('/contact', createContactMessage);     // /api/v1/contact
router.get('/contact/message', getAllContactMessages);     // /api/v1/contact

export default router;
