export const MAP_LAYERS = [
  { id: "district-layer", label: "Районы" },
  { id: "pedestrian-path-layer", label: "Пешеходные маршруты" },
  { id: "bus-stop-layer", label: "Остановки" },
  { id: "metro-layer", label: "Станции метро" },
] as const;

export type MapLayerId = (typeof MAP_LAYERS)[number]["id"];
