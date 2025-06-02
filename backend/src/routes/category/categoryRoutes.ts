
import express from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '../../controller/category/createCategoryController';
import multer from 'multer';

// ------------------------------------------
// Router setup (so you can import a single file)
// ---------------------------------------------

const router = express.Router();
const upload = multer();

router.post('/categories', upload.single("imageUrl"), createCategory);
router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;