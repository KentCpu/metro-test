import type { MetroStation } from "@entities/metroStation";
import { createMetroLayer } from "../lib/createMetroLayer";
import type { ClusteringParams, LayerCreator } from "../types";
import { useClusteredPoints } from "./useClusteredPoints";

type UseMetroLayerParams = {
  stations?: readonly MetroStation[];
} & ClusteringParams;

export function useMetroLayer({
  stations = [],
  ...clusteringParams
}: UseMetroLayerParams): LayerCreator<MetroStation> {
  const points = stations.map((station) => ({
    type: "Feature" as const,
    properties: { cluster: false as const, item: station },
    geometry: {
      type: "Point" as const,
      coordinates: station.coordinates,
    },
  }));

  const { points: mapPoints, supercluster } = useClusteredPoints(
    points,
    clusteringParams
  );

  return createMetroLayer({ data: mapPoints, supercluster });
}
