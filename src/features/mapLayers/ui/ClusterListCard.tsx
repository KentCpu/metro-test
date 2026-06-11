import { List, MapCard, Text, Title } from "@shared/ui";

type ListItem = {
  id: string;
  name: string;
};

type Props<T extends ListItem> = {
  title: string;
  items: T[];
  onClose: () => void;
  onItemClick?: (item: T) => void;
};

export function ClusterListCard<T extends ListItem>({
  title,
  items,
  onClose,
  onItemClick,
}: Props<T>) {
  return (
    <MapCard onClose={onClose}>
      <Title order={4}>
        {title} ({items.length})
      </Title>
      <List type="ordered" size="sm" spacing="xs">
        {items.map((item) => (
          <List.Item
            key={item.id}
            onClick={onItemClick ? () => onItemClick(item) : undefined}
            style={{ cursor: onItemClick ? "pointer" : undefined }}
          >
            <Text size="sm">{item.name}</Text>
          </List.Item>
        ))}
      </List>
    </MapCard>
  );
}
