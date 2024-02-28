import { Badge, Box, styled } from "@mui/joy";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Attachment from "./Attachment";

type MyFile = {
  data: File;
  preview: string | null;
};

interface AttachmentsPreviewPanelProps {
  files: MyFile[];
  removeFile: (file: MyFile) => void;
}

export default function AttachmentsPreviewPanel({
  files,
  removeFile,
}: AttachmentsPreviewPanelProps) {
  return (
    !!files.length && (
      <AttachmentsPreviewBox>
        {files.map((file, index) => (
          <BadgeStyled
            key={index}
            badgeContent={<CloseIcon onClick={() => removeFile(file)} />}>
            <Attachment file={file} />
          </BadgeStyled>
        ))}
      </AttachmentsPreviewBox>
    )
  );
}

export const AttachmentsPreviewBox = styled(Box)(({ theme }) => ({
  padding: "1rem 0.625rem 0.625rem",
  marginTop: "0.5rem",
  backgroundColor: theme.palette.background.level2,
  borderRadius: "0.4375rem",
  gap: "0.625rem",
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
}));

const BadgeStyled = styled(Badge)(() => ({
  ".MuiBadge-badge": {
    background: "none",
    boxShadow: "none",
  },
}));

const CloseIcon = styled(CloseRoundedIcon)(({ theme }) => ({
  color: theme.palette.danger[400],
  backgroundColor: theme.palette.common.white,
  fontSize: "1rem",
  borderRadius: "100%",
  cursor: "pointer",
  transition:
    ".2s ease-in-out font-size, .2s ease-in-out color, .2s ease-in-out background-color",
  ":hover": {
    fontSize: "1.5rem",
    color: theme.palette.common.white,
    backgroundColor: theme.palette.danger[400],
  },
}));
