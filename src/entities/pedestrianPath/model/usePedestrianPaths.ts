import { useQuery } from "@tanstack/react-query";
import { fetchPedestrianPaths } from "../api/pedestrianPathApi";

export function usePedestrianPaths() {
  return useQuery({
    queryKey: ["pedestrian-paths"],
    queryFn: fetchPedestrianPaths,
  });
}
