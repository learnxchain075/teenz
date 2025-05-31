import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../../controller/product/productController';


const router = express.Router();

// @route   POST /products
// @desc    Create a new product
router.post('/products', createProduct);

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
