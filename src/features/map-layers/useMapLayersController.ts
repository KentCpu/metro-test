import { useState } from "react";
import type { LayerCreator, SelectedLayerData } from "./types";

export function useMapLayersController(
  layerCreators: readonly LayerCreator<unknown>[]
) {
  const [selected, setSelected] = useState<SelectedLayerData<unknown> | null>();

  const layersData = layerCreators
    .map((layerCreator) =>
      layerCreator({ selected: selected?.data ?? null, onSelect: setSelected })
    )
    .filter((layer) => layer.visible);

  const currentLayer = selected
    ? layersData.find((item) => item.id === selected.layerId)
    : undefined;

  return {
    layers: layersData.map((item) => item.layer),
    cardInfo:
      currentLayer && selected
        ? currentLayer.renderCard(selected.data)
        : undefined,
  };
}
