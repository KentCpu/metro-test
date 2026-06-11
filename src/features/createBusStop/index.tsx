import { Button, Modal } from "@shared/ui";
import { useDisclosure } from "@mantine/hooks";
import { CreateBusStopForm } from "./CreateBusStopForm";

export function CreateBusStop() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open}>Добавить остановку</Button>
      <Modal onClose={close} opened={opened} title="Новая остановка">
        <CreateBusStopForm onSuccess={close} />
      </Modal>
    </>
  );
}
