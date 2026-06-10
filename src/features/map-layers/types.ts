import type { Layer } from "@deck.gl/core";

export type SelectedLayerData<T> = {
  layerId: string;
  data: T[];
};

export type MapPointProperties<T> = {
  cluster: false;
  item: T;
};

export type ClusterMapProperties = {
  cluster: true;
  cluster_id: number;
  point_count: number;
  point_count_abbreviated: string;
};

export type MapPointFeature<T> = GeoJSON.Feature<
  GeoJSON.Point,
  MapPointProperties<T>
>;

export type ClusterMapFeature = GeoJSON.Feature<
  GeoJSON.Point,
  ClusterMapProperties
>;

export type LayerData<TData> = {
  id: string;
  layers: Layer[];
  visible?: boolean;
  renderCard?: (item: TData) => React.ReactNode;
  renderListCard?: (items: TData[]) => React.ReactNode;
};

export type LayerCreator<TData> = (params: {
  onSelect(params: SelectedLayerData<TData> | null): void;
}) => LayerData<TData>;

export type LayerCreatorParams<TData> = {
  data: readonly TData[];
  visible?: boolean;
  enableClustering?: boolean;
};
