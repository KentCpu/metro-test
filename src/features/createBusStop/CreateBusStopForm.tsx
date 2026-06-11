import { useCreateBusStop } from "@entities/busStop";
import { Button, Flex, Stack, TextInput } from "@shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { VALIDATION_SCHEMA, type BusStopFormValues } from "./validationSchema";

const DEFAULT_VALUES: BusStopFormValues = {
  name: "",
  longitude: "",
  latitude: "",
  routes: "",
  address: "",
};

type Props = {
  onSuccess?: () => void;
};

export function CreateBusStopForm({ onSuccess }: Props) {
  const createBusStop = useCreateBusStop();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BusStopFormValues>({
    resolver: zodResolver(VALIDATION_SCHEMA),
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = async (values: BusStopFormValues) => {
    await createBusStop.mutateAsync({
      id: uuidv4(),
      name: values.name,
      coordinates: [Number(values.longitude), Number(values.latitude)],
      routes: values.routes
        .split(",")
        .map((route) => route.trim())
        .filter(Boolean),
      address: values.address.trim() || undefined,
    });
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="sm">
        <TextInput
          error={errors.name?.message}
          label="Название"
          withAsterisk
          {...register("name")}
        />
        <TextInput
          error={errors.longitude?.message}
          label="Долгота"
          withAsterisk
          {...register("longitude")}
        />
        <TextInput
          error={errors.latitude?.message}
          label="Широта"
          withAsterisk
          {...register("latitude")}
        />
        <TextInput
          description="Через запятую"
          error={errors.routes?.message}
          label="Маршруты"
          {...register("routes")}
        />
        <TextInput
          error={errors.address?.message}
          label="Адрес"
          {...register("address")}
        />
        <Flex justify="flex-end">
          <Button
            loading={isSubmitting || createBusStop.isPending}
            type="submit"
          >
            Сохранить
          </Button>
        </Flex>
      </Stack>
    </form>
  );
}
