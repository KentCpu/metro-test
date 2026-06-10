import { useBusStops } from "@entities/busStop";
import { useDistricts } from "@entities/district";
import { useMetroStations } from "@entities/metroStation";
import { usePedestrianPaths } from "@entities/pedestrianPath";
import {
  createDistrictLayer,
  createPedestrianPathLayer,
  useBusStopLayer,
  useMapLayersController,
  useMetroLayer,
} from "@features/map-layers";
import { CreateBusStop } from "@features/create-bus-stop";
import { Flex, MapGL } from "@shared/ui";
import { Page } from "@widgets/page";
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
  const { data: pedestrianPaths } = usePedestrianPaths();
  const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE);

  const busStopLayer = useBusStopLayer({
    busStops,
    enableClustering: true,
    viewState,
  });

  const metroLayer = useMetroLayer({
    stations: metro,
    enableClustering: true,
    viewState,
  });

  const map = useMapLayersController([
    createDistrictLayer({ data: districts ?? [] }),
    createPedestrianPathLayer({ data: pedestrianPaths ?? [] }),
    busStopLayer,
    metroLayer,
  ]);

  return (
    <Page>
      <Flex direction="column" flex={1} gap="sm" mih={0} w="100%">
        <CreateBusStop />
        <MapGL
          {...map}
          viewState={viewState}
          onViewStateChange={({ viewState }) => setViewState(viewState)}
        />
      </Flex>
    </Page>
  );
}
