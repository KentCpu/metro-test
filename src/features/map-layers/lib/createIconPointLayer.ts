import type { PickingInfo } from "@deck.gl/core";
import { IconLayer, type IconLayerProps } from "@deck.gl/layers";
import type { ReactNode } from "react";
import type { LayerCreator, LayerCreatorParams, MapPointFeature } from "../types";

type IconMapping = IconLayerProps<MapPointFeature<unknown>>["iconMapping"];

interface IconPointLayerConfig<T> {
  layerId: string;
  iconAtlas: string;
  iconMapping: IconMapping;
  pointIconId: string;
  clusterIconId: string;
  pointSize?: number;
  clusterSize?: number;
  renderCard: (item: T, onClose: () => void) => ReactNode;
}

export function createIconPointLayer<T>({
  layerId,
  iconAtlas,
  iconMapping,
  pointIconId,
  clusterIconId,
  pointSize = 32,
  clusterSize = 28,
  renderCard,
}: IconPointLayerConfig<T>) {
  return function iconPointLayer({
    data,
  }: LayerCreatorParams<T>): LayerCreator<T> {
    return ({ onSelect }) => {
      const handleClick = (pickInfo: PickingInfo<MapPointFeature<T>>) => {
        const feature = pickInfo.object;

        if (!feature || feature.properties.cluster) {
          return;
        }

        const item = feature.properties.item;

        if (!item) {
          return;
        }

        onSelect({
          layerId,
          data: item,
        });
      };

      return {
        id: layerId,
        visible: data.length > 0,
        layer: new IconLayer<MapPointFeature<T>>({
          id: layerId,
          iconAtlas,
          iconMapping,
          data,
          getIcon: (feature) =>
            feature.properties.cluster ? clusterIconId : pointIconId,
          getPosition: (feature) =>
            feature.geometry.coordinates as [number, number],
          getSize: (feature) =>
            feature.properties.cluster ? clusterSize : pointSize,
          onClick: handleClick,
          pickable: true,
        }),
        renderCard: (item) => renderCard(item, () => onSelect(null)),
      };
    };
  };
}
