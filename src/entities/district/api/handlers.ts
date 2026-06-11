import { delay, http, HttpResponse } from "msw";
import { API_PREFIX } from "@shared/constants";
import { MOSCOW_DISTRICTS } from "./mocks";

export const districtHandlers = [
  http.get(`${API_PREFIX}/district`, async () => {
    await delay(300);
    return HttpResponse.json(MOSCOW_DISTRICTS);
  }),
];
