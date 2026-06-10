import { server } from "@shared/api";
import type { BusStop } from "./types";

export async function fetchBusStops() {
  return server.get<BusStop[]>("/getBusStop");
}

export async function fetchBusStopById(id: string): Promise<BusStop> {
  return server.get(`/getBusStop/${id}`) as Promise<BusStop>;
}
