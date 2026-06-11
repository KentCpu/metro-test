import { server } from "@shared/api";
import { useQuery } from "@tanstack/react-query";
import type { MetroStation } from "../api/types";

export function useMetroStations() {
  return useQuery<MetroStation[]>({
    queryKey: ["metro-stations"],
    queryFn: ({ signal }) =>
      server.get<MetroStation[]>("/metro-station", { signal }),
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
