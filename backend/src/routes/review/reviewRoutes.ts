import express from 'express';
import { getProductReviews, getProductReviewById, createProductReview, updateProductReview, deleteProductReview, updateReviewStatus } from '../../controller/productReview/productReviewController';


const router = express.Router();

// Public
router.get('/product/:productId', getProductReviews);

// Admin/User
router.get('/product/:id', getProductReviewById);
router.post('/product', createProductReview);
router.put('/product/:id', updateProductReview);
router.delete('/product/:id', deleteProductReview);

// Admin Only
router.patch('/status/:id', updateReviewStatus); // Body: { status: "APPROVED" or "REJECTED" }

export default router;
