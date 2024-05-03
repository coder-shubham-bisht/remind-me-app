"use client";
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
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  CollectionColors,
  CollectionColorsType,
  colorList,
} from "@/lib/constant";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  createCollectionSchema,
  createCollectionSchemaType,
} from "@/schema/collection";
import { createCollection } from "@/action/collection";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";

const CreateCollectionForm = () => {
  const form = useForm<createCollectionSchemaType>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: {},
  });
  const selectedColor = form.watch("color");

  const onSubmit = async (data: createCollectionSchemaType) => {
    const res = await createCollection(data);

    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    form.reset();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col py-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Personal" {...field} />
                </FormControl>
                <FormDescription>Collection name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Color</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger
                      className={cn(
                        CollectionColors[selectedColor as CollectionColorsType]
                      )}
                    >
                      <SelectValue placeholder="Select Color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorList.map((color) => (
                        <SelectItem
                          key={color}
                          value={color}
                          className={cn(
                            `w-full h-8 rounded-md my-1 text-white focus:text-white focus:font-bold focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white tracking-wide`,
                            CollectionColors[color as CollectionColorsType]
                          )}
                        >
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Select a color for your collection
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-3 mt-4">
            <Separator className="bg-black dark:bg-white" />
            <Button
              disabled={form.formState.isSubmitting}
              variant={"outline"}
              className={cn(
                CollectionColors[selectedColor as CollectionColorsType]
              )}
              type="submit"
            >
              Confirm
              {form.formState.isSubmitting && (
                <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
export default CreateCollectionForm;
