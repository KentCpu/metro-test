import { server } from "@shared/api";
import type { MetroStation } from "./types";

export async function fetchMetroStations(): Promise<MetroStation[]> {
  return server.get("/getMetroStation") as Promise<MetroStation[]>;
}

export async function fetchMetroStationById(id: string): Promise<MetroStation> {
  return server.get(`/getMetroStation/${id}`) as Promise<MetroStation>;
}
