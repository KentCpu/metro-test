import { CloseButton } from "@mantine/core";
import { Stack } from "../Stack";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export function MapCard({ children, onClose }: Props) {
  return (
    <Stack
      pos="absolute"
      right="5%"
      top="5%"
      bg="white"
      bd="1px solid gray.1"
      bdrs="sm"
      p="sm"
      maw={280}
    >
      <Stack>
        <CloseButton onClick={onClose} />
        {children}
      </Stack>
    </Stack>
  );
}
