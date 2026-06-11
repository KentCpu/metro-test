import { delay, http, HttpResponse } from "msw";
import { API_PREFIX } from "@shared/constants";
import { MOSCOW_METRO_STATIONS } from "./mocks";

export const metroStationHandlers = [
  http.get(`${API_PREFIX}/metro-station`, async () => {
    await delay(300);
    return HttpResponse.json(MOSCOW_METRO_STATIONS);
  }),
];
