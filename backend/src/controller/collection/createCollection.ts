import { Request, Response } from 'express';
import { prisma } from '../../db/prisma';

// Create a new collection
export const createCollection = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, description, imageUrl, status } = req.body;

    if (!name ) {
      return res.status(400).json({ error: 'name field is required' });
    }
    const collection = await prisma.collection.create({
      data: {
        name,
        description,
        imageUrl,
        status,
      },
    });
    res.status(201).json(collection);
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof Error) {
        res.status(500).json({ error: (error instanceof Error ? error.message : 'An unknown error occurred') });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Get all collections
export const getCollections = async (req: Request, res: Response) => {
  try {
    const collections = await prisma.collection.findMany();
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};

// Get a collection by ID
export const getCollectionById = async (req: Request, res: Response):Promise<any> => {
  try {
    const { id } = req.params;
    const collection = await prisma.collection.findUnique({
      where: { id },
    });
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};

// Update a collection by ID
export const updateCollection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, imageUrl, status } = req.body;
    const collection = await prisma.collection.update({
      where: { id },
      data: {
        name,
        description,
        imageUrl,
        status,
      },
    });
    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};

// Delete a collection by ID
export const deleteCollection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.collection.delete({
      where: { id },
    });
    res.status(200).json({ message: 'Collection deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};
