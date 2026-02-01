import PageLayout from "@/components/PageLayout";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <PageLayout title="Home">
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Spinner className="size-12" />
        <p className="text-sm text-muted-foreground">Loading game data...</p>
      </div>
    </PageLayout>
  );
}
