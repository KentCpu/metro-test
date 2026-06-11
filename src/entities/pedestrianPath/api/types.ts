export interface PedestrianPath {
  id: string;
  name: string;
  description?: string;
  lineColor: [number, number, number, number];
  coordinates: [number, number][];
  lengthMeters?: number;
}
