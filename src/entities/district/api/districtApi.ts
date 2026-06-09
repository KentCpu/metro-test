import { server } from "@shared/api";
import type { District, DistrictListResponse } from "./types";

export async function fetchDistricts(): Promise<DistrictListResponse> {
  return server.get<DistrictListResponse>("/getDistrict");
}

export async function fetchDistrictById(
  id: string,
): Promise<{ data: District }> {
  return server.get<{ data: District }>(`/getDistrict/${id}`);
}
