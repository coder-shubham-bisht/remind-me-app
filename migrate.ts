import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

const main = async () => {
  migrate(db, { migrationsFolder: "./drizzle/migrations" });
  sqlite.close();
};

main();
