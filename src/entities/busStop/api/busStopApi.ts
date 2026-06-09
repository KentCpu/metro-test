import { server } from "@shared/api";
import type { BusStopListResponse, BusStop } from "./types";

export async function fetchBusStops(): Promise<BusStopListResponse> {
  return server.get<BusStopListResponse>("/getBusStop");
}

export async function fetchBusStopById(id: string): Promise<{ data: BusStop }> {
  return server.get<{ data: BusStop }>(`/getBusStop/${id}`);
}
