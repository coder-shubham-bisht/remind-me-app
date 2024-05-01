import CreateCollectionSheet from "@/components/CreateCollectionSheet";
import CreateCollectionForm from "@/components/CreateCollectionSheet";
import SadFace from "@/components/icons/SadFace";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/drizzle/db";
import { collections } from "@/drizzle/schema";
import { getCollectionList } from "@/lib/getData";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <>
      <Suspense fallback={<WelcomeMsgLoader />}>
        <WelcomeMsg />
      </Suspense>

      <Suspense fallback={<CollectionListLoader />}>
        <CollectionList />
      </Suspense>
    </>
  );
}

async function WelcomeMsg() {
  const user = await currentUser();
  if (!user) {
    return <div>error</div>;
  }
  return (
    <div className="flex w-full">
      <h1 className="text-4xl font-bold">
        Welocme , <br />
        {user.fullName}
      </h1>
    </div>
  );
}

function WelcomeMsgLoader() {
  return (
    <div className="flex flex-col gap-y-2">
      <Skeleton className="w-[230px] h-[50px]" />
      <Skeleton className="w-[230px] h-[50px]" />
    </div>
  );
}

async function CollectionList() {
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
            <div> {collection.name}</div>
          ))}
        </div>
      )}
    </>
  );
}

function CollectionListLoader() {
  return (
    <div className="w-full grow flex justify-center items-center">
      <Skeleton className="w-[230px] h-[50px]" />
      <Skeleton className="w-[230px] h-[50px]" />
    </div>
  );
}
