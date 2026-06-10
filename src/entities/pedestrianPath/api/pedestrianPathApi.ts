import { server } from "@shared/api";
import type { PedestrianPath } from "./types";

export async function fetchPedestrianPaths(): Promise<PedestrianPath[]> {
  return server.get("/getPedestrianPath") as Promise<PedestrianPath[]>;
}

export async function fetchPedestrianPathById(id: string): Promise<PedestrianPath> {
  return server.get(`/getPedestrianPath/${id}`) as Promise<PedestrianPath>;
}
