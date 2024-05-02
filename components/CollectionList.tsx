import { getCollectionList } from "@/lib/getData";
import CreateCollectionSheet from "./CreateCollectionSheet";
import { Skeleton } from "./ui/skeleton";
import { currentUser } from "@clerk/nextjs/server";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import SadFace from "./icons/SadFace";
import CollectionCard from "./CollectionCard";

export async function CollectionList() {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const collectionList = await getCollectionList();

  return (
    <>
      {collectionList.length === 0 ? (
        <div className="w-full grow flex justify-center items-center flex-col gap-y-4">
          <Alert variant={"destructive"}>
            <SadFace />
            <AlertTitle>There are no collections yet!</AlertTitle>
            <AlertDescription>
              Create a collection to get started
            </AlertDescription>
          </Alert>
          <CreateCollectionSheet />
        </div>
      ) : (
        <div className="w-full grow flex justify-center items-center flex-col gap-y-4">
          <CreateCollectionSheet />
          {collectionList.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </>
  );
}

export function CollectionListLoader() {
  return (
    <div className="w-full grow flex justify-center items-center">
      <Skeleton className="w-[230px] h-[50px]" />
      <Skeleton className="w-[230px] h-[50px]" />
    </div>
  );
}
