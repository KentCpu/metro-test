import { Routes } from "@shared/constants";
import { Flex, Text } from "@shared/ui";
import type { ReactNode } from "react";
import { Link } from "react-router";
import styles from "./Page.module.css";

type Props = {
  children: ReactNode;
};

export function Page({ children }: Props) {
  return (
    <Flex bg="gray.0" c="dark.9" direction="column" gap={0} h="100dvh" miw={0}>
      <Flex
        bg="white"
        className={styles.header}
        component="header"
        p="md"
      >
        <Link className={styles.brand} to={Routes.Home}>
          <Text fw={600} span>
            Карта Москвы
          </Text>
        </Link>
      </Flex>

      <Flex component="main" direction="column" flex={1} p="md" w="100%">
        {children}
      </Flex>

      <Flex
        bg="white"
        className={styles.footer}
        component="footer"
        p="md"
      >
        <Text c="dimmed" size="sm">
          Интерактивная карта транспорта и городской инфраструктуры
        </Text>
      </Flex>
    </Flex>
  );
}
