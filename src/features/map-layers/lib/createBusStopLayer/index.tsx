import type { BusStop } from "@entities/busStop";
import { createIconPointLayer } from "../createIconPointLayer";
import { BusStopCard } from "./BusStopCard";
import busStopAtlas from "./bus-stop-icon.png";

const BUS_STOP_LAYER_ID = "bus-stop-layer";

const ICON_MAPPING = {
  "bus-stop": {
    x: 0,
    y: 0,
    width: 64,
    height: 64,
  },
  cluster: {
    x: 0,
    y: 0,
    width: 32,
    height: 32,
  },
} as const;

export const createBusStopLayer = createIconPointLayer<BusStop>({
  layerId: BUS_STOP_LAYER_ID,
  iconAtlas: busStopAtlas,
  iconMapping: ICON_MAPPING,
  pointIconId: "bus-stop",
  clusterIconId: "cluster",
  pointSize: 36,
  renderCard: (item, onClose) => <BusStopCard data={item} onClose={onClose} />,
});
