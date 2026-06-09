import { delay, http, HttpResponse } from "msw";
import { MOSCOW_METRO_STATIONS } from "./mocks";
import type { MetroStationListResponse } from "./types";

export const metroStationHandlers = [
  http.get("/api/getMetroStation", async () => {
    await delay(300);

    const response: MetroStationListResponse = {
      data: MOSCOW_METRO_STATIONS,
      meta: { total: MOSCOW_METRO_STATIONS.length },
    };

    return HttpResponse.json(response);
  }),

  http.get("/api/getMetroStation/:id", async ({ params }) => {
    await delay(200);

    const station = MOSCOW_METRO_STATIONS.find((s) => s.id === params.id);

    if (!station) {
      return HttpResponse.json(
        { error: { code: "NOT_FOUND", message: "Станция не найдена" } },
        { status: 404 }
      );
    }

    return HttpResponse.json({ data: station });
  }),
];
