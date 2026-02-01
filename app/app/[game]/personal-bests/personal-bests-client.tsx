"use client";

import { useActiveGame } from "@/app/contexts/GameContextProvider";
import PageLayout from "@/components/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import LevelRuns from "./components/LevelRuns";
import FullGameCategories from "./components/FullGameCategories";

export default function PersonalBestsClient({
  state,
}: {
  state: DehydratedState;
}) {
  return (
    <HydrationBoundary state={state}>
      <PersonalBests />
    </HydrationBoundary>
  );
}

export function PersonalBests() {
  const game = useActiveGame();

  return (
    <PageLayout title="Personal Bests">
      <div className="p-6 max-w-5xl mx-auto">
        <Tabs defaultValue="per-game" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="per-game">Full Game</TabsTrigger>
              <TabsTrigger value="per-level">By Level</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="per-game" className="space-y-4">
            <FullGameCategories game={game} />
          </TabsContent>

          <TabsContent value="per-level" className="space-y-4">
            <LevelRuns game={game} />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
