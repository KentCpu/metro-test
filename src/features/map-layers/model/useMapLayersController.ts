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
    layerCreator({ onSelect: setSelected })
  );

  const currentLayer = selected
    ? layersData.find((item) => item.id === selected.layerId)
    : undefined;

  const cardInfo =
    selected && currentLayer
      ? renderSelectedCard(selected, currentLayer)
      : undefined;

  return { layers: layersData.map((layerData) => layerData.layers), cardInfo };
}

function renderSelectedCard(
  selected: SelectedLayerData<unknown>,
  layer: LayerData<unknown>
) {
  if (selected.data.length === 1) {
    return layer.renderCard?.(selected.data.at(0));
  }

  if (selected.data.length > 1) {
    return layer.renderListCard?.(selected.data);
  }
}
