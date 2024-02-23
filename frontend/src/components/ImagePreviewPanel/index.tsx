import Image from "next/image";
import { Badge, Box, Tooltip, styled } from "@mui/joy";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type MyFile = {
  data: File;
  preview: string | null;
};

interface ImagePreviewPanel {
  files: MyFile[];
  removeFile: (file: MyFile) => void;
}

export default function ImagePreviewPanel({
  files,
  removeFile,
}: ImagePreviewPanel) {
  return (
    <ImagePreviewBox>
      {files.map((file, index) => (
        <BadgeStyled
          key={index}
          badgeContent={<CloseIcon onClick={() => removeFile(file)} />}>
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
        </BadgeStyled>
      ))}
    </ImagePreviewBox>
  );
}

const ImagePreviewBox = styled(Box)(({ theme }) => ({
  padding: "1rem 0.625rem 0.625rem",
  marginTop: "0.5rem",
  backgroundColor: theme.palette.background.level2,
  borderRadius: "0.4375rem",
  gap: "0.625rem",
  display: "flex",
  flexWrap: "wrap",
}));

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
