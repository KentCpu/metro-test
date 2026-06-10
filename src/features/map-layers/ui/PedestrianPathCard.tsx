import type { PedestrianPath } from "@entities/pedestrianPath";
import { MapCard, Text, Title } from "@shared/ui";

interface Props {
  data: PedestrianPath;
  onClose: () => void;
}

export function PedestrianPathCard({ data, onClose }: Props) {
  return (
    <MapCard onClose={onClose}>
      <Title order={4}>{data.name}</Title>
      {data.description && <Text size="sm">{data.description}</Text>}
      {data.lengthMeters && (
        <Text size="sm" c="dimmed">
          Длина: {data.lengthMeters} м
        </Text>
      )}
    </MapCard>
  );
}
