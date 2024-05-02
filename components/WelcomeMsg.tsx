import { currentUser } from "@clerk/nextjs/server";
import { Skeleton } from "./ui/skeleton";

export async function WelcomeMsg() {
  const user = await currentUser();
  if (!user) {
    return <div>error</div>;
  }
  return (
    <div className="flex w-full">
      <h1 className="text-4xl font-bold">
        Welocme
        {user.fullName}
      </h1>
    </div>
  );
}

export function WelcomeMsgLoader() {
  return (
    <div className="flex flex-col gap-y-2">
      <Skeleton className="w-[230px] h-[50px]" />
      <Skeleton className="w-[230px] h-[50px]" />
    </div>
  );
}
