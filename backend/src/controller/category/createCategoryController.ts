import { Request, Response, Router } from "express";
import { prisma } from "../../db/prisma";
import { uploadFile } from "../../config/upload";

/**
 * Create a new category
 * Expected body: { name, description, imageUrl, status }
 */

export const createCategory = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, description, status  } = req.body;
    const imageFile = req.file;

    if (!name) {
      return res.status(400).json({ error: "Category name is required." });
    }
    
    let imageUrl = "";
    if (imageFile && imageFile.buffer) {
      const uploadResult = await uploadFile(imageFile.buffer, "category_images", "image");
      imageUrl = uploadResult.url;
    }

    const category = await prisma.category.create({
      data: {
        name,
        description,
        imageUrl,
        status,
      },
      include: {
        products: true,
      },
    });

    return res.status(201).json(category);
  } catch (error) {
    console.error("[createCategory]", error);
    return res.status(500).json({ error: "Failed to create category" });
  }
};


/**
 * Get all categories
 */
export const getCategories = async (_req: Request, res: Response): Promise<any> => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: {
          select: {
            id: true,
          }
        },
      },
    });

    // Transform the response to include product count
    const transformedCategories = categories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl,
      status: category.status,
      productCount: category.products.length,
    }));

   // console.log('Categories response:', transformedCategories);
    return res.json(transformedCategories);
  } catch (error) {
    console.error("[getCategories]", error);
    return res.status(500).json({ error: "Failed to fetch categories" });
  }
};

/**
 * Get category by id
 */
export const getCategoryById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            images: true,
            productTag: true
          }
        }
      },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.json(category);
  } catch (error) {
    console.error("[getCategoryById]", error);
    return res.status(500).json({ error: "Failed to fetch category" });
  }
};

/**
 * Update category by id
 */
export const updateCategory = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;
    const imageFile = req.file;

    let imageUrl;
    if (imageFile && imageFile.buffer) {
      const uploadResult = await uploadFile(imageFile.buffer, "category_images", "image");
      imageUrl = uploadResult.url;
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
        description,
        status,
        ...(imageUrl && { imageUrl })
      },
      include: {
        products: {
          select: {
            id: true,
          }
        },
      },
    });

    // Transform the response to include product count
    const transformedCategory = {
      id: updatedCategory.id,
      name: updatedCategory.name,
      description: updatedCategory.description,
      imageUrl: updatedCategory.imageUrl,
      status: updatedCategory.status,
      productCount: updatedCategory.products.length,
    };

    return res.json(transformedCategory);
  } catch (error) {
    console.error("[updateCategory]", error);
    return res.status(500).json({ error: "Failed to update category" });
  }
};

/**
 * Delete category by id
 */
export const deleteCategory = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id },
    });

    return res.status(204).send();
  } catch (error) {
    console.error("[deleteCategory]", error);
    return res.status(500).json({ error: "Failed to delete category" });
  }
};
