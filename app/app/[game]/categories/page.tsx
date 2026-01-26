import { dehydrate, QueryClient } from "@tanstack/react-query";
import CategoriesClient from "./categories-client";
import { categoriesQuery } from "@/hooks/react-query/categories";
import { fetchGame } from "@/hooks/react-query/games";

type CategoriesPageProps = {
  params: { game: string };
};

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const queryClient = new QueryClient();
  params = await params;

  const game = await fetchGame(params.game);

  if (game) {
    await queryClient.prefetchQuery(categoriesQuery(game?.srcId));
    return <CategoriesClient state={dehydrate(queryClient)} />;
  }

  return <></>;
}
