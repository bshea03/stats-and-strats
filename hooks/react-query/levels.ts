import { useQuery } from "@tanstack/react-query";
import { Client } from "srcjs";

// Reuse the same client instance
const srcClient = new Client();

type Level = {
  id: string;
  name: string;
  weblink: string;
  rules: string;
  links: Array<{
    rel: string;
    uri: string;
  }>;
};

export const levelsQuery = (srcGameId: string) => ({
  queryKey: ["levels", srcGameId],
  queryFn: () => fetchLevels(srcGameId),
  enabled: !!srcGameId, // Only fetch if we have a valid SRC ID
});

async function fetchLevels(srcGameId: string): Promise<Level[]> {
  const response = await srcClient.get(`games/${srcGameId}/levels`);
  return response.data;
}

export const useLevels = (srcGameId: string) => {
  return useQuery(levelsQuery(srcGameId));
};
