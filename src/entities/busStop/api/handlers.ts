import { delay, http, HttpResponse } from "msw";
import { MOSCOW_BUS_STOPS } from "./mocks";

export const busStopHandlers = [
  http.get("/api/bus-stop", async () => {
    await delay(300);
    return HttpResponse.json(MOSCOW_BUS_STOPS);
  }),
];
