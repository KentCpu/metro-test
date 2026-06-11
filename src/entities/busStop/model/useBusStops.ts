import { useQuery } from "@tanstack/react-query";
import { createBusStopQueryOptions } from "./createBusStopQueryOptions";

export function useBusStops() {
  return useQuery(createBusStopQueryOptions());
}
