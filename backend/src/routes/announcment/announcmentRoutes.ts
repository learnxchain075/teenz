import express from 'express';
import { createHeaderController, getHeadersController } from '../../controller/announcment/headerController';



const router = express.Router();

router.post('/announcment/create', createHeaderController);
router.get('/announcment', getHeadersController);

export default router;