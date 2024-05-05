"use client";
import React, { useMemo, useState, useTransition } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CollectionColors, CollectionColorsType } from "@/lib/constant";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "sonner";
import CreateTaskDialog from "../task/CreateTaskDialog";
import TaskCard from "../task/TaskCard";
import { deleteCollection } from "@/action/collection";
import { collectionType } from "@/schema/collection";
import { format } from "date-fns";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { Pencil, TrashIcon } from "lucide-react";
import UpdateCollectionForm from "./UpdateCollectionForm";
import CollectionSheet from "./CollectionSheet";
import CreateTaskForm from "../task/CreateTaskForm";

function CollectionCard({ collection }: { collection: collectionType }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isDeleting, deleteTransition] = useTransition();

  const tasks = collection.tasks;

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

              CollectionColors[collection.color as CollectionColorsType]
            )}
          >
            <span className="text-white font-bold">{collection.name}</span>
            {!isOpen && <CaretDownIcon className="w-5 h-5" />}
            {isOpen && <CaretUpIcon className="w-5 h-5" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {/* if no task is there */}
          {tasks.length === 0 && (
            <>
              <div className="flex items-center justify-center gap-2 rounded-none w-full p-2">
                <p>There are no tasks yet:</p>
                <p
                  className={cn(
                    "text-sm bg-clip-text text-transparent animate-bounce",
                    CollectionColors[collection.color as CollectionColorsType]
                  )}
                >
                  Create one
                </p>
              </div>
              {/* create task dialog button */}

              <div className="flex justify-center ">
                <CreateTaskDialog collection={collection}>
                  <CreateTaskForm collection={collection} />
                </CreateTaskDialog>
              </div>
            </>
          )}
          {/* if tasks is there */}
          {tasks.length > 0 && (
            <>
              {/* progress bar of this collection tasks */}
              <Progress value={progress} />
              <div className="p-2 gap-3 flex flex-col">
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    colllection={collection}
                  />
                ))}
              </div>

              {/* create task dialog button */}
              <div className="flex justify-center w-full">
                <CreateTaskDialog collection={collection}>
                  <CreateTaskForm collection={collection} />
                </CreateTaskDialog>
              </div>
            </>
          )}

          {/* seprator b/w task list and footer of collection */}
          <Separator className="h-[2px]" />

          {/* footer of collection with create at date and edit and delete button */}
          <section className=" px-4 p-[2px] text-sm text-neutral-500 flex justify-between items-center ">
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

            {/* server actions button */}
            <div className="flex gap-1">
              {/* update collections actio button */}
              <CollectionSheet
                title={"Update " + collection.name + " collection"}
                description="Collections are a way to group your tasks"
                trigger={
                  <Button variant={"ghost"} size={"icon"}>
                    <Pencil size={20} />
                  </Button>
                }
              >
                <UpdateCollectionForm collection={collection} />
              </CollectionSheet>

              {isDeleting ? (
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="animate-bounce"
                >
                  <TrashIcon size={20} />
                </Button>
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size={"icon"} variant={"ghost"}>
                      <TrashIcon size={20} />
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
                          deleteTransition(removeCollection);
                        }}
                      >
                        Proceed
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </section>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}

export default CollectionCard;
