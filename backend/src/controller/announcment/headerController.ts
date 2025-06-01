import { Request, Response } from 'express';
import { prisma } from '../../db/prisma';

// Create a new header: delete previous then create new
export const createHeaderController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Delete all existing headers
    await prisma.headerAnnouncement.deleteMany();

    // Create new header
    const header = await prisma.headerAnnouncement.create({
      data: { name },
    });

    res.status(201).json(header);
  } catch (error) {
    console.error('[createHeaderController]', error);
    res.status(500).json({ error: 'Failed to create header' });
  }
};


// Get all headers
export const getHeadersController = async (_req: Request, res: Response) => {
  try {
    const headers = await prisma.headerAnnouncement.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(headers);
  } catch (error) {
    console.error('[getHeadersController]', error);
    res.status(500).json({ error: 'Failed to fetch headers' });
  }
};
