import { queryOptions } from "@tanstack/react-query";
import type { BusStop } from "../api/types";
import { server } from "@shared/api";

export function createBusStopQueryOptions() {
  return queryOptions({
    queryKey: ["bus-stops"],
    queryFn: ({ signal }) => server.get<BusStop[]>("/bus-stop", { signal }),
    gcTime: Infinity,
    staleTime: Infinity,
  });
}
