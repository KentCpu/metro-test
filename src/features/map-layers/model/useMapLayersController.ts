import { useState } from "react";
import type { LayerCreator, SelectedLayerData } from "../types";

export function useMapLayersController(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layerCreators: readonly LayerCreator<any>[]
) {
  const [selected, setSelected] = useState<SelectedLayerData<unknown> | null>(
    null
  );

  const layersData = layerCreators.map((layerCreator) =>
    layerCreator({ selected: selected?.data ?? null, onSelect: setSelected })
  );

  const currentLayer = selected
    ? layersData.find((item) => item.id === selected.layerId)
    : undefined;

  return {
    layers: layersData.map((item) => item.layer),
    cardInfo:
      currentLayer?.renderCard && selected
        ? currentLayer.renderCard(selected.data)
        : undefined,
  };
}
