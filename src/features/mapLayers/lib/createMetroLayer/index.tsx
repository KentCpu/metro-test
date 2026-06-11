import type { MetroStation } from "@entities/metroStation";
import { createClusteredIconPointLayer } from "../createClusteredIconPointLayer";
import { MetroCard } from "../../ui/MetroCard";
import metroIconAtlas from "./metro-icon.png";

const METRO_LAYER_ID = "metro-layer";

const ICON_MAPPING = {
  "metro-station": {
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

export const createMetroLayer = createClusteredIconPointLayer<MetroStation>({
  layerId: METRO_LAYER_ID,
  label: "Станции метро",
  iconAtlas: metroIconAtlas,
  iconMapping: ICON_MAPPING,
  pointIconId: "metro-station",
  clusterIconId: "cluster",
  pointSize: 30,
  clusterSize: 40,
  listCardTitle: "Станции метро",
  getCoordinates: (station) => station.coordinates,
  renderCard: (item, onClose) => <MetroCard data={item} onClose={onClose} />,
});
