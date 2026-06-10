export type StationKind = "metro" | "mcd" | "mcc";

export interface MetroStation {
  id: string;
  name: string;
  kind: StationKind;
  lines: string[];
  /** GeoJSON order: [longitude, latitude] */
  coordinates: [number, number];
  description?: string;
  address?: string;
}
