import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CreateCollectionForm from "./CreateCollectionForm";

function CreateCollectionSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          className="
    w-full rounded-md bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 p-[2px] "
        >
          <Button variant={"outline"} className=" w-full ">
            <span className="bg-gradient-to-r from-red-500 to-blue-500 hover:from-blue-500 hover:to-red-500 bg-clip-text text-transparent ">
              Create collection
            </span>
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new collection</SheetTitle>
          <SheetDescription>
            Collections are a way to group your tasks
          </SheetDescription>
        </SheetHeader>
        <CreateCollectionForm />
      </SheetContent>
    </Sheet>
  );
}

export default CreateCollectionSheet;
