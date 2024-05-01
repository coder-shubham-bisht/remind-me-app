import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoadingPage() {
  return (
    <div className="flex flex-col grow">
      <div className="flex flex-col gap-y-1">
        <Skeleton className="w-[230px] h-[50px]" />
        <Skeleton className="w-[230px] h-[50px]" />
      </div>

      <div className="flex items-center justify-center h-[400px]">
        <div>loading......</div>
      </div>
    </div>
  );
}
