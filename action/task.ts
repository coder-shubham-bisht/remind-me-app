"use server";

import { db } from "@/drizzle/db";
import { tasks } from "@/drizzle/schema";
import { createTaskSchema, createTaskSchemaType } from "@/schema/task";
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

export async function setTaskToDone(id: number, done: boolean) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  try {
    await db
      .update(tasks)
      .set({
        done: !done,
      })
      .where(and(eq(tasks.id, id), eq(tasks.userId, user.id)));
    revalidatePath("/");

    const text = done ? "undone" : "done";
    return { success: true, message: `Task marked as ${text}` };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Task marking as done failed" };
  }
}

export async function deleteTask(taskId: number) {
  const user = await currentUser();
  if (!user) {
    throw new Error("user not found");
  }

  try {
    await db
      .delete(tasks)
      .where(and(eq(tasks.id, taskId), eq(tasks.userId, user.id)));
    revalidatePath("/");
    return { success: true, message: "Task deleted successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Task deletion failed" };
  }
}

export async function updateTask(taskId: number, values: createTaskSchemaType) {
  const user = await currentUser();
  if (!user) {
    throw new Error("user not found");
  }
  const validatedData = createTaskSchema.safeParse(values);
  if (!validatedData.success) {
    return { success: false, message: "Task schema validation failed" };
  }
  const { content, expiresAt, collectionId } = validatedData.data;

  try {
    await db
      .update(tasks)
      .set({
        content,
        expiresAt,
      })
      .where(and(eq(tasks.id, taskId), eq(tasks.userId, user.id)));
    revalidatePath("/");
    return { success: true, message: "Task updated successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Task update failed" };
  }
}
