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
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { CollectionColors, CollectionColorsType } from "@/lib/constant";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { toast } from "sonner";
import { createTaskSchema, createTaskSchemaType } from "@/schema/task";
import { collectionType } from "@/schema/collection";
import { createTask } from "@/action/task";
import { PlusIcon } from "lucide-react";

interface Props {
  collection: collectionType;
}

function CreateTaskDialog({ collection }: Props) {
  const form = useForm<createTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      collectionId: collection.id,
    },
  });

  const onSubmit = async (data: createTaskSchemaType) => {
    try {
      await createTask(data);
      toast.success("Success", {
        description: "Task created successfully!!",
      });
    } catch (e) {
      toast.error("Error", {
        description: "Cannot create task",
      });
    }
    form.reset();
    form.setValue("content", ""); // Reset content field
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <PlusIcon />
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

        <Form {...form}>
          <form
            className="grid gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
            id="createTaskForm"
          >
            {/* content field */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Task content here"
                      {...field}
                      className="resize-none "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* expiresAt date field */}
            <FormField
              control={form.control}
              name="expiresAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expires at</FormLabel>
                  <FormDescription>
                    When should this task expire?
                  </FormDescription>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal w-full",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>No expiration</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button
            disabled={form.formState.isSubmitting}
            className={cn(
              "w-full dark:text-white text-white",
              CollectionColors[collection.color as CollectionColorsType]
            )}
            type="submit"
            form="createTaskForm"
          >
            Confirm
            {form.formState.isSubmitting && (
              <ReloadIcon className="animate-spin h-4 w-4 ml-2" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTaskDialog;
