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
  label: string;
  layers: Layer[];
  renderCard?: (item: TData) => React.ReactNode;
  renderListCard?: (items: TData[]) => React.ReactNode;
};

export type LayerCreator<TData> = (params: {
  onSelect(params: SelectedLayerData<TData> | null): void;
  getVisible: (layerId: string) => boolean;
}) => LayerData<TData>;

export type LayerCreatorParams<TData> = {
  data: readonly TData[] | null | undefined;
  enableClustering?: boolean;
};
