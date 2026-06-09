export interface District {
  id: string;
  name: string;
  description?: string;
  /** GeoJSON Polygon: rings of [longitude, latitude] pairs */
  coordinates: [number, number][][];
}

export interface DistrictListResponse {
  data: District[];
  meta: {
    total: number;
  };
}
