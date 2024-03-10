import { Box, Skeleton, styled } from "@mui/joy";

export function CommentsListSkeleton() {
  return (
    <>
      <Block />
      <Block />
      <Block />
    </>
  );
}

const Block = () => (
  <Box marginTop="1rem">
    <InlineBox>
      <Avatar animation="wave" variant="circular" />
      <Text animation="wave" variant="text" />
      <LongText animation="wave" variant="text" />
    </InlineBox>
    <Comment animation="wave" variant="text" />
  </Box>
);

const InlineBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const Avatar = styled(Skeleton)(() => ({
  margin: "0.25rem",
  width: "40px",
  height: "40px",
}));

const Text = styled(Skeleton)(() => ({
  marginLeft: "0.625rem",
  width: "60px",
  ":before,:after": {
    height: "20px",
  },
}));

const LongText = styled(Skeleton)(() => ({
  marginLeft: "0.625rem",
  width: "120px",
  ":before,:after": {
    height: "20px",
  },
}));

const Comment = styled(Skeleton)(() => ({
  width: "100%",
  ":before,:after": {
    height: "60px",
  },
}));
