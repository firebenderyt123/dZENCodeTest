import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { styled } from "@mui/joy";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import ViewAttachmentModal from "../AttachmentsPreviewPanel/ViewAttachmentModal";

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
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return containerName === "images" ? (
    <>
      <ImageStyled
        src={url}
        alt={alt}
        height="50"
        width="50"
        onClick={() => setModalOpen(true)}
      />
      <ViewAttachmentModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Image src={url} alt="image" width="320" height="240" />
      </ViewAttachmentModal>
    </>
  ) : (
    <Link href={url}>
      <FileIcon />
    </Link>
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
  color: theme.palette.text.primary,
  borderRadius: "0.4375rem",
  ":hover": {
    border: "2px solid",
    borderColor: theme.palette.primary[400],
  },
}));
