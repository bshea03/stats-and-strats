import { GameContextProvider } from "@/app/contexts/GameContextProvider";
import { fetchGame } from "@/hooks/react-query/games";

export default async function GameLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { game: string };
}) {
  params = await params;
  const game = await fetchGame(params.game);

  return <GameContextProvider game={game}>{children}</GameContextProvider>;
}
