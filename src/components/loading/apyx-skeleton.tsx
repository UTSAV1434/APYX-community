import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function ApyxSkeleton({
  className,
  ...props
}: React.ComponentProps<typeof Skeleton>) {
  return (
    <Skeleton
      className={cn("bg-apyx-surface/80 border border-apyx-border/40", className)}
      {...props}
    />
  );
}
