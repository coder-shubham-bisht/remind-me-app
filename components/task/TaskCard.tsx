"use client";

import React, { useTransition } from "react";
import { Checkbox } from "../ui/checkbox";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { taskType } from "@/schema/task";
import { setTaskToDone } from "@/action/task";
import { CollectionColors, CollectionColorsType } from "@/lib/constant";
import DeleteTask from "./DeleteTask";
import { toast } from "sonner";
import { Loader, TrashIcon } from "lucide-react";
import UpdateTaskDialog from "./UpdateTaskDialog";
import { collectionType } from "@/schema/collection";

function TaskCard({
  task,
  colllection,
}: {
  task: taskType;
  colllection: collectionType;
}) {
  const [isChecking, checkTransition] = useTransition();
  const [isDeleting, deleteTransition] = useTransition();
  return (
    <div className="flex gap-2   w-full justify-between flex-col">
      <div className="flex items-center gap-2">
        {isChecking ? (
          <Loader className="animate-spin" />
        ) : (
          <Checkbox
            id={task.id.toString()}
            className="w-5 h-5"
            checked={task.done}
            onCheckedChange={() => {
              checkTransition(async () => {
                const res = await setTaskToDone(task.id, task.done);
                if (res.success) {
                  toast.success(res.message);
                } else {
                  toast.error(res.message);
                }
              });
            }}
          />
        )}
        <label
          htmlFor={task.id.toString()}
          className={cn(
            "text-sm font-medium leading-none hover:cursor-pointer  decoration-1 dark:decoration-white",
            task.done && "line-through"
          )}
        >
          {task.content}
        </label>
      </div>
      <div className="flex items-center justify-between gap-2">
        {task.expiresAt && (
          <p
            className={cn(
              "text-xs text-neutral-500 dark:text-neutral-400  space-x-2 "
            )}
          >
            <span>expireAt</span>
            <span
              className={cn(
                "bg-clip-text text-transparent",
                CollectionColors[colllection.color as CollectionColorsType]
              )}
            >
              {format(task.expiresAt, "dd/MM/yyyy")}
            </span>
          </p>
        )}

        <div className="">
          <UpdateTaskDialog collection={colllection} task={task} />
          {/* Delete task Button */}
          {isDeleting ? (
            <TrashIcon className="animate-ping" />
          ) : (
            <DeleteTask taskId={task.id} deleteTransition={deleteTransition} />
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
