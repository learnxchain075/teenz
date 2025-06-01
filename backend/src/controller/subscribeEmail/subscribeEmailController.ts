import { Request, Response } from "express";

import { prisma } from "../../db/prisma";

export const subscribeEmail = async (req: Request, res: Response) :Promise<any> => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const existing = await prisma.emailSubscriber.findUnique({ where: { email } });
    if (existing) {
      return res.status(200).json({ message: "Already subscribed" });
    }

    const subscriber = await prisma.emailSubscriber.create({
      data: { email, source: "popup" },
    });

    return res.status(201).json({ message: "Subscribed successfully", subscriber });
  } catch (error) {
    console.error("[subscribeEmail]", error);
    return res.status(500).json({ error: "Subscription failed" });
  }
};
