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
import { Pencil } from "lucide-react";
import { collectionType } from "@/schema/collection";
import UpdateCollectionForm from "./UpdateCollectionForm";

function UpdateCollectionSheet({ collection }: { collection: collectionType }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <Pencil />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update {collection.name} collection</SheetTitle>
          <SheetDescription>
            Collections are a way to group your tasks
          </SheetDescription>
        </SheetHeader>
        <UpdateCollectionForm collection={collection} />
      </SheetContent>
    </Sheet>
  );
}

export default UpdateCollectionSheet;
