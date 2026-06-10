import { server } from "@shared/api";
import { useQuery } from "@tanstack/react-query";
import type { BusStop } from "../api/types";

export function useBusStops() {
  return useQuery<BusStop[]>({
    queryKey: ["bus-stops"],
    queryFn: ({ signal }) => server.get<BusStop[]>("/bus-stop", { signal }),
  });
}
