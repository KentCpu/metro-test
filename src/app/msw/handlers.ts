import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/getBusStop", () => HttpResponse.json({ id: "abc-123" })),
];
