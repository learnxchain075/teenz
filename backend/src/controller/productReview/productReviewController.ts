import { Request, Response } from "express";
import { prisma } from "../../db/prisma";

// ✅ Create a new product review
export const createProductReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, userId, rating, comment } = req.body;

    if (!productId || !userId || !rating) {
      res.status(400).json({ error: "Product ID, User ID, and Rating are required." });
      return;
    }

    // Check if user purchased the product (must exist in a paid order)
    const hasPurchased = await prisma.order.findFirst({
      where: {
        userId,
        isPaid: true,
        status: 'ACTIVE',
        OrderItem: {
          some: { productId },
        }
      },
    });

    if (!hasPurchased) {
      res.status(403).json({ error: "You can only review products you've purchased." });
      return;
    }

    const review = await prisma.productReview.create({
      data: {
        productId,
        userId,
        rating,
        comment,
        status: "PENDING",
      },
    });

    res.status(201).json({ message: "Review submitted for approval", review });
  } catch (error) {
    res.status(500).json({ error: "Failed to create review", details: error instanceof Error ? error.message : String(error) });
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
