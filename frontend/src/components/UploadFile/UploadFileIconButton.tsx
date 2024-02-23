import { ChangeEvent, ForwardedRef, forwardRef } from "react";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import { styled } from "@mui/joy";

interface UploadFileIconButtonProps {
  onInputChange: (files: File[]) => void;
}

function UploadFileIconButton(
  {
    onInputChange,
    children,
    ...props
  }: UploadFileIconButtonProps & IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      onInputChange([]);
      return;
    }
    const filesArray: File[] = [];
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      if (file) filesArray.push(file);
    }
    onInputChange(filesArray);
  };

  return (
    <IconButton component="label" {...props} ref={ref}>
      {children}
      <VisuallyHiddenInput type="file" multiple onChange={handleFileChange} />
    </IconButton>
  );
}
export default forwardRef(UploadFileIconButton);

const VisuallyHiddenInput = styled("input")(() => ({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "0.0625rem",
  overflow: "hidden",
  position: "absolute",
  bottom: "0",
  left: "0",
  whiteSpace: "nowrap",
  width: "0.0625rem",
}));
