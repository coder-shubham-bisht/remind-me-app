"use client";
import React, { useMemo, useState, useTransition } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CollectionColors, CollectionColorsType } from "@/lib/constant";
import { CaretDownIcon, CaretUpIcon, TrashIcon } from "@radix-ui/react-icons";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import PlusIcon from "./icons/PlusIcon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CreateTaskDialog from "./CreateTaskDialog";
import TaskCard from "./TaskCard";
import { deleteCollection } from "@/action/collection";
import { collectionType } from "@/schema/collection";
import { format } from "date-fns";

function CollectionCard({ collection }: { collection: collectionType }) {
  const [isOpen, setIsOpen] = useState(true);

  const tasks = collection.tasks;

  const [isLoading, startTransition] = useTransition();

  const removeCollection = async () => {
    try {
      await deleteCollection(collection.id);
      toast.success("Success", {
        description: "Collection deleted successfully",
      });
    } catch (e) {
      toast.error("Error", {
        description: "Cannot delete collection",
      });
    }
  };

  const tasksDone = useMemo(() => {
    return collection.tasks.filter((task) => task.done).length;
  }, [collection.tasks]);

  const totalTasks = collection.tasks.length;

  const progress = totalTasks === 0 ? 0 : (tasksDone / totalTasks) * 100;

  return (
    <>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <Button
            variant={"ghost"}
            className={cn(
              "flex w-full justify-between p-6",
              isOpen && "rounded-b-none",
              CollectionColors[collection.color as CollectionColorsType]
            )}
          >
            <span className="text-white font-bold">{collection.name}</span>
            {!isOpen && <CaretDownIcon className="h-6 w-6" />}
            {isOpen && <CaretUpIcon className="h-6 w-6" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {/* if no task is there */}
          {tasks.length === 0 && (
            <CreateTaskDialog collection={collection}>
              <Button
                variant={"ghost"}
                className="flex items-center justify-center gap-1 p-8 py-12 rounded-none w-full"
              >
                <p>There are no tasks yet:</p>
                <span
                  className={cn(
                    "text-sm bg-clip-text text-transparent",
                    CollectionColors[collection.color as CollectionColorsType]
                  )}
                >
                  Create one
                </span>
              </Button>
            </CreateTaskDialog>
          )}
          {/* if tasks is there */}
          {tasks.length > 0 && (
            <>
              <Progress value={progress} />
              <div className="p-4 gap-3 flex flex-col">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </>
          )}
          <Separator />
          <section className="h-[40px] px-4 p-[2px] text-sm text-neutral-500 flex justify-between items-center hover:bg-slate-300 ">
            {/* collection created At date */}
            <p className="space-x-1">
              <span>Created at</span>
              <span
                className={cn(
                  "bg-clip-text text-transparent",
                  CollectionColors[collection.color as CollectionColorsType]
                )}
              >
                {format(collection.createdAt, "PPP")}
              </span>
            </p>
            {isLoading && <div>Deleting...</div>}
            {!isLoading && (
              <div className="space-x-1">
                {/* create task with plus button */}
                <CreateTaskDialog collection={collection}>
                  <Button size={"icon"} variant={"ghost"}>
                    <PlusIcon />
                  </Button>
                </CreateTaskDialog>

                {/* delete collection wit alert box */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size={"icon"} variant={"ghost"}>
                      <TrashIcon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your collection and all tasks inside it.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          startTransition(removeCollection);
                        }}
                      >
                        Proceed
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </section>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}

export default CollectionCard;
