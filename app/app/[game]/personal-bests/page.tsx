import { dehydrate, QueryClient } from "@tanstack/react-query";
import { categoriesQuery } from "@/hooks/react-query/categories";
import { fetchGame } from "@/hooks/react-query/games";
import PersonalBestsClient from "./personal-bests-client";

type PersonalBestsPageProps = {
  params: Promise<{ game: string }>;
};

export default async function PersonalBestsPage({
  params,
}: PersonalBestsPageProps) {
  const queryClient = new QueryClient();
  const { game: gameName } = await params;

  const game = fetchGame(gameName);

  if (game) {
    // Only prefetch categories (default tab) - levels load lazily when tab is clicked
    await queryClient.prefetchQuery(categoriesQuery(game.srcId));
    return <PersonalBestsClient state={dehydrate(queryClient)} />;
  }

  return <></>;
}
