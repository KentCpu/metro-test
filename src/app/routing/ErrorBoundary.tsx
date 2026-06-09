import { Button, Center, Stack, Text, Title } from "@shared/ui";
import type { ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

interface Props {
  children: ReactNode;
}

export function ErrorBoundary({ children }: Props) {
  const handleError = (error: unknown, errorInfo: React.ErrorInfo) => {
    console.error("ErrorBoundary:", error, errorInfo);
  };

  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      {children}
    </ReactErrorBoundary>
  );
}

function ErrorFallback() {
  return (
    <Center h="100vh" px="md">
      <Stack align="center" gap="md" maw={480}>
        <Title order={2} ta="center">
          Что-то пошло не так
        </Title>
        <Text c="dimmed" ta="center">
          Приложение столкнулось с непредвиденной ошибкой. Карта и данные могут
          быть недоступны. Попробуйте обновить страницу.
        </Text>

        <Button onClick={() => window.location.reload()}>
          Обновить страницу
        </Button>
      </Stack>
    </Center>
  );
}
