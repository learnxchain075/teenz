import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../../controller/product/productController';
import multer from 'multer';


const router = express.Router();
const upload = multer();
// @route   POST /products
// @desc    Create a new product
router.post('/products', upload.array("images"), createProduct);

// @route   GET /products
// @desc    Get all products
router.get('/products', getProducts);

// @route   GET /products/:id
// @desc    Get a single product by ID
router.get('/products/:id', getProductById);

// @route   PUT /products/:id
// @desc    Update a product by ID
router.put('/products/:id', updateProduct);

// @route   DELETE /products/:id
// @desc    Delete a product by ID
router.delete('/products/:id', deleteProduct);

export default router;
