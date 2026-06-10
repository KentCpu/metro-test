import { delay, http, HttpResponse } from "msw";
import { MOSCOW_BUS_STOPS } from "./mocks";

export const busStopHandlers = [
  http.get("/api/getBusStop", async () => {
    await delay(300);
    return HttpResponse.json(MOSCOW_BUS_STOPS);
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

    return HttpResponse.json(busStop);
  }),
];
