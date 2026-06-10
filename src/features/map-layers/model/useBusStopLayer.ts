import type { BusStop } from "@entities/busStop";
import { createBusStopLayer } from "../lib/createBusStopLayer";
import type { ClusteringParams, LayerCreator } from "../types";
import { useClusteredPoints } from "./useClusteredPoints";

type UseBusStopLayerParams = {
  busStops?: readonly BusStop[];
} & ClusteringParams;

export function useBusStopLayer({
  busStops = [],
  ...clusteringParams
}: UseBusStopLayerParams): LayerCreator<BusStop> {
  const mapPoints = useClusteredPoints(busStops, clusteringParams);

  return createBusStopLayer({ data: mapPoints });
}
