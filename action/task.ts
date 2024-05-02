"use server";

import { db } from "@/drizzle/db";
import { tasks } from "@/drizzle/schema";
import { createTaskSchemaType } from "@/schema/task";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createTask(data: createTaskSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  const { content, expiresAt, collectionId } = data;

  try {
    await db.insert(tasks).values({
      userId: user.id,
      content,
      expiresAt,
      collectionId,
    });
    revalidatePath("/");
    return { success: true, message: "Task created successfully" };
  } catch (error) {
    console.log(error);

    return { success: false, message: "Task creation failed" };
  }
}

export async function setTaskToDone(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  try {
    await db
      .update(tasks)
      .set({
        done: true,
      })
      .where(and(eq(tasks.id, id), eq(tasks.userId, user.id)));
    revalidatePath("/");

    return { success: true, message: "Task marked as done" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Task marking as done failed" };
  }
}
