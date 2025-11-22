import { PrismaClient } from "@/app/generated/prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma = globalForPrisma.prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
