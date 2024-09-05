import { Skeleton } from "@/components/ui/skeleton";

const PlaceholderSkeleton = () => {
  return (
    <div className="flex flex-col space-y-2">
      <Skeleton className="h-[120px] w-[250px] rounded-xl" />
      <div>
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <div className="flex p-8 gap-5">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <PlaceholderSkeleton key={i} />
        ))}
    </div>
  );
};

export default Projects;
