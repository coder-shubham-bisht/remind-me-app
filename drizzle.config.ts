import type { Config } from "drizzle-kit";

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  driver: "libsql", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
