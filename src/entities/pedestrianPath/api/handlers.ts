import { delay, http, HttpResponse } from "msw";
import { API_PREFIX } from "@shared/constants";
import { MOSCOW_PEDESTRIAN_PATHS } from "./mocks";

export const pedestrianPathHandlers = [
  http.get(`${API_PREFIX}/pedestrian-path`, async () => {
    await delay(300);
    return HttpResponse.json(MOSCOW_PEDESTRIAN_PATHS);
  }),
];
