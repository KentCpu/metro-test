import { server } from "@shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BusStop } from "../api/types";

export function useCreateBusStop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BusStop) => server.post<BusStop>("/bus-stop", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bus-stops"] }),
  });
}
