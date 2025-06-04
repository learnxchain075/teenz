import { Request, Response } from 'express';
import { prisma } from '../../db/prisma';
import { uploadFile } from '../../config/upload';

/**
 * Create a new product
 * Original body: { name, price, stock, status, categoryId, images: string[] }
 * Added to body: tags: string[] for product tags
 */

export const createProduct = async (req: Request, res: Response) :Promise<any>  => {
  try {
    const { name, price, stock, status, categoryId } = req.body;
    // Parse tags from form data - it comes as a string
    let tags = [];
    try {
      tags = req.body.tags ? JSON.parse(req.body.tags) : [];
    } catch (e) {
      console.log('Error parsing tags:', e);
      tags = [];
    }

    // @ts-ignore - assuming multer has populated req.files
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    // Upload all files to Cloudinary
    const uploadedImages = await Promise.all(
      files.map(file => uploadFile(file.buffer, "products", "image"))
    );

    // Create product in Prisma
    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        status,
        categoryId,
        images: {
          create: uploadedImages.map(img => ({ url: img.url }))
        },
        // Connect existing tags if provided
        ...(tags.length > 0 && {
          productTag: {
            connect: tags.map((tagId: string) => ({ id: tagId }))
          }
        })
      },
      include: {
        images: true,
        category: true,
        collections: true,
        productTag: true
      }
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('[createProduct]', error);
    res.status(500).json({ 
      error: 'Failed to create product',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get all products
 */
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        category: true,
        collections: true,
        productTag: true
      }
    });
    res.json(products);
  } catch (error) {
    // console.error('[getProducts]', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

/**
 * Get product by id
 */
export const getProductById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        category: true,
        collections: true,
        productTag: true
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('[getProductById]', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

/**
 * Update product by id
 */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, stock, status, categoryId, images, tags } = req.body;

    // Update scalar fields first
    await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        stock,
        status,
        categoryId,
        ...(tags && {
          productTag: {
            set: tags.map((tagId: string) => ({ id: tagId }))
          }
        })
      }
    });

    // Refresh images if provided
    if (Array.isArray(images)) {
      await prisma.productImage.deleteMany({ where: { productId: id } });
      await prisma.productImage.createMany({
        data: images.map((url: string) => ({ url, productId: id }))
      });
    }

    const updatedProduct = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        category: true,
        collections: true,
        productTag: true
      }
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error('[updateProduct]', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

/**
 * Delete product by id
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // First check if product exists
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        ProductReview: true,
        OrderItem: true,
        collections: true
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete related records in the correct order
    await prisma.$transaction(async (prisma) => {
      // Delete product images
      await prisma.productImage.deleteMany({
        where: { productId: id }
      });

      // Delete product reviews
      await prisma.productReview.deleteMany({
        where: { productId: id }
      });

      // Delete order items
      await prisma.orderItem.deleteMany({
        where: { productId: id }
      });

      // Delete product from collections
      await prisma.product.update({
        where: { id },
        data: {
          collections: {
            set: [] // Remove from all collections
          }
        }
      });

      // Finally delete the product
      await prisma.product.delete({
        where: { id }
      });
    });

    res.status(204).send();
  } catch (error) {
    console.error('[deleteProduct]', error);
    res.status(500).json({ 
      error: 'Failed to delete product',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
