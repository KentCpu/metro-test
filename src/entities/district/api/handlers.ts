import { delay, http, HttpResponse } from "msw";
import { MOSCOW_DISTRICTS } from "./mocks";

export const districtHandlers = [
  http.get("/api/getDistrict", async () => {
    await delay(300);
    return HttpResponse.json(MOSCOW_DISTRICTS);
  }),

  http.get("/api/getDistrict/:id", async ({ params }) => {
    await delay(200);

    const district = MOSCOW_DISTRICTS.find((d) => d.id === params.id);

    if (!district) {
      return HttpResponse.json(
        { error: { code: "NOT_FOUND", message: "Район не найден" } },
        { status: 404 }
      );
    }

    return HttpResponse.json(district);
  }),
];
