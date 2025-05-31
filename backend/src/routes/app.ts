import express from "express";
import userRoutes from "./user/userRoutes";
import collectionRoutes from "./collection/collectionRoutes";
import productRoutes from "./product/productRoutes";
import categoryRoutes from "./category/categoryRoutes";

// Create a main API router
const apiRouter = express.Router();

apiRouter.use(express.json());

// User Routes
apiRouter.use(userRoutes);
apiRouter.use(collectionRoutes);
apiRouter.use(productRoutes);
apiRouter.use(categoryRoutes);

export default apiRouter;
