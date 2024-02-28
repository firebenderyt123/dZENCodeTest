import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateCommentSchema,
  createCommentSchema,
} from "@/schemas/create-comment.shema";
import { CreateCommentProps } from "@/services/comments.service";
import {
  ChangeUserInfoSchema,
  changeUserInfoSchema,
} from "@/schemas/change-user-info.schema";
import CommentBox from "../CommentBox";
import UserInfo from "../UserInfo";
import { useUser } from "@/contexts/UserContext";
import { useCommentForm } from "@/contexts/CommentFormContext";
import { Box, BoxProps, styled } from "@mui/joy";

export default function CommentCreateForm(props: BoxProps) {
  const commentForm = useCommentForm();
  const user = useUser();

  const commentBoxForm = useForm<CreateCommentSchema>({
    mode: "onChange",
    resolver: yupResolver(createCommentSchema),
  });
  const changeUserForm = useForm({
    mode: "onChange",
    resolver: yupResolver<ChangeUserInfoSchema>(changeUserInfoSchema),
  });

  const commentFormSubmit = (data: CreateCommentProps, captcha: string) => {
    changeUserForm.trigger().then((isValid) => {
      if (!isValid) return;

      const userData = changeUserForm.getValues();
      user?.updateUserInfo(userData);
      commentForm?.createComment(data, captcha);
    });
  };

  return user?.state.user ? (
    <ContainerFormStyled {...props}>
      <UserInfo form={changeUserForm} />
      <CommentBox form={commentBoxForm} submitCallback={commentFormSubmit} />
    </ContainerFormStyled>
  ) : (
    <BoxStyled>Please Sign-In to write the comments..</BoxStyled>
  );
}

const ContainerFormStyled = styled(Box)(() => ({
  margin: "1rem 0",
}));

const BoxStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.divider,
  padding: "1rem",
  margin: "1rem 0",
  borderRadius: "0.3125rem",
}));
