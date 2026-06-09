import { Text as UIText, type TextProps } from "@mantine/core";
import type { ReactNode } from "react";

export type TextComponentProps = TextProps & {
  children?: ReactNode;
};

export function Text(props: TextComponentProps) {
  return <UIText {...props} />;
}
