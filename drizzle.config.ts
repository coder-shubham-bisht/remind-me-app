import type { Config } from "drizzle-kit";
console.log(process.env.DRIZZLE_DATABASE_URL);

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso',
  dbCredentials: {
    connectionString: process.env.DRIZZLE_DATABASE_URL!,
  },
} satisfies Config;
