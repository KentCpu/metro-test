import type { BusStop } from "@entities/busStop";
import { createClusteredIconPointLayer } from "../createClusteredIconPointLayer";
import { BusStopCard } from "../../ui/BusStopCard";
import busStopAtlas from "./bus-icon-atlas.png";

const BUS_STOP_LAYER_ID = "bus-stop-layer";

const ICON_MAPPING = {
  "bus-stop": {
    x: 0,
    y: 0,
    width: 64,
    height: 64,
  },
  cluster: {
    x: 64,
    y: 0,
    width: 64,
    height: 64,
  },
} as const;

export const createBusStopLayer = createClusteredIconPointLayer<BusStop>({
  layerId: BUS_STOP_LAYER_ID,
  label: "Остановки",
  iconAtlas: busStopAtlas,
  iconMapping: ICON_MAPPING,
  pointIconId: "bus-stop",
  clusterIconId: "cluster",
  pointSize: 36,
  clusterSize: 48,
  listCardTitle: "Остановки",
  getCoordinates: (stop) => stop.coordinates,
  renderCard: (item, onClose) => <BusStopCard data={item} onClose={onClose} />,
});
