import { useState } from "react";
import { MAP_LAYERS, type MapLayerId } from "./mapLayers";

const DEFAULT_LAYER_VISIBILITY = Object.fromEntries(
  MAP_LAYERS.map((layer) => [layer.id, true])
) as Record<MapLayerId, boolean>;

export function useLayerVisibility() {
  const [layerVisibility, setLayerVisibility] = useState<
    Record<MapLayerId, boolean>
  >(DEFAULT_LAYER_VISIBILITY);

  const setLayerVisible = (layerId: MapLayerId, checked: boolean) =>
    setLayerVisibility((current) => ({ ...current, [layerId]: checked }));

  return [layerVisibility, setLayerVisible] as const;
}
