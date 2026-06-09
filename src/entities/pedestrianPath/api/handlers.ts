import { delay, http, HttpResponse } from "msw";
import { MOSCOW_PEDESTRIAN_PATHS } from "./mocks";
import type { PedestrianPathListResponse } from "./types";

export const pedestrianPathHandlers = [
  http.get("/api/getPedestrianPath", async () => {
    await delay(300);

    const response: PedestrianPathListResponse = {
      data: MOSCOW_PEDESTRIAN_PATHS,
      meta: { total: MOSCOW_PEDESTRIAN_PATHS.length },
    };

    return HttpResponse.json(response);
  }),

  http.get("/api/getPedestrianPath/:id", async ({ params }) => {
    await delay(200);

    const path = MOSCOW_PEDESTRIAN_PATHS.find((p) => p.id === params.id);

    if (!path) {
      return HttpResponse.json(
        { error: { code: "NOT_FOUND", message: "Дорожка не найдена" } },
        { status: 404 },
      );
    }

    return HttpResponse.json({ data: path });
  }),
];
