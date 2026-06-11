import { useState } from "react";
import type { LayerCreator, LayerData, SelectedLayerData } from "../types";

export function useMapLayersController(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layerCreators: readonly LayerCreator<any>[]
) {
  const [hiddenLayers, setHiddenLayers] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<SelectedLayerData<unknown> | null>(
    null
  );

  const layersData = layerCreators.map((layerCreator) =>
    layerCreator({
      onSelect: setSelected,
      getVisible: (layerId) => !hiddenLayers.has(layerId),
    })
  );

  const currentLayer = selected
    ? layersData.find((item) => item.id === selected.layerId)
    : undefined;

  const cardInfo =
    selected && currentLayer
      ? renderSelectedCard(selected, currentLayer)
      : undefined;

  const handleChangeHiddenLayer = (id: string) => {
    setHiddenLayers((current) => {
      const next = new Set(current);
      if (current.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  return {
    hiddenLayers,
    handleChangeHiddenLayer,
    layers: layersData.map((layerData) => layerData.layers),
    layersInfo: layersData.map((layer) => ({
      id: layer.id,
      label: layer.label,
    })),
    cardInfo,
  };
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
