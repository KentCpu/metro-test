export interface District {
  id: string;
  name: string;
  description?: string;
  fillColor: [number, number, number, number];
  lineColor: [number, number, number, number];
  coordinates: [number, number][][];
}
