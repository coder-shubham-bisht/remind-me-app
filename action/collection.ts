"use server";

import { db } from "@/drizzle/db";
import { collections } from "@/drizzle/schema";
import {
  createCollectionSchema,
  createCollectionSchemaType,
} from "@/schema/collection";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createCollection = async (values: createCollectionSchemaType) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }
  const validatedData = createCollectionSchema.safeParse(values);
  if (!validatedData.success) {
    return { success: false, message: "Collection schema validation failed" };
  }

  const { color, name } = validatedData.data;

  const collection = await db.query.collections.findFirst({
    where: and(eq(collections.name, name), eq(collections.userId, user.id)),
  });
  console.log(collection);

  if (collection) {
    return { success: false, message: "Collection already exists" };
  }
  try {
    await db.insert(collections).values({ name, userId: user.id, color });
    revalidatePath("/");
    return { success: true, message: "Collection created successfully" };
  } catch (error) {
    return { success: false, message: "Collection creation failed" };
  }
};
