import { currentUser } from "@clerk/nextjs/server";
import { Skeleton } from "./ui/skeleton";
import { TypewriterEffectSmooth } from "./typewriter-effect";
import { redirect } from "next/navigation";

export async function WelcomeMsg() {
  const user = await currentUser();
  if (!user) {
    return redirect("sign-in");
  }
  const words = [
    {
      text: "Welcome ",
    },
    {
      text: user.firstName as string,
    },

    {
      text: user.lastName as string,
    },
  ];
  return (
    <article className="sm:text-4xl text-2xl w-full font-bold flex justify-center items-center mt-5">
      <TypewriterEffectSmooth words={words} className="m-0" />
    </article>
  );
}

export function WelcomeMsgLoader() {
  return (
    <div className="flex  justify-center mt-5">
      <Skeleton className="w-[350px] h-[40px]" />
    </div>
  );
}
