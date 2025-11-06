import { defineConfig } from "prisma/config";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load .env file manually

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: process.env.DATABASE_URL!, // ✅ Read from Node env instead of prisma/config env()
  },
});
