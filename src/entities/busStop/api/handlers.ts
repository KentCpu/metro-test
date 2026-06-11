import { delay, http, HttpResponse } from "msw";
import { API_PREFIX } from "@shared/constants";
import { MOSCOW_BUS_STOPS } from "./mocks";
import type { BusStop } from "./types";

const STORAGE_KEY = "bus-stops";

function getSaved(): BusStop[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as BusStop[];
  } catch {
    return [];
  }
}

function getBusStops(): BusStop[] {
  return [...MOSCOW_BUS_STOPS, ...getSaved()];
}

export const busStopHandlers = [
  http.get(`${API_PREFIX}/bus-stop`, async () => {
    await delay(300);
    return HttpResponse.json(getBusStops());
  }),

  http.post(`${API_PREFIX}/bus-stop`, async ({ request }) => {
    const body = (await request.json()) as BusStop;
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...getSaved(), body]));
    await delay(300);
    return HttpResponse.json(body, { status: 201 });
  }),
];
