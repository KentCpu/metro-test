export type StationKind = "metro" | "mcd" | "mcc";

export interface MetroStation {
  id: string;
  name: string;
  kind: StationKind;
  lines: string[];
  coordinates: [number, number];
  description?: string;
  address?: string;
}
