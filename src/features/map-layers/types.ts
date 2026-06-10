import type { Layer } from "@deck.gl/core";
import type { MapViewState } from "@deck.gl/core";

export type SelectedLayerData<T> = {
  layerId: string;
  data: T;
};

export interface GeoMapItem {
  id: string;
  coordinates: [number, number];
}

export type MapPointProperties<T> = {
  cluster: boolean;
  cluster_id?: number;
  point_count?: number;
  item?: T;
};

export type MapPointFeature<T> = GeoJSON.Feature<
  GeoJSON.Point,
  MapPointProperties<T>
>;

export type LayerData<TData> = {
  id: string;
  layer: Layer;
  visible?: boolean;
  renderCard?: (item: TData) => React.ReactNode;
};

export type LayerCreator<TData> = (params: {
  selected: SelectedLayerData<TData>["data"] | null;
  onSelect(params: SelectedLayerData<TData> | null): void;
}) => LayerData<TData>;

export type LayerCreatorParams<TData> = {
  data: MapPointFeature<TData>[];
};

export type WithoutClustering = {
  enableClustering?: false;
};

export type WithClustering = {
  enableClustering: true;
  viewState: MapViewState;
  clusterRadius?: number;
  maxZoom?: number;
};

export type ClusteringParams = WithoutClustering | WithClustering;
