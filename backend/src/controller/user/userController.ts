import { NextFunction, Request, Response } from "express";

import { prisma } from "../../db/prisma";
import { handlePrismaError } from "../../utils/prismaErrorHandler";

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Get user by ID

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        Address: true,
        passwordResetToken: false, // or true, if needed
        ProductReview: true,
        Ticket: true,
        Order: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Don't expose password
    const { password, ...safeUser } = user;

    res.status(200).json(safeUser);
  } catch (error) {
    next(handlePrismaError(error));
  }
};
