export interface PedestrianPath {
  id: string;
  name: string;
  description?: string;
  lineColor: [number, number, number, number];
  /** GeoJSON LineString: [longitude, latitude] pairs */
  coordinates: [number, number][];
  lengthMeters?: number;
}
