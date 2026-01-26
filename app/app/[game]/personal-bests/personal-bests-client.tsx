"use client";

import { useActiveGame } from "@/app/contexts/GameContextProvider";
import PageLayout from "@/components/PageLayout";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TableAccordion,
  TableAccordionItem,
  TableAccordionTriggerRow,
  TableAccordionContent,
} from "@/components/ui/table-accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCategories } from "@/hooks/react-query/categories";
import { useLevels } from "@/hooks/react-query/levels";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import Image from "next/image";

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

  // Then, use the SRC ID to fetch categories and levels from SRC API
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories(game?.srcId ?? "");

  const {
    data: levels,
    isLoading: levelsLoading,
    error: levelsError,
  } = useLevels(game?.srcId ?? "");

  const isLoading = categoriesLoading || levelsLoading;
  const error = categoriesError || levelsError;

  const perGameCategories =
    categories?.filter((cat) => cat.type === "per-game") ?? [];

  // Use levels data for the "By Level" tab (individual stages like in Super Mario 64)
  const levelsList = levels ?? [];

  return (
    <PageLayout title="Personal Bests">
      <div className="p-6 max-w-5xl mx-auto">
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Spinner className="size-8" />
          </div>
        )}

        {error && (
          <div className="text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            Error loading categories
          </div>
        )}

        {!isLoading && !error && categories && (
          <Tabs defaultValue="per-game" className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="per-game">
                  Full Game ({perGameCategories.length})
                </TabsTrigger>
                <TabsTrigger value="per-level">
                  By Level ({levelsList.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="per-game" className="space-y-4">
              {perGameCategories.length === 0 ? (
                <div className="text-muted-foreground text-center py-8">
                  No full game categories found
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <TableAccordion type="single" collapsible>
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="w-10"></TableHead>
                          <TableHead className="w-32 font-semibold">
                            Category
                          </TableHead>
                          <TableHead className="text-right w-32 font-semibold">
                            Most Recent PB
                          </TableHead>
                          <TableHead className="text-right w-32 font-semibold">
                            Previous PB
                          </TableHead>
                          <TableHead className="text-right w-32 font-semibold">
                            Sum of Best
                          </TableHead>
                          <TableHead className="text-right w-32 font-semibold">
                            Potential Time Save
                          </TableHead>
                          <TableHead className="w-10"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {perGameCategories.map((cat) => (
                          <TableAccordionItem value={cat.id} key={cat.id}>
                            <TableAccordionTriggerRow>
                              <TableCell>
                                {game && (
                                  <Image
                                    src={game.icon}
                                    alt={game.title}
                                    width={40}
                                    height={40}
                                    className="aspect-square rounded-lg ml-1"
                                    unoptimized
                                  />
                                )}
                              </TableCell>
                              <TableCell className="font-medium">
                                {cat.name}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="font-mono text-sm">1:34.63</div>
                                <div className="text-xs text-green-600 font-mono">
                                  -0.40s
                                </div>
                              </TableCell>
                              <TableCell className="text-right font-mono text-sm text-muted-foreground">
                                1:35.03
                              </TableCell>
                              <TableCell className="text-right font-mono text-sm text-blue-600">
                                1:32.50
                              </TableCell>
                              <TableCell className="text-right font-mono text-sm text-orange-600">
                                2.13s
                              </TableCell>
                            </TableAccordionTriggerRow>
                            <TableRow className="hover:bg-inherit">
                              <TableCell colSpan={7} className="p-0">
                                <TableAccordionContent>
                                  Segment breakdown and detailed stats will go
                                  here
                                </TableAccordionContent>
                              </TableCell>
                            </TableRow>
                          </TableAccordionItem>
                        ))}
                      </TableBody>
                    </Table>
                  </TableAccordion>
                </div>
              )}
            </TabsContent>

            <TabsContent value="per-level" className="space-y-4">
              {levelsList.length === 0 ? (
                <div className="text-muted-foreground text-center py-8">
                  No levels found
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <TableAccordion type="single" collapsible>
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="w-10"></TableHead>
                          <TableHead className="w-32 font-semibold">
                            Level
                          </TableHead>
                          <TableHead className="text-right w-32 font-semibold">
                            Most Recent PB
                          </TableHead>
                          <TableHead className="text-right w-32 font-semibold">
                            Previous PB
                          </TableHead>
                          <TableHead className="text-right w-32 font-semibold">
                            Sum of Best
                          </TableHead>
                          <TableHead className="text-right w-32 font-semibold">
                            Potential Time Save
                          </TableHead>
                          <TableHead className="w-10"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {levelsList.map((level) => (
                          <TableAccordionItem value={level.id} key={level.id}>
                            <TableAccordionTriggerRow>
                              <TableCell className="text-center">
                                {game && (
                                  <Image
                                    src={game.icon}
                                    alt={game.title}
                                    width={40}
                                    height={40}
                                    className="aspect-square rounded-lg ml-1"
                                    unoptimized
                                  />
                                )}
                              </TableCell>
                              <TableCell className="font-medium">
                                {level.name}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="font-mono text-sm">0:34.63</div>
                                <div className="text-xs text-green-600 font-mono">
                                  -0.40s
                                </div>
                              </TableCell>
                              <TableCell className="text-right font-mono text-sm text-muted-foreground">
                                0:35.03
                              </TableCell>
                              <TableCell className="text-right font-mono text-sm text-blue-600">
                                0:33.10
                              </TableCell>
                              <TableCell className="text-right font-mono text-sm text-orange-600">
                                1.53s
                              </TableCell>
                            </TableAccordionTriggerRow>
                            <TableRow className="hover:bg-inherit">
                              <TableCell colSpan={7} className="p-0">
                                <TableAccordionContent>
                                  Level-specific stats and details will go here
                                </TableAccordionContent>
                              </TableCell>
                            </TableRow>
                          </TableAccordionItem>
                        ))}
                      </TableBody>
                    </Table>
                  </TableAccordion>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </PageLayout>
  );
}

// TODO
// - Split up into smaller components
// - Optional icons that users can upload themselves, per category or per level
// - Configure levels and categories
// - Category extension support
// - Add lib support for fetching levels
