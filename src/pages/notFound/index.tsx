import { Button, Center, Stack, Text, Title } from "@shared/ui";
import { Routes } from "@shared/constants";
import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <Center h="100vh" px="md">
      <Stack align="center" gap="md" maw={480}>
        <Title order={1} ta="center" c="dimmed">
          404
        </Title>
        <Title order={2} ta="center">
          Страница не найдена
        </Title>
        <Text c="dimmed" ta="center">
          Запрашиваемая страница не существует или была перемещена. Проверьте
          адрес или вернитесь на главную.
        </Text>
        <Button component={Link} to={Routes.Home}>
          На главную
        </Button>
      </Stack>
    </Center>
  );
}
