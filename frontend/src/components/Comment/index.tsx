import { ForwardedRef, RefObject, forwardRef, useRef } from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import { formatDateForComments } from "@/utils/date-format.util";
import { Comment } from "@/interfaces/comment.interface";

interface Props {
  comment: Comment;
  parentCommentText?: string;
}
type Ref = ForwardedRef<HTMLLIElement>;

const veryLongText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet tempus magna ac tincidunt. Nullam vel rutrum velit. Cras pulvinar massa vitae laoreet dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed aliquam porttitor risus eget vehicula. Integer in orci dolor. Donec pharetra sapien ut quam malesuada, eget volutpat justo porttitor. Vestibulum laoreet fringilla diam, quis rutrum lectus vehicula quis. Vestibulum neque justo, rhoncus sit amet scelerisque eu, convallis quis elit. Integer auctor justo at lacinia fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet tempus magna ac tincidunt. Nullam vel rutrum velit. Cras pulvinar massa vitae laoreet dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed aliquam porttitor risus eget vehicula. Integer in orci dolor. Donec pharetra sapien ut quam malesuada, eget volutpat justo porttitor. Vestibulum laoreet fringilla diam, quis rutrum lectus vehicula quis. Vestibulum neque justo, rhoncus sit amet scelerisque eu, convallis quis elit. Integer auctor justo at lacinia fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet tempus magna ac tincidunt. Nullam vel rutrum velit. Cras pulvinar massa vitae laoreet dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed aliquam porttitor risus eget vehicula. Integer in orci dolor. Donec pharetra sapien ut quam malesuada, eget volutpat justo porttitor. Vestibulum laoreet fringilla diam, quis rutrum lectus vehicula quis. Vestibulum neque justo, rhoncus sit amet scelerisque eu, convallis quis elit. Integer auctor justo at lacinia fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet tempus magna ac tincidunt. Nullam vel rutrum velit. Cras pulvinar massa vitae laoreet dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed aliquam porttitor risus eget vehicula. Integer in orci dolor. Donec pharetra sapien ut quam malesuada, eget volutpat justo porttitor. Vestibulum laoreet fringilla diam, quis rutrum lectus vehicula quis. Vestibulum neque justo, rhoncus sit amet scelerisque eu, convallis quis elit. Integer auctor justo at lacinia fringilla.";

function Component({ comment, parentCommentText }: Props, ref: Ref) {
  const { id, text, createdAt, user, replies } = comment;

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

  return (
    <ListItemStyled ref={currRef} id={`comment-${id}`}>
      <InlineBox>
        {avatar}
        {userInfo}
      </InlineBox>
      {parentTextBlock}
      <CommentText>{veryLongText}</CommentText>
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

const CommentText = styled(ListItemText)(() => ({
  width: "100%",
  padding: "1rem 0 2.25rem",
}));
