import { prisma } from "../db/prisma";

export const generateOrderName = async (): Promise<string> => {
  const lastOrder = await prisma.order.findFirst({
    where: {
      orderName: {
        not: null,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      orderName: true,
    },
  });

  const lastNumber = lastOrder?.orderName?.split("-")[1] || "000";
  const nextNumber = String(Number(lastNumber) + 1).padStart(3, "0");
  return `ORD-${nextNumber}`;
};
