import { useBusStops } from "@entities/busStop";
import { MapGL } from "@shared/ui";

export function HomePage() {
  useBusStops();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        flex: "auto",
      }}
    >
      <MapGL />
    </div>
  );
}
