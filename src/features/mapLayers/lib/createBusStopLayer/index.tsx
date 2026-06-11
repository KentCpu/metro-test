import type { BusStop } from "@entities/busStop";
import { BusStopCard } from "../../ui/BusStopCard";
import { createClusteredIconPointLayer } from "../createClusteredIconPointLayer";
import busStopAtlas from "./bus-icon-atlas.png";

const BUS_STOP_LAYER_ID = "bus-stop-layer";

const ICON_MAPPING = {
  "bus-stop": {
    x: 0,
    y: 0,
    width: 250,
    height: 300,
  },
  cluster: {
    x: 365,
    y: 0,
    width: 250,
    height: 300,
  },
} as const;

export const createBusStopLayer = createClusteredIconPointLayer<BusStop>({
  layerId: BUS_STOP_LAYER_ID,
  label: "Остановки",
  iconAtlas: busStopAtlas,
  iconMapping: ICON_MAPPING,
  pointIconId: "bus-stop",
  clusterIconId: "cluster",
  pointSize: 40,
  clusterSize: 48,
  listCardTitle: "Остановки",
  getCoordinates: (stop) => stop.coordinates,
  renderCard: (item, onClose) => <BusStopCard data={item} onClose={onClose} />,
});
