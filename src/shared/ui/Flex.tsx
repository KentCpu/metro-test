import { Flex as UIFlex, type FlexProps } from "@mantine/core";
import type { ElementType, ReactNode } from "react";

export type FlexComponentProps = FlexProps & {
  children?: ReactNode;
  component?: ElementType;
};

export function Flex({ children, ...props }: FlexComponentProps) {
  return <UIFlex {...(props as FlexProps)}>{children}</UIFlex>;
}
