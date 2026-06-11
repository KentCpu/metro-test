import { useState } from "react";
import { MAP_LAYERS, type MapLayerId } from "./mapLayers";

const DEFAULT_LAYER_VISIBILITY = new Set(MAP_LAYERS.map((layer) => layer.id));

export function useLayerVisibility() {
  const [layerVisibility, setLayerVisibility] = useState<Set<MapLayerId>>(
    DEFAULT_LAYER_VISIBILITY
  );

  const setLayerVisible = (layerId: MapLayerId, checked: boolean) =>
    setLayerVisibility((current) => {
      const next = new Set(current);

      if (checked) {
        next.add(layerId);
      } else {
        next.delete(layerId);
      }

      return next;
    });

  return [layerVisibility, setLayerVisible] as const;
}
