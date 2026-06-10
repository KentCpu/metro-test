import type { PickingInfo } from "@deck.gl/core";
import type { IconLayerProps } from "@deck.gl/layers";
import type { ReactNode } from "react";
import { ClusterListCard } from "../ui/ClusterListCard";
import type { LayerCreator, LayerCreatorParams } from "../types";
import { ClusteredIconPointLayer } from "./ClusteredIconPointLayer";

type IconMapping = IconLayerProps<unknown>["iconMapping"];

export type ClusteredIconPointLayerConfig<
  T extends { id: string; name: string },
> = {
  layerId: string;
  iconAtlas: string;
  iconMapping: IconMapping;
  pointIconId: string;
  clusterIconId: string;
  pointSize?: number;
  clusterSize?: number;
  clusterRadius?: number;
  maxZoom?: number;
  listCardTitle: string;
  getCoordinates: (item: T) => [number, number];
  renderCard: (item: T, onClose: () => void) => ReactNode;
};

export function createClusteredIconPointLayer<
  T extends { id: string; name: string },
>(config: ClusteredIconPointLayerConfig<T>) {
  return function clusteredIconPointLayer({
    data,
    visible = true,
    enableClustering = false,
  }: LayerCreatorParams<T>): LayerCreator<T> {
    return ({ onSelect }) => ({
      id: config.layerId,
      layers: [
        new ClusteredIconPointLayer<T>({
          id: config.layerId,
          data,
          visible: visible && data.length > 0,
          enableClustering,
          pickable: true,
          ...(config.clusterRadius != null && {
            clusterRadius: config.clusterRadius,
          }),
          ...(config.maxZoom != null && { maxZoom: config.maxZoom }),
          iconAtlas: config.iconAtlas,
          iconMapping: config.iconMapping,
          pointIconId: config.pointIconId,
          clusterIconId: config.clusterIconId,
          ...(config.pointSize != null && { pointSize: config.pointSize }),
          ...(config.clusterSize != null && {
            clusterSize: config.clusterSize,
          }),
          getCoordinates: config.getCoordinates,
          onClick: (info) => handleLayerClick(info, config.layerId, onSelect),
        }),
      ],
      renderCard: (item) => config.renderCard(item, () => onSelect(null)),
      renderListCard: (items) => (
        <ClusterListCard
          items={items}
          title={config.listCardTitle}
          onClose={() => onSelect(null)}
          onItemClick={(item) =>
            onSelect({ layerId: config.layerId, data: [item] })
          }
        />
      ),
    });
  };
}

function handleLayerClick<T extends { id: string }>(
  info: PickingInfo,
  layerId: string,
  onSelect: (data: { layerId: string; data: T[] } | null) => void
) {
  const picked = info.object;
  if (!picked) {
    return;
  }

  if (Array.isArray(picked)) {
    if (picked.length > 0) {
      onSelect({ layerId, data: picked as T[] });
    }
    return;
  }

  if (typeof picked === "object" && "id" in picked) {
    onSelect({ layerId, data: [picked as T] });
    return;
  }

  if (
    typeof picked === "object" &&
    "properties" in picked &&
    picked.properties &&
    typeof picked.properties === "object" &&
    "item" in picked.properties &&
    picked.properties.item
  ) {
    onSelect({ layerId, data: [picked.properties.item as T] });
  }
}
