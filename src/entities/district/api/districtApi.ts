import { server } from "@shared/api";
import type { District } from "./types";

export async function fetchDistricts(): Promise<District[]> {
  return server.get("/getDistrict") as Promise<District[]>;
}

export async function fetchDistrictById(id: string): Promise<District> {
  return server.get(`/getDistrict/${id}`) as Promise<District>;
}
