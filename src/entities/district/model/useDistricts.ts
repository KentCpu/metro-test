import { server } from "@shared/api";
import { useQuery } from "@tanstack/react-query";
import type { District } from "../api/types";

export function useDistricts() {
  return useQuery<District[]>({
    queryKey: ["districts"],
    queryFn: ({ signal }) => server.get<District[]>("/district", { signal }),
  });
}
