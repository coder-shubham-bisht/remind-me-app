import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-screen flex justify-center items-center absolute top-0">
      <SignUp path="/sign-up" />
    </div>
  );
}
