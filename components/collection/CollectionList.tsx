import { getCollectionList } from "@/lib/getData";
import { Skeleton } from "../ui/skeleton";
import { currentUser } from "@clerk/nextjs/server";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import SadFace from "../icons/SadFace";
import CollectionCard from "./CollectionCard";
import { collectionType } from "@/schema/collection";

export async function CollectionList() {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const collectionList = await getCollectionList();

  return (
    <>
      {collectionList.length === 0 ? (
        <Alert variant={"destructive"}>
          <SadFace />
          <AlertTitle>There are no collections yet!</AlertTitle>
          <AlertDescription>
            Create a collection to get started.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          {collectionList.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection as collectionType}
            />
          ))}
        </>
      )}
    </>
  );
}

export function CollectionListLoader() {
  return (
    <section className="flex  flex-col justify-center items-center gap-y-4 mt-12 w-full">
      <Skeleton className="w-full h-[150px]" />
      <Skeleton className="w-full h-[150px]" />
    </section>
  );
}
