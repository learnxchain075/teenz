import { Request, Response } from 'express';
import { prisma } from '../../db/prisma';
import { uploadFile } from '../../config/upload';

/**
 * Create a new product
 * Expected body: { name, price, stock, status, categoryId, images: string[] }
 */

export const createProduct = async (req: Request, res: Response) :Promise<any>  => {
  try {
   
    const { name, price, stock, status, categoryId } = req.body;

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
        }
      },
      include: {
        images: true,
        category: true,
        collections: true
      }
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('[createProduct]', error);
    res.status(500).json({ error: 'Failed to create product' });
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
        collections: true
      }
    });
    res.json(products);
  } catch (error) {
    console.error('[getProducts]', error);
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
        collections: true
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
    const { name, price, stock, status, categoryId, images } = req.body;

    // Update scalar fields first
    await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        stock,
        status,
        categoryId
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
        collections: true
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

    await prisma.product.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    console.error('[deleteProduct]', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
