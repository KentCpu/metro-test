import { useBusStops } from "@entities/busStop";
import { useDistricts } from "@entities/district";
import { useMetroStations } from "@entities/metroStation";
import {
  createDistrictLayer,
  useBusStopLayer,
  useMapLayersController,
  useMetroLayer,
} from "@features/map-layers";
import { MapGL } from "@shared/ui";
import type { MapViewState } from "@deck.gl/core";
import { useState } from "react";

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 37.6176,
  latitude: 55.7558,
  zoom: 11,
  pitch: 0,
  bearing: 0,
};

export function HomePage() {
  const { data: busStops } = useBusStops();
  const { data: metro } = useMetroStations();
  const { data: districts } = useDistricts();
  const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE);

  const busStopLayer = useBusStopLayer({
    busStops: busStops?.data,
    enableClustering: true,
    viewState,
  });

  const metroLayer = useMetroLayer({
    stations: metro?.data,
    enableClustering: true,
    viewState,
  });

  const map = useMapLayersController([
    createDistrictLayer({ data: districts?.data || [] }),
    busStopLayer,
    metroLayer,
  ]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        flex: "auto",
      }}
    >
      <MapGL
        {...map}
        viewState={viewState}
        onViewStateChange={({ viewState: nextViewState }) =>
          setViewState(nextViewState)
        }
      />
    </div>
  );
}
