import { List as UIList, type ListProps } from "@mantine/core";

export function List(props: ListProps) {
  return <UIList {...props} />;
}

List.Item = UIList.Item;
