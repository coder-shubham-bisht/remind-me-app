import {
  CollectionList,
  CollectionListLoader,
} from "@/components/collection/CollectionList";
import CreateCollectionForm from "@/components/collection/CreateCollectionForm";
import CollectionSheet from "@/components/collection/CollectionSheet";
import { WelcomeMsg, WelcomeMsgLoader } from "@/components/WelcomeMsg";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  return (
    <>
      <main className="container">
        <Suspense fallback={<WelcomeMsgLoader />}>
          <WelcomeMsg />
        </Suspense>

        <div className="mt-4">
          <CollectionSheet
            title="Add new collection"
            description="Collections are a way to group your tasks"
            trigger={
              <div className="rounded-md bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 p-[2px] ">
                <Button variant={"outline"} className=" w-full tracking-wide ">
                  Create collection
                </Button>
              </div>
            }
          >
            <CreateCollectionForm />
          </CollectionSheet>
        </div>

        <section className="flex flex-col  justify-center items-center mt-12  gap-y-4">
          <Suspense fallback={<CollectionListLoader />}>
            <CollectionList />
          </Suspense>
        </section>
      </main>
    </>
  );
}
