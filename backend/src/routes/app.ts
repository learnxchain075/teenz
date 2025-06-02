import express from "express";
import userRoutes from "./user/userRoutes";
import collectionRoutes from "./collection/collectionRoutes";
import productRoutes from "./product/productRoutes";
import categoryRoutes from "./category/categoryRoutes";
import announcmentRoutes from "./announcment/announcmentRoutes";
import emailSubscriberRoutes from "./emailSubscriber/emailSubscriberRoutes";
import contactRoutes from "./contact/contactRoutes";
import producttagRoutes from "./product/tagRoutes/producttagRoutes";
import paymentRoutes from "./payment/paymentRoutes";
import reviewRoutes from "./review/reviewRoutes";
import orderRoutes from "./order/orderRoutes";
import dashboardStatsRoutes from "./dashboard/dashboardStatsRoutes";


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
apiRouter.use(producttagRoutes);
apiRouter.use(reviewRoutes);
apiRouter.use(paymentRoutes);
apiRouter.use(orderRoutes);
apiRouter.use(dashboardStatsRoutes);


export default apiRouter;
