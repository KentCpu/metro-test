import { delay, http, HttpResponse } from "msw";
import { MOSCOW_PEDESTRIAN_PATHS } from "./mocks";

export const pedestrianPathHandlers = [
  http.get("/api/pedestrian-path", async () => {
    await delay(300);
    return HttpResponse.json(MOSCOW_PEDESTRIAN_PATHS);
  }),
];
