import { delay, http, HttpResponse } from "msw";
import type { BusStopListResponse } from "./types";
import { MOSCOW_BUS_STOPS } from "./mocks";

export const busStopHandlers = [
  http.get("/api/getBusStop", async () => {
    await delay(300);

    const response: BusStopListResponse = {
      data: MOSCOW_BUS_STOPS,
      meta: { total: MOSCOW_BUS_STOPS.length },
    };

    return HttpResponse.json(response);
  }),

  http.get("/api/getBusStop/:id", async ({ params }) => {
    await delay(200);

    const busStop = MOSCOW_BUS_STOPS.find((stop) => stop.id === params.id);

    if (!busStop) {
      return HttpResponse.json(
        { error: { code: "NOT_FOUND", message: "Остановка не найдена" } },
        { status: 404 }
      );
    }

    return HttpResponse.json({ data: busStop });
  }),
];
