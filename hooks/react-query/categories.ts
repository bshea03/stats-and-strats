import { useQuery } from "@tanstack/react-query";
import { Client } from "srcjs";

// create a single src client for use across all hooks
const srcClient = new Client();

export const useCategories = (srcGameId: string) => {
  return useQuery({
    queryKey: ["categories", srcGameId],
    queryFn: async () => {
      return await srcClient.games.getCategories(srcGameId);
    },
    enabled: !!srcGameId, // Only fetch if we have a valid SRC ID
  });
};

// When a game is added to your profile, we're goign to want to store the SRC ID in the database so we can make sure we can easily fetch it again later
