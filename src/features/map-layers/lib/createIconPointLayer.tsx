import type { PickingInfo } from "@deck.gl/core";
import { IconLayer, type IconLayerProps } from "@deck.gl/layers";
import type { ReactNode } from "react";
import { ClusterListCard } from "../ui/ClusterListCard";
import type {
  ClusterIndex,
  LayerCreator,
  LayerCreatorParams,
  MapPointFeature,
} from "../types";

type IconMapping = IconLayerProps<MapPointFeature<unknown>>["iconMapping"];

interface IconPointLayerConfig<T> {
  layerId: string;
  iconAtlas: string;
  iconMapping: IconMapping;
  pointIconId: string;
  clusterIconId: string;
  pointSize?: number;
  clusterSize?: number;
  listCardTitle: string;
  renderCard: (item: T, onClose: () => void) => ReactNode;
}

export function createIconPointLayer<T extends { id: string; name: string }>({
  layerId,
  iconAtlas,
  iconMapping,
  pointIconId,
  clusterIconId,
  pointSize = 32,
  clusterSize = 28,
  listCardTitle,
  renderCard,
}: IconPointLayerConfig<T>) {
  return function iconPointLayer({
    data,
    supercluster,
  }: LayerCreatorParams<T>): LayerCreator<T> {
    return ({ onSelect }) => {
      const handleClick = (pickInfo: PickingInfo<MapPointFeature<T>>) => {
        const feature = pickInfo.object;
        if (!feature) return;

        const data = getSelectedPointData(feature, supercluster);
        if (!data) return;

        onSelect({ layerId, data });
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
        renderListCard: (items) => (
          <ClusterListCard
            items={items}
            title={listCardTitle}
            onClose={() => onSelect(null)}
            onItemClick={(item) => onSelect({ layerId, data: [item] })}
          />
        ),
      };
    };
  };
}

function getClusterItems<T>(
  feature: MapPointFeature<T>,
  supercluster?: ClusterIndex<T>
) {
  const clusterId = feature.properties.cluster_id;
  if (clusterId == null || !supercluster) {
    return null;
  }

  const items = supercluster
    .getLeaves(clusterId, Number.POSITIVE_INFINITY)
    .map((leaf) => leaf.properties.item)
    .filter((item): item is T => item != null);

  return items.length > 0 ? items : null;
}

function getSelectedPointData<T>(
  feature: MapPointFeature<T>,
  supercluster?: ClusterIndex<T>
) {
  if (feature.properties.cluster) {
    return getClusterItems(feature, supercluster);
  }

  const item = feature.properties.item;
  return item ? [item] : null;
}
