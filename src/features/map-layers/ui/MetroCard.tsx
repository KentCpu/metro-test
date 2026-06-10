import type { MetroStation } from "@entities/metroStation";
import { MapCard, Text, Title } from "@shared/ui";

interface Props {
  data: MetroStation;
  onClose: () => void;
}

export function MetroCard({ data, onClose }: Props) {
  return (
    <MapCard onClose={onClose}>
      <Title order={4}>{data.name}</Title>
      {data.address && (
        <Text size="sm" c="dimmed">
          {data.address}
        </Text>
      )}
      {data.description && <Text size="sm">{data.description}</Text>}
      <Text size="sm">Линии: {data.lines.join(", ")}</Text>
    </MapCard>
  );
}
