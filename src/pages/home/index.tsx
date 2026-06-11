import type { MapViewState } from "@deck.gl/core";
import { useBusStops } from "@entities/busStop";
import { useDistricts } from "@entities/district";
import { useMetroStations } from "@entities/metroStation";
import { usePedestrianPaths } from "@entities/pedestrianPath";
import { CreateBusStop } from "@features/createBusStop";
import {
  createBusStopLayer,
  createDistrictLayer,
  createMetroLayer,
  createPedestrianPathLayer,
  useMapLayersController,
} from "@features/mapLayers";
import { Flex, MapGL } from "@shared/ui";
import { Page } from "@widgets/page";
import { useState } from "react";
import { MapLayersMenu } from "./MapLayersMenu";

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

  const { hiddenLayers, layersInfo, handleChangeHiddenLayer, ...mapProps } =
    useMapLayersController([
      createDistrictLayer({
        data: districts,
      }),
      createPedestrianPathLayer({
        data: pedestrianPaths,
      }),
      createBusStopLayer({
        data: busStops,
        enableClustering: true,
      }),
      createMetroLayer({
        data: metro,
        enableClustering: true,
      }),
    ]);

  return (
    <Page>
      <Flex direction="column" flex={1} gap="sm" w="100%">
        <Flex gap="sm">
          <CreateBusStop />
          <MapLayersMenu
            options={layersInfo}
            hiddenLayers={hiddenLayers}
            onChangeLayerVisible={handleChangeHiddenLayer}
          />
        </Flex>
        <MapGL
          {...mapProps}
          viewState={viewState}
          onViewStateChange={({ viewState }) => setViewState(viewState)}
        />
      </Flex>
    </Page>
  );
}
