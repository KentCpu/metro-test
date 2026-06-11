import type { District } from "@entities/district";
import { MapCard, Text, Title } from "@shared/ui";

interface Props {
  data: District;
  onClose: () => void;
}

export function DistrictCard({ data, onClose }: Props) {
  return (
    <MapCard onClose={onClose}>
      <Title order={4}>{data.name}</Title>
      {data.description && <Text size="sm">{data.description}</Text>}
    </MapCard>
  );
}
