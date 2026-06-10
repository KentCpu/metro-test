export interface PedestrianPath {
  id: string;
  name: string;
  description?: string;
  /** GeoJSON LineString: [longitude, latitude] pairs */
  coordinates: [number, number][];
  lengthMeters?: number;
}

