import { Menu } from "@mantine/core";
import { Button } from "@shared/ui";

interface Options {
  id: string;
  label: string;
}

interface Props {
  options: Options[];
  hiddenLayers: Set<string>;
  onChangeLayerVisible: (layerId: string) => void;
}

export function MapLayersMenu({
  options,
  hiddenLayers,
  onChangeLayerVisible,
}: Props) {
  return (
    <Menu closeOnItemClick={false} shadow="md" width={220}>
      <Menu.Target>
        <Button>Слои</Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Видимость слоёв</Menu.Label>
        {options.map((option) => (
          <Menu.CheckboxItem
            checked={!hiddenLayers.has(option.id)}
            key={option.id}
            onChange={() => onChangeLayerVisible(option.id)}
          >
            {option.label}
          </Menu.CheckboxItem>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
