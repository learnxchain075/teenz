import { Request, Response } from "express";
import { prisma } from "../../db/prisma";

// ✅ Create a new product review
export const createProductReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, userId, rating, comment } = req.body;

    if (!productId || !userId || typeof rating !== 'number' || rating < 1 || rating > 5) {
      res.status(400).json({ success: false, error: "Product ID, User ID, and valid Rating (1–5) are required." });
      return;
    }

    // Check if user has purchased the product
    const hasPurchased = await prisma.order.findFirst({
      where: {
        userId: Number(userId),
        isPaid: true,
        status: 'ACTIVE',
        OrderItem: {
          some: { productId },
        },
      },
    });

    if (!hasPurchased) {
      res.status(403).json({ success: false, error: "You can only review products you've purchased." });
      return;
    }

    // Check if user already reviewed this product
    const alreadyReviewed = await prisma.productReview.findFirst({
      where: {
        productId,
        userId: Number(userId),
      },
    });

    if (alreadyReviewed) {
      res.status(409).json({ success: false, error: "You have already reviewed this product." });
      return;
    }

    const review = await prisma.productReview.create({
      data: {
        productId,
        userId: Number(userId),
        rating,
        comment,
        status: "PENDING",
      },
    });

    res.status(201).json({ success: true, message: "Review submitted for approval", review });
  } catch (error) {
    console.error("[Create Review]", error);
    res.status(500).json({ success: false, error: "Failed to create review", details: error instanceof Error ? error.message : String(error) });
  }
};




// ✅ Get a single review (for admin use)
export const getProductReviewById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Review ID is required." });
      return;
    }

    const review = await prisma.productReview.findUnique({
      where: { id },
      include: {
        user: true,
        product: true,
      },
    });

    if (!review) {
      res.status(404).json({ error: "Review not found." });
      return;
    }

    res.status(200).json({ review });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch review", details: error instanceof Error ? error.message : String(error) });
  }
};

// ✅ Admin: Approve or Reject Review
export const updateReviewStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["APPROVED", "REJECTED"].includes(status)) {
      res.status(400).json({ error: "Status must be either APPROVED or REJECTED." });
      return;
    }

    const review = await prisma.productReview.update({
      where: { id },
      data: { status },
    });

    res.status(200).json({ message: `Review ${status.toLowerCase()}`, review });
  } catch (error) {
    res.status(500).json({ error: "Failed to update review status", details: error instanceof Error ? error.message : String(error) });
  }
};

// ✅ Update rating or comment
export const updateProductReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await prisma.productReview.update({
      where: { id },
      data: { rating, comment },
    });

    res.status(200).json({ message: "Review updated", review });
  } catch (error) {
    res.status(500).json({ error: "Failed to update review", details: error instanceof Error ? error.message : String(error) });
  }
};

// ✅ Delete a review (admin or user)
export const deleteProductReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.productReview.delete({
      where: { id },
    });

    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete review", details: error instanceof Error ? error.message : String(error) });
  }
};

// ✅ Get all reviews (for admin)
export const getAllReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await prisma.productReview.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            profilePicture: true,
          },
        },
        product: {
          select: {
            name: true,
            images: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error('[Get All Reviews]', error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to fetch reviews", 
      details: error instanceof Error ? error.message : String(error) 
    });
  }
};


// ✅ Get all approved reviews for a product
export const getProductReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;

    if (!productId) {
      res.status(400).json({ error: "Product ID is required." });
      return;
    }

    const reviews = await prisma.productReview.findMany({
      where: { productId, status: "APPROVED" },
      include: {
        user: {
          select: { id: true, name: true, profilePicture: true },
        },
      },
    });

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews", details: error instanceof Error ? error.message : String(error) });
  }
};

// ✅ Get all APPROVED REVIEWS (for Home page )
// ✅ Get all APPROVED REVIEWS (for Home page)
export const getAllApprovedReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await prisma.productReview.findMany({
      where: {
        status: "APPROVED",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profilePicture: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            images: {
              select: {
                url: true,
              },
              take: 1, 
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error("[Get Approved Reviews]", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to fetch approved reviews", 
      details: error instanceof Error ? error.message : String(error),
    });
  }
};
