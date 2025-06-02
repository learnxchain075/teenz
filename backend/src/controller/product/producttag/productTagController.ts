import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../db/prisma";

// Create a new product tag
export const createTag = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Tag name is required." });

    const tag = await prisma.productTag.create({
      data: { name },
    });

    res.status(201).json({ message: "Tag created", tag });
  } catch (error) {
    next(error);
  }
};

// Get all product tags
export const getAllTags = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await prisma.productTag.findMany({
      include: { products: true },
    });
    res.status(200).json({ tags });
  } catch (error) {
    next(error);
  }
};

// Get tag by ID
export const getTagById = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  try {
    const { id } = req.params;
    const tag = await prisma.productTag.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!tag) return res.status(404).json({ error: "Tag not found" });

    res.status(200).json({ tag });
  } catch (error) {
    next(error);
  }
};

// Update tag by ID
export const updateTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const tag = await prisma.productTag.update({
      where: { id },
      data: { name },
    });

    res.status(200).json({ message: "Tag updated", tag });
  } catch (error) {
    next(error);
  }
};

// Delete tag by ID
export const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await prisma.productTag.delete({
      where: { id },
    });

    res.status(200).json({ message: "Tag deleted" });
  } catch (error) {
    next(error);
  }
};
