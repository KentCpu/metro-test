import { Button as UIButton, type ButtonProps } from "@mantine/core";
import type { PolymorphicComponentProps } from "@mantine/core";

export type ButtonComponentProps = PolymorphicComponentProps<
  "button",
  ButtonProps
>;

export function Button(props: ButtonComponentProps) {
  return <UIButton {...props} />;
}
