"use client";

import { useParams } from "next/navigation";
import { Category } from "srcjs";
import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useCategories } from "@/hooks/react-query/categories";
import { Separator } from "@/components/ui/separator";
import { useActiveGame } from "@/app/contexts/GameContextProvider";

export default function Home() {
  const game = useActiveGame();

  // Then, use the SRC ID to fetch categories from SRC API
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories(game?.srcId ?? "");

  const isLoading = categoriesLoading;
  const error = categoriesError;

  console.log(categories);

  return (
    <PageLayout title="Home">
      {/* Hero Section */}
      {game && (
        <div className="relative w-full bg-linear-to-br from-primary/5 via-accent/5 to-secondary/5 border-b">
          <div className="px-6 py-12 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Game Icon */}
              <div className="shrink-0">
                <Image
                  src={game.icon}
                  alt={game.title}
                  width={160}
                  height={160}
                  className="rounded-2xl shadow-2xl border-2 border-border ring-4 ring-background"
                  unoptimized
                />
              </div>

              {/* Game Info */}
              <div className="flex-1 text-center md:text-left space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  {game.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start text-sm text-muted-foreground">
                  <span className="px-3 py-1 bg-secondary/50 rounded-full font-medium">
                    {game.genre}
                  </span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>{game.year}</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>{game.developer}</span>
                </div>

                {/* Category count */}
                <div className="flex gap-4 justify-center md:justify-start pt-2">
                  <div className="text-center md:text-left">
                    <div className="text-2xl font-bold">
                      {categories?.length || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Categories
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Spinner className="size-12" />
          <p className="text-sm text-muted-foreground">Loading game data...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mx-6 my-8">
          <div className="max-w-2xl mx-auto bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
            <div className="text-destructive font-semibold mb-2">
              Error Loading Data
            </div>
            <div className="text-sm text-muted-foreground">
              Unable to load categories. Please try again later.
            </div>
          </div>
        </div>
      )}

      {/* Categories Section Heading */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Browse Categories</h2>
          <p className="text-muted-foreground mb-6">
            Select a category to view leaderboards and track your progress
          </p>
          <Separator className="w-full" />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="px-6 pb-8">
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {categories
            ?.filter((cat: Category) => cat.type === "per-game")
            .map((cat: Category) => (
              <Card
                className="group h-full transition-all duration-200 hover:shadow-xl hover:scale-[1.02] hover:border-primary/50 cursor-pointer"
                key={cat.id}
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold @[250px]/card:text-3xl">
                    {cat.name}
                  </CardTitle>
                  <CardDescription>{cat.rules}</CardDescription>
                  <CardAction className="text-sm">View</CardAction>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {/* Player count indicator */}
                    {cat.players && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-medium">Players:</span>
                        <span>
                          {cat.players.type === "exactly" &&
                            `${cat.players.value} player${cat.players.value > 1 ? "s" : ""}`}
                          {cat.players.type === "up-to" &&
                            `Up to ${cat.players.value} players`}
                        </span>
                      </div>
                    )}

                    {/* Category type badge */}
                    <div className="flex gap-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                        {cat.miscellaneous ? "Misc" : "Main Category"}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <a
                    href={cat.weblink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline font-medium transition-colors"
                  >
                    View on Speedrun.com →
                  </a>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </PageLayout>
  );
}
