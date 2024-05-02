import { colorList } from "@/lib/constant";
import { z } from "zod";
import { taskType } from "./task";

export const createCollectionSchema = z.object({
  name: z.string().min(4, {
    message: "Collection name must be at least 4 characters",
  }),
  color: z.string().refine((color) => colorList.includes(color)),
});

export type createCollectionSchemaType = z.infer<typeof createCollectionSchema>;

export type collectionType = {
  id: number;
  name: string;
  userId: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: taskType[];
};
