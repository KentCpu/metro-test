import type { BusStop } from "@entities/busStop";
import { MapCard, Text, Title } from "@shared/ui";

interface Props {
  data: BusStop;
  onClose: () => void;
}

export function BusStopCard({ data, onClose }: Props) {
  return (
    <MapCard onClose={onClose}>
      <Title order={4}>{data.name}</Title>
      {data.address && (
        <Text size="sm" c="dimmed">
          {data.address}
        </Text>
      )}
      {data.description && <Text size="sm">{data.description}</Text>}
      <Text size="sm">
        <Text span fw={600}>
          Маршруты:{" "}
        </Text>
        {data.routes.join(", ")}
      </Text>
    </MapCard>
  );
}
