import { WebMercatorViewport } from "@deck.gl/core";
import useSupercluster from "use-supercluster";
import type {
  ClusterIndex,
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
): { points: MapPointFeature<T>[]; supercluster?: ClusterIndex<T> } {
  const clusteringEnabled = isClusteringEnabled(clustering);

  const options = {
    radius: clusteringEnabled
      ? (clustering.clusterRadius ?? DEFAULT_CLUSTER_RADIUS)
      : DEFAULT_CLUSTER_RADIUS,
    maxZoom: clusteringEnabled
      ? (clustering.maxZoom ?? DEFAULT_MAX_ZOOM)
      : DEFAULT_MAX_ZOOM,
  };

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds: clusteringEnabled
      ? new WebMercatorViewport(clustering.viewState).getBounds()
      : DEFAULT_BOUNDS,
    zoom: clusteringEnabled ? clustering.viewState.zoom : 0,
    options,
    disableRefresh: !clusteringEnabled,
  });

  return {
    points: clusteringEnabled ? clusters : points,
    supercluster: clusteringEnabled ? supercluster : undefined,
  };
}

function isClusteringEnabled(
  params: ClusteringParams
): params is WithClustering {
  return params.enableClustering === true;
}
