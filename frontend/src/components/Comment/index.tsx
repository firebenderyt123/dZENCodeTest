import { ForwardedRef, RefObject, forwardRef, useRef } from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  styled,
} from "@mui/material";
import { formatDateForComments } from "@/utils/date-format.util";
import { Comment } from "@/interfaces/comment.interface";
import BoxInnerHtml from "../BoxInnerHtml";
import { AttachmentsPreviewBox } from "../AttachmentsPreviewPanel";
import CommentAttachment from "./CommentAttachment";

interface ComponentProps {
  comment: Comment;
  parentCommentText?: string;
}
type Ref = ForwardedRef<HTMLLIElement>;

function Component({ comment, parentCommentText }: ComponentProps, ref: Ref) {
  const { id, text, createdAt, user, replies, attachments } = comment;

  const currRef = useRef<HTMLLIElement>(null);

  const handleClick = () => {
    const pRef = ref as RefObject<HTMLLIElement>;
    if (pRef.current) {
      pRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const avatar = (
    <ListItemAvatar>
      <AvatarStyled alt="Anonymous" src="/images/avatar.webp" />
    </ListItemAvatar>
  );

  const userInfo = (
    <InlineBox>
      <BoldText>{user.username}</BoldText>
      {formatDateForComments(createdAt)}
    </InlineBox>
  );

  const parentTextBlock = parentCommentText && (
    <ParentTextBlock onClick={handleClick}>{parentCommentText}</ParentTextBlock>
  );

  const repliesBlock = !!replies.length && (
    <ListStyled>
      {replies.map((reply) => (
        <CommentComponent
          key={reply.id}
          comment={reply}
          parentCommentText={comment.text}
          ref={currRef}></CommentComponent>
      ))}
    </ListStyled>
  );

  const attachmentsBlock = !!attachments.length && (
    <AttachmentsPreviewBox>
      {attachments.map(({ fileId, file }) => (
        <CommentAttachment
          key={fileId}
          containerName={file.containerName}
          url={file.fileUrl}
          alt=""
        />
      ))}
    </AttachmentsPreviewBox>
  );

  return (
    <ListItemStyled ref={currRef} id={`comment-${id}`}>
      <InlineBox>
        {avatar}
        {userInfo}
      </InlineBox>
      {parentTextBlock}
      <CommentText html={text} />
      {attachmentsBlock}
      {repliesBlock}
    </ListItemStyled>
  );
}
const CommentComponent = forwardRef(Component);
export default CommentComponent;

export const ListStyled = styled(List)(() => ({
  width: "100%",
  minWidth: 280,
  bgcolor: "#fff",
}));

const ListItemStyled = styled(ListItem)(() => ({
  flexDirection: "column",
}));

const InlineBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f5f6f7",
  padding: "0.3125rem",
  width: "100%",
  gap: "0.625rem",
}));

const AvatarStyled = styled(Avatar)(() => ({
  border: "0.1875rem solid #fff",
  borderRadius: "100%",
}));

const ParentTextBlock = styled(Typography)(() => ({
  borderLeft: "0.1875rem solid #b3c2e1",
  margin: "0.625rem 0 0.625rem 0.625rem",
  padding: "0.4375rem 0.53125rem",
  width: "100%",
  textWrap: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  cursor: "pointer",
}));

const BoldText = styled(Typography)(() => ({
  fontWeight: 700,
}));

const CommentText = styled(BoxInnerHtml)(() => ({
  width: "100%",
  padding: "0.5rem 0 0",
  overflow: "hidden",
}));
