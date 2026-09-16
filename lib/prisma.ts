import { PrismaClient } from '@/app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

function getAdapter() {
  const conn = process.env.DATABASE_URL;
  if (!conn && process.env.NODE_ENV === "production") {
    console.warn("[Prisma] DATABASE_URL missing in production");
  }
  return new PrismaPg({
    connectionString: conn ?? "postgresql://placeholder:placeholder@localhost:5432/placeholder",
  });
}

const adapter = getAdapter();

const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter,
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
