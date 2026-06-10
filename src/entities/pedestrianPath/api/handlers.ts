import { delay, http, HttpResponse } from "msw";
import { MOSCOW_PEDESTRIAN_PATHS } from "./mocks";

export const pedestrianPathHandlers = [
  http.get("/api/getPedestrianPath", async () => {
    await delay(300);
    return HttpResponse.json(MOSCOW_PEDESTRIAN_PATHS);
  }),

  http.get("/api/getPedestrianPath/:id", async ({ params }) => {
    await delay(200);

    const path = MOSCOW_PEDESTRIAN_PATHS.find((p) => p.id === params.id);

    if (!path) {
      return HttpResponse.json(
        { error: { code: "NOT_FOUND", message: "Дорожка не найдена" } },
        { status: 404 }
      );
    }

    return HttpResponse.json(path);
  }),
];
