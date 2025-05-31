
import express from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '../../controller/category/createCategoryController';

// ------------------------------------------
// Router setup (so you can import a single file)
// ---------------------------------------------

const router = express.Router();

router.post('/categories', createCategory);
router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;