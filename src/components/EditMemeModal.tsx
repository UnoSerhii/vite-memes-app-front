import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Button
} from "@heroui/react";
import { Mem } from "../utils/api.ts";

interface Props {
  meme: Mem | null;
  isOpen: boolean;
  onClose: () => void;
  onChange: (updated: Mem) => void;
  onSave: () => void;
}

export const EditMemeModal = ({ meme, isOpen, onClose, onChange, onSave }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center">
      <ModalContent>
        <ModalHeader className="text-lg font-semibold">Редагування Мема</ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          <Input isReadOnly label="ID" value={meme?.id || ""} />
          <Input
            isRequired
            errorMessage="Від 3 до 100 символів"
            isInvalid={(meme?.name.length ?? 0) < 3 || (meme?.name.length ?? 0) > 100}
            label="Назва"
            value={meme?.name || ""}
            onChange={(e) => meme && onChange({ ...meme, name: e.target.value })}
          />
          <Input
            isRequired
            errorMessage="Некоректне JPG посилання"
            isInvalid={!/^https?:\/\/.*\.jpg$/i.test(meme?.image || "")}
            label="Картинка (JPG URL)"
            value={meme?.image || ""}
            onChange={(e) => meme && onChange({ ...meme, image: e.target.value })}
          />
          <Input
            isRequired
            label="Кількість лайків"
            type="number"
            value={meme?.likes.toString() || "0"}
            onChange={(e) => meme && onChange({ ...meme, likes: Math.max(0, Math.min(99, +e.target.value)) })}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Скасувати
          </Button>
          <Button color="primary" onPress={onSave}>
            Зберегти
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
