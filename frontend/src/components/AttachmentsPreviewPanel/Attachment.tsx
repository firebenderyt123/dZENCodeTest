import Image from "next/image";
import { Tooltip, styled } from "@mui/joy";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";

interface AttachmentProps {
  file: {
    data: File;
    preview: string | null;
  };
}

export default function Attachment({ file }: AttachmentProps) {
  return (
    <Tooltip title={file.data.name} arrow variant="outlined">
      {file.preview ? (
        <ImageStyled
          src={file.preview}
          alt={file.data.name}
          height="50"
          width="50"
        />
      ) : (
        <FileIcon />
      )}
    </Tooltip>
  );
}

const ImageStyled = styled(Image)(({ theme }) => ({
  cursor: "pointer",
  borderRadius: "0.4375rem",
  ":hover": {
    border: "2px solid",
    borderColor: theme.palette.primary[400],
  },
}));

const FileIcon = styled(InsertDriveFileRoundedIcon)(({ theme }) => ({
  fontSize: "3.125rem",
  cursor: "pointer",
  borderRadius: "0.4375rem",
  ":hover": {
    border: "2px solid",
    borderColor: theme.palette.primary[400],
  },
}));
