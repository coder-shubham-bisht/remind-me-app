import { relations } from "drizzle-orm";
import {
  serial,
  pgTable,
  unique,
  date,
  text,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
export const collections = pgTable(
  "collection",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    userId: text("userId").notNull(),
    color: text("color").notNull(),
    createdAt: date("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: date("updatedAt", { mode: "date" })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => {
    return {
      unq: unique().on(table.userId, table.name),
    };
  }
);

export const collectionsRelation = relations(collections, ({ many }) => {
  return {
    tasks: many(tasks),
  };
});

export const tasks = pgTable("task", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  done: boolean("done").default(false).notNull(),
  collectionId: integer("collectionId")
    .notNull()
    .references(() => collections.id),
  userId: text("userId").notNull(),
  createdAt: date("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: date("updatedAt", { mode: "date" })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),

  expiresAt: date("expiresAt", { mode: "date" }),
});

export const tasksRelation = relations(tasks, ({ one }) => {
  return {
    collection: one(collections, {
      fields: [tasks.collectionId],
      references: [collections.id],
    }),
  };
});
