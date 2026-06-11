import type { PickingInfo } from "@deck.gl/core";
import { GeoJsonLayer } from "@deck.gl/layers";
import type { PedestrianPath } from "@entities/pedestrianPath";
import type { LayerCreator } from "../types";
import { PedestrianPathCard } from "../ui/PedestrianPathCard";

const PEDESTRIAN_PATH_LAYER_ID = "pedestrian-path-layer";

type PedestrianPathLayerCreatorParams = {
  data: PedestrianPath[] | null | undefined;
  visible?: boolean;
};

type PedestrianPathFeature = GeoJSON.Feature<
  GeoJSON.LineString,
  PedestrianPath
>;

export function createPedestrianPathLayer({
  data,
  visible = true,
}: PedestrianPathLayerCreatorParams): LayerCreator<PedestrianPath> {
  const geojson = pathsToGeoJson(data ?? []);

  return ({ onSelect }) => {
    const handleClick = (pickInfo: PickingInfo<PedestrianPathFeature>) => {
      const path = pickInfo.object?.properties;

      if (!path) {
        return;
      }

      onSelect({
        layerId: PEDESTRIAN_PATH_LAYER_ID,
        data: [path],
      });
    };

    return {
      id: PEDESTRIAN_PATH_LAYER_ID,
      layers: [
        new GeoJsonLayer({
          id: PEDESTRIAN_PATH_LAYER_ID,
          data: geojson,
          visible: Boolean(visible && data && data.length > 0),
          filled: false,
          stroked: true,
          getLineColor: (feature) =>
            (feature.properties as PedestrianPath).lineColor,
          getLineWidth: 4,
          lineWidthMinPixels: 2,
          pickable: true,
          onClick: handleClick,
        }),
      ],
      renderCard: (item) => (
        <PedestrianPathCard data={item} onClose={() => onSelect(null)} />
      ),
    };
  };
}

function pathsToGeoJson(paths: PedestrianPath[]): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: paths.map((path) => ({
      type: "Feature",
      properties: path,
      geometry: {
        type: "LineString",
        coordinates: path.coordinates,
      },
    })),
  };
}
