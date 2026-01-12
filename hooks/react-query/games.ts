import { useQuery } from "@tanstack/react-query";
import { games } from "@/lib/gamedata";
import { Game } from "@/types/games";

// Fetch game data from your backend by game name
function fetchGame(gameName: string): Game | undefined {
  // const response = await fetch(`/api/games/${gameName}`);
  // if (!response.ok) {
  //   throw new Error("Failed to fetch game");
  // }
  // return response.json();

  return games.find((game: Game) => game.name === gameName);
}

export const useGame = (gameName: string) => {
  return useQuery({
    queryKey: ["game", gameName],
    queryFn: () => fetchGame(gameName),
    staleTime: Infinity,
  });
};
