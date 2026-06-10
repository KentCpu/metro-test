import { delay, http, HttpResponse } from "msw";
import { MOSCOW_DISTRICTS } from "./mocks";

export const districtHandlers = [
  http.get("/api/district", async () => {
    await delay(300);
    return HttpResponse.json(MOSCOW_DISTRICTS);
  }),
];
