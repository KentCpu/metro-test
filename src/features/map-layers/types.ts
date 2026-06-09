import type { Layer } from "@deck.gl/core";

export type SelectedLayerData<T> = {
  layerId: string;
  data: T;
};

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
  data: TData[];
  visible?: boolean;
  renderCard?: (item: TData) => React.ReactNode;
};
