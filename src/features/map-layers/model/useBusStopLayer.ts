import type { BusStop } from "@entities/busStop";
import { createBusStopLayer } from "../lib/createBusStopLayer";
import type { ClusteringParams, LayerCreator } from "../types";
import { useClusteredPoints } from "./useClusteredPoints";

type UseBusStopLayerParams = {
  busStops?: readonly BusStop[];
  visible?: boolean;
} & ClusteringParams;

export function useBusStopLayer({
  busStops = [],
  visible = true,
  ...clusteringParams
}: UseBusStopLayerParams): LayerCreator<BusStop> {
  const points = busStops.map((stop) => ({
    type: "Feature" as const,
    properties: { cluster: false as const, item: stop },
    geometry: {
      type: "Point" as const,
      coordinates: stop.coordinates,
    },
  }));

  const { points: mapPoints, supercluster } = useClusteredPoints(
    points,
    clusteringParams
  );

  return createBusStopLayer({ data: mapPoints, supercluster, visible });
}
