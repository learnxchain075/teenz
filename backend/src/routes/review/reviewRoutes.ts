import express, { Router } from 'express';
import { getProductReviews, getProductReviewById, createProductReview, updateProductReview, deleteProductReview, updateReviewStatus, getAllReviews, getAllApprovedReviews,  } from '../../controller/productReview/productReviewController';


const router = express.Router();

// Public
router.get('/product/:productId', getProductReviews);
router.get('/product/review', getAllApprovedReviews);

// Admin/User
router.get('/product/:id', getProductReviewById);
router.post('/product', createProductReview);
router.put('/product/:id', updateProductReview);
router.delete('/product/:id', deleteProductReview);

// Admin Only
router.get('/admin/reviews', getAllReviews);
router.patch('/admin/review/status/:id', updateReviewStatus); // Updated path for status update

export default router;