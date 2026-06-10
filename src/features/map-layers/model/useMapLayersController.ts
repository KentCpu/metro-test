import { useState } from "react";
import type { LayerCreator, LayerData, SelectedLayerData } from "../types";

export function useMapLayersController(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layerCreators: readonly LayerCreator<any>[]
) {
  const [selected, setSelected] = useState<SelectedLayerData<unknown> | null>(
    null
  );

  const layersData = layerCreators.map((layerCreator) =>
    layerCreator({ selected, onSelect: setSelected })
  );

  const currentLayer = layersData.find((item) => item.id === selected?.layerId);

  return {
    layers: layersData.map((item) => item.layer),
    cardInfo:
      selected && currentLayer
        ? renderSelectedCard(selected, currentLayer)
        : undefined,
  };
}

function renderSelectedCard(
  selected: SelectedLayerData<unknown>,
  layer: LayerData<unknown>
) {
  const [item] = selected.data;

  if (selected.data.length === 1) {
    return layer.renderCard?.(item);
  }

  if (selected.data.length > 1) {
    return layer.renderListCard?.(selected.data);
  }
}
