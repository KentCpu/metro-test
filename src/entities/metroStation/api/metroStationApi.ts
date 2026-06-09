import { server } from "@shared/api";
import type { MetroStation, MetroStationListResponse } from "./types";

export async function fetchMetroStations(): Promise<MetroStationListResponse> {
  return server.get<MetroStationListResponse>("/getMetroStation");
}

export async function fetchMetroStationById(
  id: string
): Promise<{ data: MetroStation }> {
  return server.get<{ data: MetroStation }>(`/getMetroStation/${id}`);
}
