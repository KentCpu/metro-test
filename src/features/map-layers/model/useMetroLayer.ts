import type { MetroStation } from "@entities/metroStation";
import { createMetroLayer } from "../lib/createMetroLayer";
import type { ClusteringParams, LayerCreator } from "../types";
import { useClusteredPoints } from "./useClusteredPoints";

type UseMetroLayerParams = {
  stations: readonly MetroStation[];
} & ClusteringParams;

export function useMetroLayer({
  stations,
  ...clusteringParams
}: UseMetroLayerParams): LayerCreator<MetroStation> {
  const mapPoints = useClusteredPoints(stations, clusteringParams);

  return createMetroLayer({ data: mapPoints });
}
