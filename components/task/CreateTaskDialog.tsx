"use client";
import React, { ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { CollectionColors, CollectionColorsType } from "@/lib/constant";

import { Button } from "../ui/button";

import { collectionType } from "@/schema/collection";
import { PlusIcon } from "lucide-react";

function CreateTaskDialog({
  children,
  collection,
}: {
  children: ReactNode;
  collection: collectionType;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <PlusIcon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="space-x-2">
            <span>Add task to collection:</span>
            <span
              className={cn(
                " bg-clip-text text-transparent",
                CollectionColors[collection.color as CollectionColorsType]
              )}
            >
              {collection.name}
            </span>
          </DialogTitle>
          <DialogDescription>
            Add a task to your collection. You can add as many tasks as you want
            to a collection.
          </DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTaskDialog;
