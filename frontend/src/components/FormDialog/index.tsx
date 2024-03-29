import {
  ForwardedRef,
  ReactNode,
  RefObject,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { Dialog, DialogContent } from "@mui/material";

interface FormDialogProps {
  children: ReactNode;
}
type Ref = ForwardedRef<HTMLButtonElement>;

function Component({ children }: FormDialogProps, ref: Ref) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const buttonRef = ref as RefObject<HTMLButtonElement> | undefined;
    if (!buttonRef) return;

    if (buttonRef.current) {
      buttonRef.current.addEventListener("click", handleClickOpen);
    }

    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener("click", handleClickOpen);
        handleClose();
      }
    };
  }, [ref]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
}
const FormDialog = forwardRef(Component);
export default FormDialog;
