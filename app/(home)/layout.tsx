import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex  self-stretch w-full">
      <div className="max-w-[920px] flex flex-col w-full px-4 py-12 mx-auto">
        {children}
      </div>
    </div>
  );
}

export default layout;
