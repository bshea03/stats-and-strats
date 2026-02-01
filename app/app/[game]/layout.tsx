import { GameContextProvider } from "@/app/contexts/GameContextProvider";
import { fetchGame } from "@/hooks/react-query/games";

export default async function GameLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ game: string }>;
}) {
  const { game } = await params;
  const gameData = fetchGame(game);

  return <GameContextProvider game={gameData}>{children}</GameContextProvider>;
}
