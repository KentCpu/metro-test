import { useBusStops } from "@entities/busStop";
import { useDistricts } from "@entities/district";
import { useMetroStations } from "@entities/metroStation";
import { usePedestrianPaths } from "@entities/pedestrianPath";
import { CreateBusStop } from "@features/create-bus-stop";
import {
  createDistrictLayer,
  createPedestrianPathLayer,
  useMapLayersController,
} from "@features/map-layers";
import { Flex, MapGL } from "@shared/ui";
import { Page } from "@widgets/page";
import type { MapViewState } from "@deck.gl/core";
import { useState } from "react";
import { MapLayersMenu } from "./MapLayersMenu";
import { useLayerVisibility } from "./MapLayersMenu/useLayerVisibility";
import { createMetroLayer } from "@features/map-layers/lib/createMetroLayer";
import { createBusStopLayer } from "@features/map-layers/lib/createBusStopLayer";

const MOSCOW_VIEW_STATE: MapViewState = {
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
  const { data: pedestrianPaths } = usePedestrianPaths();
  const [viewState, setViewState] = useState<MapViewState>(MOSCOW_VIEW_STATE);
  const [layerVisibility, setLayerVisibility] = useLayerVisibility();

  const map = useMapLayersController([
    createDistrictLayer({
      data: districts,
      visible: layerVisibility["district-layer"],
    }),
    createBusStopLayer({
      data: busStops,
      enableClustering: true,
      visible: layerVisibility["bus-stop-layer"],
    }),
    createMetroLayer({
      data: metro,
      enableClustering: true,
      visible: layerVisibility["metro-layer"],
    }),
    createPedestrianPathLayer({
      data: pedestrianPaths ?? [],
      visible: layerVisibility["pedestrian-path-layer"],
    }),
  ]);

  return (
    <Page>
      <Flex direction="column" flex={1} gap="sm" mih={0} w="100%">
        <Flex gap="sm">
          <CreateBusStop />
          <MapLayersMenu
            layerVisibility={layerVisibility}
            onChangeLayerVisible={setLayerVisibility}
          />
        </Flex>
        <MapGL
          {...map}
          viewState={viewState}
          onViewStateChange={({ viewState }) => setViewState(viewState)}
        />
      </Flex>
    </Page>
  );
}
