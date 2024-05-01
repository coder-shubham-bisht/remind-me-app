import { currentUser } from "@clerk/nextjs/server";

export default async function HomePage() {
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
