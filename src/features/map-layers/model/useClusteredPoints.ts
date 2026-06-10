import { WebMercatorViewport } from "@deck.gl/core";
import { useMemo } from "react";
import useSupercluster from "use-supercluster";
import {
  type ClusteringParams,
  type GeoMapItem,
  type MapPointFeature,
  type WithClustering,
} from "../types";


export function useClusteredPoints<T extends GeoMapItem>(
  items: readonly T[] | null,
  clustering: ClusteringParams = {}
): MapPointFeature<T>[] {
  const points = (items || [])?.map((item) => toPointFeature(item));

  const clusteringEnabled = isClusteringEnabled(clustering);
  const bounds = useMemo(() => {
    if (!clusteringEnabled) {
      return undefined;
    }

    return new WebMercatorViewport(clustering.viewState).getBounds();
  }, [clusteringEnabled, clustering]);


  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom: clusteringEnabled ? clustering.viewState.zoom : 0,
    options: {
      radius: clusteringEnabled ? (clustering.clusterRadius ?? 40) : 40,
      maxZoom: clusteringEnabled ? (clustering.maxZoom ?? 16) : 16,
    },
    disableRefresh: !clusteringEnabled,
  });

  return clusteringEnabled ? clusters : points;
}

function toPointFeature<T extends GeoMapItem>(item: T): MapPointFeature<T> {
  return {
    type: "Feature",
    properties: {
      cluster: false,
      item,
    },
    geometry: {
      type: "Point",
      coordinates: item.coordinates,
    },
  };
}

function isClusteringEnabled(
  params: ClusteringParams
): params is WithClustering {
  return params.enableClustering === true;
}
