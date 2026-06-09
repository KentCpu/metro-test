import { useQuery } from "@tanstack/react-query";
import { fetchBusStops } from "../api/busStopApi";

export function useBusStops() {
  return useQuery({
    queryKey: ["bus-stops"],
    queryFn: () => fetchBusStops(),
  });
}
