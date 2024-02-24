import Image from "next/image";
import { styled } from "@mui/joy";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";

interface CommentAttachmentProps {
  containerName: "images" | "files";
  url: string;
  alt: string;
}

export default function CommentAttachment({
  containerName,
  url,
  alt,
}: CommentAttachmentProps) {
  return containerName === "images" ? (
    <ImageStyled src={url} alt={alt} height="50" width="50" />
  ) : (
    <FileIcon />
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
