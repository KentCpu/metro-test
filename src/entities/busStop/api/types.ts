export interface BusStop {
  id: string;
  name: string;
  description?: string;
  /** GeoJSON order: [longitude, latitude] */
  coordinates: [number, number];
  routes: string[];
  address?: string;
}

export interface BusStopListResponse {
  data: BusStop[];
  meta: {
    total: number;
  };
}
