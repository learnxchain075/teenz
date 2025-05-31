import express from 'express';
import { createCollection, getCollections, getCollectionById, updateCollection, deleteCollection } from '../../controller/collection/createCollection';


const router = express.Router();

// Route to create a new collection
router.post('/collections', createCollection);

// Route to get all collections
router.get('/collections', getCollections);

// Route to get a collection by ID
router.get('/collections/:id', getCollectionById);

// Route to update a collection by ID
router.put('/collections/:id', updateCollection);

// Route to delete a collection by ID
router.delete('/collections/:id', deleteCollection);

export default router;
