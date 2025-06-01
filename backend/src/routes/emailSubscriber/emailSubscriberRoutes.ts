import express from 'express';
import { subscribeEmail } from '../../controller/subscribeEmail/subscribeEmailController';


const router = express.Router();

// POST /api/v1/subscribe
router.post('/subscribe', subscribeEmail);

export default router;
