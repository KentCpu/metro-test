import type { BusStop } from "@entities/busStop";
import { Stack, Text, Title } from "@shared/ui";

interface Props {
  data: BusStop;
}

export function BusStopCard({ data }: Props) {
  return (
    <Stack gap="xs" maw={280}>
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
    </Stack>
  );
}
