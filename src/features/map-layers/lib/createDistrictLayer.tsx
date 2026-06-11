import type { PickingInfo } from "@deck.gl/core";
import { GeoJsonLayer } from "@deck.gl/layers";
import type { District } from "@entities/district";
import type { LayerCreator } from "../types";
import { DistrictCard } from "../ui/DistrictCard";

const DISTRICT_LAYER_ID = "district-layer";

type DistrictLayerCreatorParams = {
  data: District[] | undefined | null;
  visible?: boolean;
};

type DistrictFeature = GeoJSON.Feature<GeoJSON.Polygon, District>;

export function createDistrictLayer({
  data,
  visible = true,
}: DistrictLayerCreatorParams): LayerCreator<District> {
  const geojson = districtsToGeoJson(data || []);

  return ({ onSelect }) => {
    const handleClick = (pickInfo: PickingInfo<DistrictFeature>) => {
      const district = pickInfo.object?.properties;
      if (!district) {
        return;
      }

      onSelect({
        layerId: DISTRICT_LAYER_ID,
        data: [district],
      });
    };

    return {
      id: DISTRICT_LAYER_ID,
      layers: [
        new GeoJsonLayer({
          id: DISTRICT_LAYER_ID,
          data: geojson,
          visible: Boolean(visible && data && data.length > 0),
          filled: true,
          stroked: true,
          getFillColor: (feature) => (feature.properties as District).fillColor,
          getLineColor: (feature) => (feature.properties as District).lineColor,
          getLineWidth: 2,
          pickable: true,
          onClick: handleClick,
        }),
      ],
      renderCard: (item) => (
        <DistrictCard data={item} onClose={() => onSelect(null)} />
      ),
    };
  };
}

function districtsToGeoJson(districts: District[]): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: districts.map((district) => ({
      type: "Feature",
      properties: district,
      geometry: {
        type: "Polygon",
        coordinates: district.coordinates,
      },
    })),
  };
}
