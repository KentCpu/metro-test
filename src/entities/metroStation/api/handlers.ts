import { delay, http, HttpResponse } from "msw";
import { MOSCOW_METRO_STATIONS } from "./mocks";

export const metroStationHandlers = [
  http.get("/api/metro-station", async () => {
    await delay(300);
    return HttpResponse.json(MOSCOW_METRO_STATIONS);
  }),
];
