import { useQuery } from "@tanstack/react-query";
import { fetchMetroStations } from "../api/metroStationApi";

export function useMetroStations() {
  return useQuery({
    queryKey: ["metro-stations"],
    queryFn: fetchMetroStations,
  });
}
