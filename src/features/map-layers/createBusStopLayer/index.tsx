import type { BusStop } from "@entities/busStop";
import { IconLayer } from "@deck.gl/layers";
import busStopAtlas from "./bus-stop-icon.png";
import type { LayerCreator, LayerCreatorParams } from "../types";
import { BusStopCard } from "./BusStopCard";
import type { PickingInfo } from "@deck.gl/core";

const BUS_STOP_LAYER_ID = "BUS_STOP_LAYER_ID";

export function createBusStopLayer({
  data,
  visible = true,
  // renderCard = (data) => <BusStopCard data={data} />,
}: LayerCreatorParams<BusStop>): LayerCreator<BusStop> {
  return ({ onSelect }) => {
    const handleClick = (pickInfo: PickingInfo<BusStop>) => {
      if (!pickInfo.object) {
        return;
      }

      onSelect({
        layerId: BUS_STOP_LAYER_ID,
        data: pickInfo.object,
      });
    };

    return {
      id: BUS_STOP_LAYER_ID,
      visible,
      layer: new IconLayer<BusStop>({
        id: BUS_STOP_LAYER_ID,
        iconAtlas: busStopAtlas,
        iconMapping: {
          "bus-stop": {
            x: 0,
            y: 0,
            width: 64,
            height: 64,
          },
        },
        data,
        getIcon: () => "bus-stop",
        getPosition: (busStop) => busStop.coordinates,
        onClick: handleClick,
        getSize: 40,
        pickable: true,
      }),
      renderCard: (data) => (
        <BusStopCard data={data} onClose={() => onSelect(null)} />
      ),
    };
  };
}
