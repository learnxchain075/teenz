import { Request, Response } from "express";
import { prisma } from "../../db/prisma";

export const createAddress = async (req: Request, res: Response) :Promise<any> => {
  try {
    const { userId, street, city, state, zipCode, country } = req.body;

    if (!userId || !street || !city || !state || !zipCode || !country) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const address = await prisma.address.create({
      data: { userId, street, city, state, zipCode, country },
    });

    res.status(201).json({ message: "Address created successfully.", address });
  } catch (error) {
    console.error("[createAddress]", error);
    res.status(500).json({ error: "Failed to create address." });
  }
};

// Get all addresses for all users

export const getAllAddresses = async (req: Request, res: Response) => {
  try {
    const addresses = await prisma.address.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ addresses });
  } catch (error) {
    console.error("[getAllAddresses]", error);
    res.status(500).json({ error: "Failed to fetch addresses." });
  }
};


// Get address by ID

export const getAddressById = async (req: Request, res: Response) :Promise<any> => {
  try {
    const { id } = req.params;

    const address = await prisma.address.findUnique({
      where: { id: parseInt(id) },
      include: { user: true },
    });

    if (!address) {
      return res.status(404).json({ error: "Address not found." });
    }

    res.status(200).json(address);
  } catch (error) {
    console.error("[getAddressById]", error);
    res.status(500).json({ error: "Failed to get address." });
  }
};

// Update address by ID

export const updateAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { street, city, state, zipCode, country } = req.body;

    const address = await prisma.address.update({
      where: { id: parseInt(id) },
      data: { street, city, state, zipCode, country },
    });

    res.status(200).json({ message: "Address updated successfully.", address });
  } catch (error) {
    console.error("[updateAddress]", error);
    res.status(500).json({ error: "Failed to update address." });
  }
};


// Delete address by ID

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.address.delete({ where: { id: parseInt(id) } });

    res.status(200).json({ message: "Address deleted successfully." });
  } catch (error) {
    console.error("[deleteAddress]", error);
    res.status(500).json({ error: "Failed to delete address." });
  }
};