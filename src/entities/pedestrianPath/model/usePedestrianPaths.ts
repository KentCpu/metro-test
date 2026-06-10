import { server } from "@shared/api";
import { useQuery } from "@tanstack/react-query";
import type { PedestrianPath } from "../api/types";

export function usePedestrianPaths() {
  return useQuery<PedestrianPath[]>({
    queryKey: ["pedestrian-paths"],
    queryFn: ({ signal }) =>
      server.get<PedestrianPath[]>("/pedestrian-path", { signal }),
  });
}
