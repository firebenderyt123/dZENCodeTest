import { ReactNode } from "react";
import { Modal, ModalClose, ModalDialog } from "@mui/joy";

interface ViewAttachmentModalProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

export default function ViewAttachmentModal({
  children,
  open,
  onClose,
}: ViewAttachmentModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>{children}</ModalDialog>
    </Modal>
  );
}
