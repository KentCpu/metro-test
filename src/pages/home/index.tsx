import { useBusStops } from "@entities/busStop";
import { useMetroStations } from "@entities/metroStation";
import {
  createBusStopLayer,
  createMetroLayer,
  useMapLayersController,
} from "@features/map-layers";
import { MapGL } from "@shared/ui";

export function HomePage() {
  const { data: busStop } = useBusStops();
  const { data: metro } = useMetroStations();
  const map = useMapLayersController([
    createBusStopLayer({ data: busStop?.data }),
    createMetroLayer({ data: metro?.data }),
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
      <MapGL {...map} />
    </div>
  );
}
