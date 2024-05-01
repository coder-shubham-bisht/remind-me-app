import { db } from "@/drizzle/db";
import { collections } from "@/drizzle/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";

export const getCollectionList = async () => {
  const user = await currentUser();
  if (!user) {
    return [];
  }
  return await db.query.collections.findMany({
    where: eq(collections.userId, user.id),
    orderBy: [desc(collections.createdAt)],
  });
};
