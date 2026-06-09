import { busStopHandlers } from "@entities/busStop";
import { districtHandlers } from "@entities/district";
import { metroStationHandlers } from "@entities/metroStation";
import { pedestrianPathHandlers } from "@entities/pedestrianPath";

export const handlers = [
  ...busStopHandlers,
  ...metroStationHandlers,
  ...districtHandlers,
  ...pedestrianPathHandlers,
];
