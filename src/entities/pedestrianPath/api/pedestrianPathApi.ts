import { server } from "@shared/api";
import type { PedestrianPath, PedestrianPathListResponse } from "./types";

export async function fetchPedestrianPaths(): Promise<PedestrianPathListResponse> {
  return server.get<PedestrianPathListResponse>("/getPedestrianPath");
}

export async function fetchPedestrianPathById(
  id: string
): Promise<{ data: PedestrianPath }> {
  return server.get<{ data: PedestrianPath }>(`/getPedestrianPath/${id}`);
}
