import { dehydrate, QueryClient } from "@tanstack/react-query";
import CategoriesClient from "./categories-client";
import { categoriesQuery } from "@/hooks/react-query/categories";
import { fetchGame } from "@/hooks/react-query/games";

type CategoriesPageProps = {
  params: Promise<{ game: string }>;
};

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const queryClient = new QueryClient();
  const { game: gameName } = await params;

  const game = fetchGame(gameName);

  if (game) {
    await queryClient.prefetchQuery(categoriesQuery(game.srcId));
    return <CategoriesClient state={dehydrate(queryClient)} />;
  }

  return <></>;
}
