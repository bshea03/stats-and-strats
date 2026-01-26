"use client";

import PageLayout from "@/components/PageLayout";
import { useCategories } from "@/hooks/react-query/categories";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Category } from "srcjs";
import { HydrationBoundary, type DehydratedState } from "@tanstack/react-query";
import { useActiveGame } from "@/app/contexts/GameContextProvider";

export default function CategoriesClient({
  state,
}: {
  state: DehydratedState;
}) {
  return (
    <HydrationBoundary state={state}>
      <Categories />
    </HydrationBoundary>
  );
}

export function Categories() {
  const game = useActiveGame();

  // Then, use the SRC ID to fetch categories from SRC API
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories(game?.srcId ?? "");

  const isLoading = categoriesLoading;
  const error = categoriesError;

  return (
    <PageLayout title="Categories">
      <div className="grid grid-cols-2 grid- p-4">
        {isLoading && <Spinner className="size-8" />}
        {error && <div>Error loading categories</div>}
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
    </PageLayout>
  );
}
