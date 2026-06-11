export interface BusStop {
  id: string;
  name: string;
  description?: string;
  coordinates: [number, number];
  routes: string[];
  address?: string;
}
