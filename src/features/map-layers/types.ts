import type { Layer, MapViewState } from "@deck.gl/core";

export type SelectedLayerData<T> = {
  layerId: string;
  data: T[];
};

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

export type ClusterIndex<T> = {
  getLeaves(clusterId: number, limit: number): MapPointFeature<T>[];
};

export type LayerData<TData> = {
  id: string;
  layer: Layer;
  visible?: boolean;
  renderCard?: (item: TData) => React.ReactNode;
  renderListCard?: (items: TData[]) => React.ReactNode;
};

export type LayerCreator<TData> = (params: {
  selected: SelectedLayerData<TData> | null;
  onSelect(params: SelectedLayerData<TData> | null): void;
}) => LayerData<TData>;

export type LayerCreatorParams<TData> = {
  data: MapPointFeature<TData>[];
  supercluster?: ClusterIndex<TData>;
  visible?: boolean;
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
