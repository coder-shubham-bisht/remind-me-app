import {
  CollectionList,
  CollectionListLoader,
} from "@/components/CollectionList";
import { WelcomeMsg, WelcomeMsgLoader } from "@/components/WelcomeMsg";
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
