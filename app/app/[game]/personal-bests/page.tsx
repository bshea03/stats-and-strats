import { dehydrate, QueryClient } from "@tanstack/react-query";
import { categoriesQuery } from "@/hooks/react-query/categories";
import { fetchGame } from "@/hooks/react-query/games";
import { levelsQuery } from "@/hooks/react-query/levels";
import PersonalBestsClient from "./personal-bests-client";

type PersonalBestsPageProps = {
  params: { game: string };
};

export default async function PersonalBestsPage({
  params,
}: PersonalBestsPageProps) {
  const queryClient = new QueryClient();
  params = await params;

  const game = await fetchGame(params.game);

  if (game) {
    await queryClient.prefetchQuery(categoriesQuery(game?.srcId));
    await queryClient.prefetchQuery(levelsQuery(game?.srcId));
    return <PersonalBestsClient state={dehydrate(queryClient)} />;
  }

  return <></>;
}
