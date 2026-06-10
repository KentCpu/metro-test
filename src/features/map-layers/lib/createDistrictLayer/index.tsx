import type { PickingInfo } from "@deck.gl/core";
import { GeoJsonLayer } from "@deck.gl/layers";
import type { District } from "@entities/district";
import type { LayerCreator } from "../../types";
import { DistrictCard } from "./DistrictCard";

const DISTRICT_LAYER_ID = "district-layer";

type DistrictLayerCreatorParams = {
  data: District[];
};

type DistrictFeature = GeoJSON.Feature<GeoJSON.Polygon, District>;

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

export function createDistrictLayer({
  data,
}: DistrictLayerCreatorParams): LayerCreator<District> {
  const geojson = districtsToGeoJson(data);

  return ({ onSelect }) => {
    const handleClick = (pickInfo: PickingInfo<DistrictFeature>) => {
      const district = pickInfo.object?.properties;

      if (!district) {
        return;
      }

      onSelect({
        layerId: DISTRICT_LAYER_ID,
        data: district,
      });
    };

    return {
      id: DISTRICT_LAYER_ID,
      visible: data.length > 0,
      layer: new GeoJsonLayer({
        id: DISTRICT_LAYER_ID,
        data: geojson,
        filled: true,
        stroked: true,
        getFillColor: (feature) => (feature.properties as District).fillColor,
        getLineColor: (feature) => (feature.properties as District).lineColor,
        getLineWidth: 2,
        pickable: true,
        onClick: handleClick,
      }),
      renderCard: (item) => (
        <DistrictCard data={item} onClose={() => onSelect(null)} />
      ),
    };
  };
}
