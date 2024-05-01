import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      <div className="max-w-[920px] flex flex-col flex-grow px-4 py-12 mx-auto">
        {children}
      </div>
    </div>
  );
}

export default layout;
