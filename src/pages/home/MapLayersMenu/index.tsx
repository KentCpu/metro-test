import { Menu } from "@mantine/core";
import { Button } from "@shared/ui";
import { MAP_LAYERS, type MapLayerId } from "./mapLayers";

interface Props {
  layerVisibility: Record<MapLayerId, boolean>;
  onChangeLayerVisible: (layerId: MapLayerId, checked: boolean) => void;
}

export function MapLayersMenu({
  layerVisibility,
  onChangeLayerVisible,
}: Props) {
  return (
    <Menu closeOnItemClick={false} shadow="md" width={220}>
      <Menu.Target>
        <Button>Слои</Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Видимость слоёв</Menu.Label>
        {MAP_LAYERS.map((layer) => (
          <Menu.CheckboxItem
            checked={layerVisibility[layer.id]}
            key={layer.id}
            onChange={(checked) => onChangeLayerVisible(layer.id, checked)}
          >
            {layer.label}
          </Menu.CheckboxItem>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
