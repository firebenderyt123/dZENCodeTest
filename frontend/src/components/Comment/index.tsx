import Link from "next/link";
import { ForwardedRef, RefObject, forwardRef, useRef, useState } from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  styled,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { formatDateForComments } from "@/utils/date-format.utils";
import { Comment } from "@/interfaces/comment.interface";
import BoxInnerHtml from "../BoxInnerHtml";
import { AttachmentsPreviewBox } from "../AttachmentsPreviewPanel";
import CommentAttachment from "./CommentAttachment";
import { IconButton } from "@mui/joy";
import { useCommentForm } from "@/contexts/CommentFormContext";
import CommentCreateForm from "../CommentCreateForm";

interface ComponentProps {
  comment: Comment;
  parentCommentText?: string;
}
type Ref = ForwardedRef<HTMLLIElement>;

function Component({ comment, parentCommentText }: ComponentProps, ref: Ref) {
  const { id, text, createdAt, user, replies, attachments } = comment;

  const commentForm = useCommentForm();
  const currRef = useRef<HTMLLIElement>(null);

  const handleClick = () => {
    const pRef = ref as RefObject<HTMLLIElement>;
    if (pRef.current) {
      pRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const avatar = (
    <ListItemAvatarStyled>
      <AvatarStyled alt="Anonymous" src="/images/avatar.webp" />
    </ListItemAvatarStyled>
  );

  const userInfo = (
    <InlineBox>
      <BoldText>
        {user.siteUrl ? (
          <LinkStyled href={user.siteUrl} target="_blank" rel="nofollow">
            {user.username}
          </LinkStyled>
        ) : (
          user.username
        )}
      </BoldText>
      {formatDateForComments(createdAt)}
    </InlineBox>
  );

  const replyButton = commentForm && (
    <IconButton
      onClick={() =>
        commentForm.setReplyCommentId(
          commentForm?.state.replyToCommentId !== id ? id : null
        )
      }>
      <ReplyIcon />
    </IconButton>
  );

  const parentTextBlock = parentCommentText && (
    <ParentTextBlock onClick={handleClick}>
      <CommentText html={parentCommentText} />
    </ParentTextBlock>
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
    commentForm && (
      <>
        <ListItemStyled ref={currRef} id={`comment-${id}`}>
          <InlineBox>
            {avatar}
            {userInfo}
            {replyButton}
          </InlineBox>
          {parentTextBlock}
          <CommentText html={text} />
          {attachmentsBlock}
          {commentForm.state.replyToCommentId === id && (
            <CommentCreateFormStyled />
          )}
          {repliesBlock}
        </ListItemStyled>
      </>
    )
  );
}
const CommentComponent = forwardRef(Component);
export default CommentComponent;

export const ListStyled = styled(List)(() => ({
  width: "100%",
  minWidth: 280,
}));

const ListItemStyled = styled(ListItem)(() => ({
  flexDirection: "column",
  paddingInline: 0,
  "& li": {
    paddingLeft: "1rem",
  },
}));

const InlineBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.grey[100],
  padding: "0.3125rem",
  width: "100%",
  gap: "0.625rem",
}));

const ListItemAvatarStyled = styled(ListItemAvatar)(() => ({
  minWidth: 40,
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
  textTransform: "capitalize",
}));

const CommentText = styled(BoxInnerHtml)(() => ({
  width: "100%",
  padding: "0.5rem 0 0",
  overflow: "hidden",
}));

const LinkStyled = styled(Link)(() => ({
  textDecoration: "none",
  color: "inherit",
}));

const CommentCreateFormStyled = styled(CommentCreateForm)(() => ({
  width: "100%",
}));
