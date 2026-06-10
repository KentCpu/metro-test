import { IconLayer } from "@deck.gl/layers";
import metroIconAtlas from "./metro-icon.png";
import type { LayerCreator, LayerCreatorParams } from "../types";
import type { PickingInfo } from "@deck.gl/core";
import type { MetroStation } from "@entities/metroStation";
import { MetroCard } from "./MetroCard";

const METRO_LAYER_ID = "METRO_LAYER_ID";

export function createMetroLayer({
  data,
}: LayerCreatorParams<MetroStation>): LayerCreator<MetroStation> {
  return ({ onSelect }) => {
    const handleClick = (pickInfo: PickingInfo<MetroStation>) => {
      if (!pickInfo.object) {
        return;
      }

      onSelect({
        layerId: METRO_LAYER_ID,
        data: pickInfo.object,
      });
    };

    return {
      id: METRO_LAYER_ID,
      visible: data && data.length > 0,
      layer: new IconLayer<MetroStation>({
        id: METRO_LAYER_ID,
        iconAtlas: metroIconAtlas,
        iconMapping: {
          "metro-station": {
            x: 0,
            y: 0,
            width: 64,
            height: 64,
          },
        },
        data,
        getIcon: () => "metro-station",
        getPosition: (busStop) => busStop.coordinates,
        onClick: handleClick,
        sizeScale: 30,
        pickable: true,
      }),
      renderCard: (data) => (
        <MetroCard data={data} onClose={() => onSelect(null)} />
      ),
    };
  };
}
