import { WebMercatorViewport } from "@deck.gl/core";
import { useMemo } from "react";
import useSupercluster from "use-supercluster";
import type {
  ClusteringParams,
  MapPointFeature,
  WithClustering,
} from "../types";

const DEFAULT_CLUSTER_RADIUS = 40;
const DEFAULT_MAX_ZOOM = 16;
const DEFAULT_BOUNDS: [number, number, number, number] = [-180, -85, 180, 85];

export function useClusteredPoints<T>(
  points: MapPointFeature<T>[],
  clustering: ClusteringParams = {}
): MapPointFeature<T>[] {
  const clusteringEnabled = isClusteringEnabled(clustering);

  const bounds = useMemo(() => {
    if (!clusteringEnabled) {
      return DEFAULT_BOUNDS;
    }

    return new WebMercatorViewport(clustering.viewState).getBounds();
  }, [clusteringEnabled, clustering]);

  const options = {
    radius: clusteringEnabled
      ? (clustering.clusterRadius ?? DEFAULT_CLUSTER_RADIUS)
      : DEFAULT_CLUSTER_RADIUS,
    maxZoom: clusteringEnabled
      ? (clustering.maxZoom ?? DEFAULT_MAX_ZOOM)
      : DEFAULT_MAX_ZOOM,
  };

  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom: clusteringEnabled ? Math.floor(clustering.viewState.zoom) : 0,
    options,
    disableRefresh: !clusteringEnabled,
  });

  return clusteringEnabled ? clusters : points;
}

function isClusteringEnabled(
  params: ClusteringParams
): params is WithClustering {
  return params.enableClustering === true;
}
