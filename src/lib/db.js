import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

function createPrismaClient() {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
    return new PrismaClient({ adapter, log: ['query', 'info', 'warn', 'error'] });
}

const db = globalThis.prisma || createPrismaClient();

if (process.env.NODE_ENV === "development") {
    globalThis.prisma = db;
}

export default db;
