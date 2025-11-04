import { PrismaClient } from "@/generated/prisma/client";
const globalForPrisma = global as unknown as { prisma: PrismaClient }; // This ensures we use a single instance of Prisma Client in development
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; // Export the Prisma Client instance for use in the application
export default prisma;
