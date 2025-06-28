import { NextFunction, Request, Response } from "express";

import { prisma } from "../../db/prisma";
import { handlePrismaError } from "../../utils/prismaErrorHandler";
import { uploadFile } from "../../config/upload";

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

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<any> => {
  const user = (req as any).user;

  if (!user?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        Address: true,
        ProductReview: true,
        Ticket: true,
        Order: true,
      },
    });

    if (!dbUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password, ...safeUser } = dbUser;
    res.status(200).json(safeUser);
  } catch (error) {
    next(error);
  }
};

// Update current user profile
export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<any> => {
  const user = (req as any).user;

  if (!user?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { name, email } = req.body;
    const updateData: Record<string, any> = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;

    const profilePictureFile = (req as any).file;

    if (profilePictureFile && profilePictureFile.buffer) {
      try {
        const uploadResult = await uploadFile(
          profilePictureFile.buffer,
          'profile_pics',
          'image'
        );
        updateData.profilePicture = uploadResult.url;
      } catch (err) {
        return res.status(500).json({ error: 'Failed to upload image' });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    const { password, ...safeUser } = updatedUser;
    res.status(200).json(safeUser);
  } catch (error: any) {
    const apiError = handlePrismaError(error);
    res.status(apiError.statusCode).json({ error: apiError.message });
  }
};