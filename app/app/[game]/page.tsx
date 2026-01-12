"use client";

import { useParams } from "next/navigation";
import { Category } from "srcjs";
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
import { useGame } from "@/hooks/react-query/games";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const params = useParams();
  const gameName = params.game as string;

  // First, fetch the game data from your backend (includes SRC ID)
  const {
    data: game,
    isLoading: gameLoading,
    error: gameError,
  } = useGame(gameName);

  // Then, use the SRC ID to fetch categories from SRC API
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories(game?.srcId ?? "");

  const isLoading = gameLoading || categoriesLoading;
  const error = gameError || categoriesError;

  console.log(categories);

  return (
    <PageLayout title="Home">
      <div className="px-4">
        {isLoading && <Spinner className="size-8" />}
        {error && <div>Error loading categories</div>}
        <h2 className="text-3xl font-bold my-6 ml-4 w-full">Categories</h2>
        <Separator className="w-full" />
        <div className="mt-4 grid grid-cols-2">
          {categories
            ?.filter((cat: Category) => cat.type === "per-game")
            .map((cat: Category) => (
              <Card className="m-2 h-100" key={cat.id}>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold @[250px]/card:text-3xl">
                    {cat.name}
                  </CardTitle>
                  <CardDescription>{cat.rules}</CardDescription>
                  <CardAction className="text-sm">View</CardAction>
                </CardHeader>
                <CardContent>
                  <p>card content</p>
                </CardContent>
                <CardFooter>
                  <p>card footer</p>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </PageLayout>
  );
}
