import express from "express";
import userRoutes from "./user/userRoutes";
import collectionRoutes from "./collection/collectionRoutes";
import productRoutes from "./product/productRoutes";
import categoryRoutes from "./category/categoryRoutes";
import announcmentRoutes from "./announcment/announcmentRoutes";
import emailSubscriberRoutes from "./emailSubscriber/emailSubscriberRoutes";
import contactRoutes from "./contact/contactRoutes";


// Create a main API router
const apiRouter = express.Router();

apiRouter.use(express.json());

// User Routes
apiRouter.use(userRoutes);
apiRouter.use(collectionRoutes);
apiRouter.use(productRoutes);
apiRouter.use(categoryRoutes);
apiRouter.use(announcmentRoutes);
apiRouter.use(emailSubscriberRoutes);
apiRouter.use(contactRoutes);

export default apiRouter;
