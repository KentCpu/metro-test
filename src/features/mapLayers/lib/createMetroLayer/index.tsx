import type { MetroStation } from "@entities/metroStation";
import { createClusteredIconPointLayer } from "../createClusteredIconPointLayer";
import { MetroCard } from "../../ui/MetroCard";
import metroIconAtlas from "./metro-atlas-icon.png";

const METRO_LAYER_ID = "metro-layer";

const ICON_MAPPING = {
  "metro-station": {
    x: 0,
    y: 0,
    width: 250,
    height: 250,
  },
  cluster: {
    x: 260,
    y: 0,
    width: 250,
    height: 250,
  },
} as const;

export const createMetroLayer = createClusteredIconPointLayer<MetroStation>({
  layerId: METRO_LAYER_ID,
  label: "Станции метро",
  iconAtlas: metroIconAtlas,
  iconMapping: ICON_MAPPING,
  pointIconId: "metro-station",
  clusterIconId: "cluster",
  pointSize: 40,
  clusterSize: 40,
  listCardTitle: "Станции метро",
  getCoordinates: (station) => station.coordinates,
  renderCard: (item, onClose) => <MetroCard data={item} onClose={onClose} />,
});
