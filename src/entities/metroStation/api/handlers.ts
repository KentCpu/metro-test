import { delay, http, HttpResponse } from "msw";
import { MOSCOW_METRO_STATIONS } from "./mocks";

export const metroStationHandlers = [
  http.get("/api/getMetroStation", async () => {
    await delay(300);
    return HttpResponse.json(MOSCOW_METRO_STATIONS);
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

    return HttpResponse.json(station);
  }),
];
