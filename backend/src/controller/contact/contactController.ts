import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../db/prisma';
import { handlePrismaError } from '../../utils/prismaErrorHandler';

export const createContactMessage = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newMessage = await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    res.status(201).json({ message: 'Message received successfully', data: newMessage });
  } catch (error) {
    next(handlePrismaError(error));
  }
};

export const getAllContactMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(messages);
  } catch (error) {
    next(handlePrismaError(error));
  }
};
