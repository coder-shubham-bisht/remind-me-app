import { sql } from "drizzle-orm";
import { text, sqliteTable, integer, unique } from "drizzle-orm/sqlite-core";

export const collections = sqliteTable(
  "collections",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    userId: text("userId").notNull(),
    color: text("color").notNull(),
    createdAt: text("createdAt").default(new Date().toDateString()),
    updatedAt: text("updatedAt")
      .default(new Date().toDateString())
      .$onUpdate(() => new Date().toDateString()),
  },
  (table) => {
    return {
      unq: unique().on(table.userId, table.name),
    };
  }
);
