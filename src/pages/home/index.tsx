import { useBusStops } from "@entities/busStop";
import {
  createBusStopLayer,
  useMapLayersController,
} from "@features/map-layers";
import { MapGL } from "@shared/ui";

export function HomePage() {
  const { data: busStop } = useBusStops();
  const map = useMapLayersController([
    createBusStopLayer({ data: busStop?.data || [], visible: !!busStop?.data }),
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
