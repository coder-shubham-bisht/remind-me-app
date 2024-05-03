import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-screen flex justify-center items-center absolute top-0">
      <SignIn path="/sign-in" />{" "}
    </div>
  );
}
