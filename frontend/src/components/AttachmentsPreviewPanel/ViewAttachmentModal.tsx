import { ReactNode } from "react";
import { Modal, ModalDialog, ModalProps } from "@mui/joy";

interface ViewAttachmentModalProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

export default function ViewAttachmentModal({
  children,
  open,
  onClose,
  ...props
}: ViewAttachmentModalProps & ModalProps) {
  return (
    <Modal open={open} onClose={onClose} {...props}>
      <ModalDialog>{children}</ModalDialog>
    </Modal>
  );
}
